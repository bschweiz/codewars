// creating all the variables for connected sats works very differently in the extension version
// vs. current build

// extension: src/extensions/scratch3_playspot/index.js

// Satellite event handlers
this._satelliteStatusHandler = sender => {
    // log.info(`satelliteStatusHandler fired for sender: ${sender}`);
    this._satellites[sender] = {
        isTouched: false,
        hasPresence: false
    };
    const stage = this._runtime.getTargetForStage();
    let allSats = stage.lookupVariableByNameAndType('All_Satellites', Variable.LIST_TYPE);
    if (!allSats) {
        allSats = this._runtime.createNewGlobalVariable('All_Satellites', false, Variable.LIST_TYPE);
    }
    this._satId = allSats.id;
    stage.variables[allSats.id].value = Object.keys(this._satellites);
    this.setRadarConfiguration({
        SATELLITE: sender,
        FSPEED: ['2'],
        BSPEED: ['2'],
        FMAG: ['5'],
        BMAG: ['5'],
        DET: ['1']
    });
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_LIST_UPDATE, this._satellites);
};

//  also then seems related to this: 

this._setupAliases = payload => {
    const finalVariableValues = [];
    const stage = this._runtime.getTargetForStage();
    const decoder = new TextDecoder();
    const message = decoder.decode(payload);
    if (message === 'placeholder') {
        let allSats = stage.lookupVariableByNameAndType('All_Satellites', Variable.LIST_TYPE);
        if (!allSats) {
            allSats = this._runtime.createNewGlobalVariable('All_Satellites', false, Variable.LIST_TYPE);
        }
        stage.variables[allSats.id].value = Object.keys(this._satellites);
        vm.refreshWorkspace();
        return;
    }
    
    this._setupDictionary(message);
    if (this._satellitesList.length > 1) {
        for (let i = 0; i < this._satellitesList.length; i++) {
            const [key] = Object.entries(this._satellitesList[i]);
            const keyValue = `${key}`;
            const splitKeyValue = keyValue.split(',');
            const keyToPush = splitKeyValue[0];
            let variable = stage.lookupVariableByNameAndType(`${keyToPush}`, Variable.SCALAR_TYPE);
            if (!variable) {
                variable = this._runtime.createNewGlobalVariable(`${keyToPush}`, Variable.SCALAR_TYPE);
                stage.variables[variable.id].value = keyToPush;
            }
            finalVariableValues.push(keyToPush);
        }
        const satsSorted = Object.keys(this._satellites).sort();
        for (let j = 0; j < satsSorted.length; j++) {
            const match = this._matching(satsSorted[j]);
            if (!match) {
                finalVariableValues.push(satsSorted[j]);
            }
        }

        
        stage.variables[this._satId].value = finalVariableValues;
        vm.refreshWorkspace();
    } else {
        for (let i = 0; i < this._satellitesList.length; i++) {
            const [key] = Object.entries(this._satellitesList[i]);
            const keyValue = `${key}`;
            const splitKeyValue = keyValue.split(',');
            const keyToPush = splitKeyValue[0];
            finalVariableValues.push(keyToPush);
        }
        const satsSorted = Object.keys(this._satellites).sort();
        for (let i = 0; i < satsSorted.length; i++) {
            const match = this._matching(satsSorted[i]);
            if (!match) {
                finalVariableValues.push(satsSorted[i]);
            }
        }
        stage.variables[this._satId].value = finalVariableValues;
        vm.refreshWorkspace();
    }
};

// now the solution across mqttControl.js and virtual-machine.js

