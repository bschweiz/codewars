// blocks_vertical/default_toolbox.js
'<block type="messages_assignTopicToMessage">' +
'<value name="TOPIC">' +
    '<shadow type="text">' +
      '<field name="TEXT">topic</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="MESSAGE">' +
    '<shadow type="text">' +
      '<field name="TEXT">message</field>' +
  '</shadow>' +
  '</value>' +
'</block>' +


// blocks_vertical/messages.js

Blockly.Blocks['messages_assignTopicToMessage'] = {
    init: function() {
      this.jsonInit({
        "message0": "Assign topic %1 to Scratch message %2",
        "args0": [
          {
            "type": "input_value",
            "name": "TOPIC"
          },
          {
            "type": "input_value",
            "name": "MESSAGE"
          }
        ],
        "category": Blockly.Categories.messages,
        "extensions": ["colours_messages", "shape_statement"]
      });
    }
  };

  // attempted rename, not working in GUI

  this.reassignSatIdTouchRadarValueVars = (varName, stage, t) => {
    debugger
    let thisSatValueVar = {};
    if (t[3] === 'touch') {
        thisSatValueVar = stage.lookupVariableByNameAndType(`${t[1]}_TOUCH_VALUE`, '');
        if (this.workspace.renameVariable) {
            // BLOCKY.WORKSPACE METHOD: renameVariable(workspace, variable, opt_callback) ? not working
            thisSatValueVar = this.workspace.renameVariable(this.workspace, thisSatValueVar, `${varName} Value`);
        } else {
            stage.renameVariable(thisSatValueVar.id, `${varName} Value`);
        }
    } else if (t[3] === 'radar') {
        thisSatValueVar = stage.lookupVariableByNameAndType(`${t[1]}_RADAR_VALUE`, '');
        if (this.workspace.createVariable) {
            // BLOCKY.WORKSPACE METHOD: renameVariable(workspace, variable, opt_callback) ? not working
            thisSatValueVar = this.workspace.renameVariable(this.workspace, thisSatValueVar, `${varName} Value`);
        } else {
            stage.renameVariable(thisSatValueVar.id, `${varName} Value`);
        }
    }
    return thisSatValueVar;
};