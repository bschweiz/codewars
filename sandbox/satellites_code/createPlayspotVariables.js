let headlessMode = true

setUpSoundVars (wavs) {
    const varName = 'All_Sounds';
    const varType = 'list';
    const stage = this.runtime.getTargetForStage();
    let allSounds = stage.lookupVariableByNameAndType(varName, varType);
    if (!allSounds) {
        allSounds = createPlayspotVariable(varName, varType);
        console.log(allSounds, 'allSounds');
    }
    setTimeout(() => {
        if (stage.variables[allSounds.id_]) {
            stage.variables[allSounds.id_].value = wavs.map(currentValue => currentValue.replace('.wav', ''));
        }
    }, 100);
}

createLightVariables (data) {
    const varName = '';
    const varType = '';
    const stage = this.runtime.getTargetForStage();
    let allLights = stage.lookupVariableByNameAndType('All_Lights', 'list');
    if (!allLights) {
        allLights = this.workspace.createVariable('All_Lights', 'list', false, false);
    }
    setTimeout(() => {
        if (stage.variables[allLights.id_]  !== undefined) {
            stage.variables[allLights.id_].value = data.map(currentValue => currentValue.replace('.txt', ''));
            this.runtime.emit(this.runtime.constructor.CLIENT_CONNECTED);
        }
    }, 100);
}

createSatelliteVariable (data) {
    const varName = '';
    const varType = '';
    const stage = this.runtime.getTargetForStage();
    let singleSat = stage.lookupVariableByNameAndType(`${data}`, '');
    if (!singleSat) {
        try {

            singleSat = this.workspace.createVariable(`${data}`, '', false, false);
        } catch (e) {
            if (e instanceof TypeError) {
                // params: (id, name, type, isCloud), different than above .createVariable
                singleSat = stage.createVariable(`${data}`, `${data}`, '', false);
            }
        }
    }
    setTimeout(() => {
        if (stage.variables[singleSat.id_] !== undefined) {
            stage.variables[singleSat.id_].value = `${data}`;
        }
    }, 100);
}

setAllSatellites (satellites) {
    const varName = '';
    const varType = '';
    this.satellites = satellites;
    const stage = this.runtime.getTargetForStage();
    let allSats = stage.lookupVariableByNameAndType('All_Satellites', 'list');
    if (!allSats) {
        allSats = this.workspace.createVariable(`All_Satellites`, 'list', false, false);
    }
    setTimeout(() => {
        if (stage.variables[allSats.id_] !== undefined) {
            stage.variables[allSats.id_].value = Object.keys(this.satellites);
        }
    }, 100);
}

setAliasVariables (data) {
    const varName = '';
    const varType = '';
    if (typeof data.payload === 'string' && data.payload !== '') {
        const stage = this.runtime.getTargetForStage();
        let aliasVariable = stage.lookupVariableByNameAndType(`${data.alias}`, '');
        if (!aliasVariable) {
            aliasVariable = this.workspace.createVariable(`${data.alias}`, '', false, false);
            console.log(aliasVariable, 'alias variable');
        }
        setTimeout(() => {
            if (stage.variables[aliasVariable.id_] !== undefined) {
                stage.variables[aliasVariable.id_].value = data.payload;
            }
        }, 100);
    }
}

setGroupVariables (data) {
    const varName = '';
    const varType = '';
    if (Array.isArray(data.payload) && data.payload !== []) {
        const stage = this.runtime.getTargetForStage();
        let groupVariable = stage.lookupVariableByNameAndType(`${data.group}`, 'list');
        if (!groupVariable) {
            groupVariable = this.workspace.createVariable(`${data.group}`, 'list', false, false);
            console.log(groupVariable, 'group variable');
        }
        setTimeout(() => {
            if (stage.variables[groupVariable.id_] !== undefined) {
                stage.variables[groupVariable.id_].value = data.payload;
            }
        }, 100);
    }
}

