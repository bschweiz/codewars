/** FROM scratch-vm/src/virtual-machine.js (lines 1599-1655*/
/**
 * Emit an Blockly/scratch-blocks compatible XML representation
 * of the current editing target's blocks.
 */

emitWorkspaceUpdate() {
    // Create a list of broadcast message Ids according to the stage variables
    debugger
    const stageVariables = this.runtime.getTargetForStage().variables;
    let messageIds = [];
    for (const varId in stageVariables) {
        if (stageVariables[varId].type === Variable.BROADCAST_MESSAGE_TYPE) {
            messageIds.push(varId);
        }
    }
    // Go through all blocks on all targets, removing referenced
    // broadcast ids from the list.
    for (let i = 0; i < this.runtime.targets.length; i++) {
        const currTarget = this.runtime.targets[i];
        const currBlocks = currTarget.blocks._blocks;
        for (const blockId in currBlocks) {
            if (currBlocks[blockId].fields.BROADCAST_OPTION) {
                const id = currBlocks[blockId].fields.BROADCAST_OPTION.id;
                const index = messageIds.indexOf(id);
                if (index !== -1) {
                    messageIds = messageIds.slice(0, index)
                        .concat(messageIds.slice(index + 1));
                }
            }
        }
    }
    // Anything left in messageIds is not referenced by a block, so delete it.
    for (let i = 0; i < messageIds.length; i++) {
        const id = messageIds[i];
        delete this.runtime.getTargetForStage().variables[id];
    }
    const globalVarMap = Object.assign({}, this.runtime.getTargetForStage().variables);
    const localVarMap = this.editingTarget.isStage ?
        Object.create(null) :
        Object.assign({}, this.editingTarget.variables);

    const globalVariables = Object.keys(globalVarMap).map(k => globalVarMap[k]);
    const localVariables = Object.keys(localVarMap).map(k => localVarMap[k]);
    const workspaceComments = Object.keys(this.editingTarget.comments)
        .map(k => this.editingTarget.comments[k])
        .filter(c => c.blockId === null);

    const xmlString = `<xml xmlns="http://www.w3.org/1999/xhtml">
                        <variables>
                            ${globalVariables.map(v => v.toXML()).join()}
                            ${localVariables.map(v => v.toXML(true)).join()}
                        </variables>
                        ${workspaceComments.map(c => c.toXML()).join()}
                        ${this.editingTarget.blocks.toXML(this.editingTarget.comments)}
                    </xml>`;

    this.emit('workspaceUpdate', { xml: xmlString });
}

// ** FROM scratch-vm/src/engine/target.js lines 257-277

/**
     * Creates a variable with the given id and name and adds it to the
     * dictionary of variables.
     * @param {string} id Id of variable
     * @param {string} name Name of variable.
     * @param {string} type Type of variable, '', 'broadcast_msg', or 'list'
     * @param {boolean} isCloud Whether the variable to create has the isCloud flag set.
     * Additional checks are made that the variable can be created as a cloud variable.
     */
 createVariable (id, name, type, isCloud) {
    debugger
    if (!this.variables.hasOwnProperty(id)) {
        const newVariable = new Variable(id, name, type, false);
        if (isCloud && this.isStage && this.runtime.canAddCloudVariable()) {
            newVariable.isCloud = true;
            this.runtime.addCloudVariable();
            this.runtime.ioDevices.cloud.requestCreateVariable(newVariable);
        }
        this.variables[id] = newVariable;
    }
}



// ** FROM scratch-vm/src/engine/variable.js lines (all)

/**
 * @fileoverview
 * Object representing a Scratch variable.
 */

 const uid = require('../util/uid');
 const xmlEscape = require('../util/xml-escape');
 
 class Variable {
     /**
      * @param {string} id Id of the variable.
      * @param {string} name Name of the variable.
      * @param {string} type Type of the variable, one of '' or 'list'
      * @param {boolean} isCloud Whether the variable is stored in the cloud.
      * @constructor
      */
     constructor (id, name, type, isCloud) {
         this.id = id || uid();
         this.name = name;
         this.type = type;
         this.isCloud = isCloud;
         switch (this.type) {
         case Variable.SCALAR_TYPE:
             this.value = 0;
             break;
         case Variable.LIST_TYPE:
             this.value = [];
             break;
         case Variable.BROADCAST_MESSAGE_TYPE:
             this.value = this.name;
             break;
         default:
             throw new Error(`Invalid variable type: ${this.type}`);
         }
     }
 
     toXML (isLocal) {
         isLocal = (isLocal === true);
         return `<variable type="${this.type}" id="${this.id}" islocal="${isLocal
         }" iscloud="${this.isCloud}">${xmlEscape(this.name)}</variable>`;
     }
 
     /**
      * Type representation for scalar variables.
      * This is currently represented as ''
      * for compatibility with blockly.
      * @const {string}
      */
     static get SCALAR_TYPE () {
         return '';
     }
 
     /**
      * Type representation for list variables.
      * @const {string}
      */
     static get LIST_TYPE () {
         return 'list';
     }
 
     /**
      * Type representation for list variables.
      * @const {string}
      */
     static get BROADCAST_MESSAGE_TYPE () {
         return 'broadcast_msg';
     }
 }
 
 module.exports = Variable;