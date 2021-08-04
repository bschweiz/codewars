// src/lib/make-toolbox-xml.js
//  lines 739-751


const gameControl = function () {
  return `
  <category 
      name="Game Control"
      id="countdownGame"
      colour="#CF173B"
      secondaryColour="#900C3F" 
      showStatusButton="false">
          <block type="countdown_gameMode" id="countdown_gameMode"></block>'
          <block type="countdown_gameModeCheck" id="countdown_gameModeCheck"></block>
  </category>
  `;
};

//  line 1015

const gameControlXML = moveCategory('gameControl') || gameControl(isStage, targetId);


//  line 1034

gameControlXML, gap,