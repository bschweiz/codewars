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