setTouchVariables (touchedSatVars) {
    const varName = '';
    const varType = '';
    const stage = this.runtime.getTargetForStage();
    
    let allSatTouchSatIdVar = stage.lookupVariableByNameAndType('ALL_SAT_TOUCH_SATID', '');
    if (!allSatTouchSatIdVar) {
        allSatTouchSatIdVar = this.workspace.createVariable('ALL_SAT_TOUCH_SATID', '', false, false);
        
        setTimeout(() => {
            stage.variables[allSatTouchSatIdVar.id_].value = `${touchedSatVars.ALL_SAT_TOUCH_SATID}`;
        }, 100);
    }
    if (allSatTouchSatIdVar) {
        allSatTouchSatIdVar.value = touchedSatVars.ALL_SAT_TOUCH_SATID;
    }

    let allSatTouchValue = stage.lookupVariableByNameAndType('ALL_SAT_TOUCH_VALUE', '');
    if (!allSatTouchValue) {
        allSatTouchValue = this.workspace.createVariable('ALL_SAT_TOUCH_VALUE', '', false, false);
        
        setTimeout(() => {
            stage.variables[allSatTouchValue.id_].value = `${touchedSatVars.ALL_SAT_TOUCH_VALUE}`;
        }, 100);
    }
    if (allSatTouchValue) {
        allSatTouchValue.value = touchedSatVars.ALL_SAT_TOUCH_VALUE;
    }

    let singleSatTouchValue = stage.lookupVariableByNameAndType(`${touchedSatVars.ALL_SAT_TOUCH_SATID}_TOUCH_VALUE`, '');
    if (!singleSatTouchValue && touchedSatVars.ALL_SAT_TOUCH_SATID !== '') {
        singleSatTouchValue = this.workspace.createVariable(`${touchedSatVars.ALL_SAT_TOUCH_SATID}_TOUCH_VALUE`, '', false, false);
        
        setTimeout(() => {
            stage.variables[singleSatTouchValue.id_].value = `${touchedSatVars.ALL_SAT_TOUCH_VALUE}`;
        }, 100);
    }
    if (singleSatTouchValue) {
        singleSatTouchValue.value = touchedSatVars.ALL_SAT_TOUCH_VALUE;
    }
}

setRadarVariables (radarSatVars) {
    const varName = '';
    const varType = '';
    const stage = this.runtime.getTargetForStage();
    
    let allSatRadarSatIdVar = stage.lookupVariableByNameAndType('ALL_SAT_RADAR_SATID', '');
    if (!allSatRadarSatIdVar) {
        allSatRadarSatIdVar = this.workspace.createVariable('ALL_SAT_RADAR_SATID', '', false, false);
        
        setTimeout(() => {
            stage.variables[allSatRadarSatIdVar.id_].value = `${radarSatVars.ALL_SAT_RADAR_SATID}`;
        }, 100);
    }
    if (allSatRadarSatIdVar) {
        allSatRadarSatIdVar.value = radarSatVars.ALL_SAT_RADAR_SATID;
    }

    let allSatRadarValue = stage.lookupVariableByNameAndType('ALL_SAT_RADAR_VALUE', '');
    if (!allSatRadarValue) {
        allSatRadarValue = this.workspace.createVariable('ALL_SAT_RADAR_VALUE', '', false, false);
        
        setTimeout(() => {
            stage.variables[allSatRadarValue.id_].value = `${radarSatVars.ALL_SAT_RADAR_VALUE}`;
        }, 100);
    }
    if (allSatRadarValue) {
        allSatRadarValue.value = radarSatVars.ALL_SAT_RADAR_VALUE;
    }

    let singleSatRadarValue = stage.lookupVariableByNameAndType(`${radarSatVars.ALL_SAT_RADAR_SATID}_RADAR_VALUE`, '');
    if (!singleSatRadarValue && radarSatVars.ALL_SAT_RADAR_SATID !== '') {
        singleSatRadarValue = this.workspace.createVariable(`${radarSatVars.ALL_SAT_RADAR_SATID}_RADAR_VALUE`, '', false, false);
        
        setTimeout(() => {
            stage.variables[singleSatRadarValue.id_].value = `${radarSatVars.ALL_SAT_RADAR_VALUE}`;
        }, 100);
    }
    if (singleSatRadarValue) {
        singleSatRadarValue.value = radarSatVars.ALL_SAT_RADAR_VALUE;
    }
}


createPlayspotVariable (varName, varType) {
    if (this.workspace.createVariable) {
        // workspace.createVariable(varName, OPTIONALvarType, OPTIONALvarId, OPTIONALisLocal, OPTIONALisCloud)
        singleSat = this.workspace.createVariable(`${data}`, '', false, false);
    } else {
        // params: stage.createVariable(id, name, type, isCloud)
        playspotVariable = stage.createVariable('', varName, varType, false);
        return playspotVariable;
    }
}


 // params: (id, name, type, isCloud), different than above .createVariable
 singleSat = stage.createVariable(`${data}`, `${data}`, '', false);

// workspace.createVariable(varName, OPTIONALvarType, OPTIONALvarId, OPTIONALisLocal, OPTIONALisCloud)
singleSat = this.workspace.createVariable(`${data}`, '', false, false);