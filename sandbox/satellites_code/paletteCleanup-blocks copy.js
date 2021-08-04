// scratch-blocks/blocks_vertical/default_toolbox.js
// line 548-574 (removed):

'<category name="Game Control" id="countdownGame" colour="#CF173B" secondaryColour="#900C3F" ' +
'showStatusButton="false">' +
  '<block type="countdown_gameMode" id="countdown_gameMode"></block>' +
  '<block type="countdown_gameModeCheck" id="countdown_gameModeCheck"></block>' +
'</category>' +
'<category name="Lights" id="lights" colour="#3399ff" secondaryColour="#3399ff" ' +
'showStatusButton="false">' +
  '<block type="lights_startsequence">' +
    '<value name="VALUE">' +
      '<shadow type="text">' +
        '<field name="TEXT">File Name</field>' +
      '</shadow>' +
    '</value>' +
  '</block>' +
  '<block type="lights_sendMessage">' +
    '<value name="VALUE">' +
      '<shadow type="text">' +
        '<field name="TEXT">sequence</field>' +
      '</shadow>' +
    '</value>' +
    '<value name="SATELLITE">' +
      '<shadow type="text">' +
        '<field name="TEXT">Satellite #</field>' +
      '</shadow>' +
    '</value>' +
  '</block>' +
'</category>' +

