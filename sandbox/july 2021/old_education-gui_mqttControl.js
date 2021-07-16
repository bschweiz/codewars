import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
const decoder = new TextDecoder();
import SoundFiles from '../lib/soundFiles';

import {
  openMQTTModal,
  closeMQTTModal
} from '../reducers/mqttModal.js';

import { setProjectRunState } from '../reducers/project-state.js';
import MQTTModal from '../components/MQTTModal/MQTTModal';

import WebBTButtonComponent from '../components/webbt-button/webbt-button.js';

const NOT_FOUND = ' ';

class MQTTButton extends React.Component {
    constructor (props) {
        super(props);
        console.log(props, 'propsINCONTROL');
        this.handleClick = this.handleClick.bind(this);
        this.positionsCopy = [];
        this.copyThePositions = true;
        this._time1 = 0;
        this._time2 = 0;
        this._time3 = 0;
        this._time4 = 0;
        this._satellites = {};
        this._soundsByName = {};
        this._timeoutIds = [];
        this._timeoutIds1 = [];
        this._timeoutIds2 = [];
        this._timeoutIds3 = [];
        this._timeoutIds4 = [];
        this._satId = '';
        this.NOT_FOUND = ' ';

        this.isSatelliteTouched = false;

        // this.props.vm.runtime.on('CHECK_IF_TOUCHED', (data) => {
        //     this.isSatelliteTouched = this.isTouched(data.satellite);
        //     console.log(this.isSatelliteTouched, 'isitTouched');
        //     this.props.vm.runtime.emit('IS_TOUCHED', {
        //         touched: this.isSatelliteTouched,
        //     })
        // });

        this.props.vm.runtime.on('PLAY_SOUND_MQTT', (data) => {
            this.playSoundMQTT(data);
        });
        this.props.vm.runtime.on('STOP_SEQUENCE', () => {
            this.stopSequences();
        });
        this.props.vm.runtime.on('STOP_SEQUENCE_1', () => {
            this.stopSequences1();
        });
        this.props.vm.runtime.on('STOP_SEQUENCE_2', () => {
            this.stopSequences1();
        });
        this.props.vm.runtime.on('STOP_SEQUENCE_3', () => {
            this.stopSequences1();
        })
        this.props.vm.runtime.on('STOP_SEQUENCE_4', () => {
            this.stopSequences1();
        });
    }


    handleClick () {
      this.props.openModal();
    }

    findSatelliteName (name) {
        switch (name) {
            case `${this.props.satOneName}`:
                return 1;
            case `${this.props.satTwoName}`: 
                return 2;
            case `${this.props.satThreeName}`: 
                return 3;
            case `${this.props.satFourName}`: 
                return 4;
        }
    }

    onMessage (topic, payload) {
      // console.log(`onMessage fired for topic: ${topic}, payload: ${payload}`);
      const t = topic.split('/');
      console.log(topic, 'topics');
      if (topic === null || t.count < 2) return;
      if (t[0] === 'sat' && t[1] === 'Virtual Sat' && t[2] === 'ev' && t[3] === 'touch') {
        let isTouched = false;
        const message = decoder.decode(payload);
        if (message === '1') {
            isTouched = true;
        } else {
            isTouched = false;
        }
        const data = {
            sender : t[1],
            touched : isTouched,
        }
        this.props.vm.runtime.emit('IS_TOUCHED', data);
     } else if (t[0] === 'app' && t[1] === 'menu' && t[2] === 'mode') {
        this.props.vm.modeHandler(payload); // this is a presence message
    } else if (t[0] === 'sat' && t[2] === 'cmd' && t[3] === 'fx') {
        const message = decoder.decode(payload);
        this.props.setProjectState(true);
        console.log(topic, message, 'DISPLAYMESSAGE');
        if (message === 'LS: STOPCLEAR' || message.includes('AS') || message === 'Stop') {
            return;
        } else {
            const satellite = this.findSatelliteName(t[1]);
            if (satellite === 1) {
                console.log(this._time1, 'time1');
                if (this._time1 > 1) {
                    this.stopSequences1();
                    setTimeout(() => {
                        this.displaySequence1(satellite, message);
                    }, 100);
                } else {
                    this.displaySequence1(satellite, message);
                }
            } else if (satellite === 2) {
                if (this._time2 > 1) {
                    this.stopSequences2();
                    setTimeout(() => {
                        this.displaySequence2(satellite, message);
                    }, 100);
                } else {
                    this.displaySequence2(satellite, message);
                }
            } else if (satellite === 3) {
                if (this._time3 > 1) {
                    this.stopSequences3();
                    setTimeout(() => {
                        this.displaySequence3(satellite, message);
                    }, 100);
                } else {
                    this.displaySequence3(satellite, message);
                }
            } else if (satellite === 4) {
                if (this._time4 > 1) {
                    this.stopSequences4();
                    setTimeout(() => {
                        this.displaySequence4(satellite, message);
                    }, 100);
                } else {
                    this.displaySequence4(satellite, message);
                }
            }
        } 
      } else if (t[1] === 'sat' && t[3] === 'cmd' && t[4] === 'fx') {
        const message = decoder.decode(payload);
        this.props.setProjectState(true);
        console.log(topic, message, 'DISPLAYMESSAGE');
        if (message === 'LS: STOPCLEAR' || message.includes('AS')) {
            return;
        } else {
            console.log(topic, 'topicWE HIT!');
            const satellite = this.findSatelliteName(t[2]);
            if (satellite === 1) {
                console.log(this._time1, 'time1');
                if (this._time1 > 1) {
                    this.stopSequences1();
                    setTimeout(() => {
                        this.displaySequence1(satellite, message);
                    }, 100);
                } else {
                    this.displaySequence1(satellite, message);
                }
            } else if (satellite === 2) {
                if (this._time2 > 1) {
                    this.stopSequences2();
                    setTimeout(() => {
                        this.displaySequence2(satellite, message);
                    }, 100);
                } else {
                    this.displaySequence2(satellite, message);
                }
            } else if (satellite === 3) {
                if (this._time3 > 1) {
                    this.stopSequences3();
                    setTimeout(() => {
                        this.displaySequence3(satellite, message);
                    }, 100);
                } else {
                    this.displaySequence3(satellite, message);
                }
            } else if (satellite === 4) {
                if (this._time4 > 1) {
                    this.stopSequences4();
                    setTimeout(() => {
                        this.displaySequence4(satellite, message);
                    }, 100);
                } else {
                    this.displaySequence4(satellite, message);
                }
            }
        }
    } else if (t[0] === 'sat' && t[2] === 'ev' && t[3] === 'touch') {
        const message = decoder.decode(payload);
        console.log(topic[1], 'topic');
        console.log(message, 'message');
        this.props.setProjectState(true);
        // if (message === '1') {
        //     // this.props.vm.runtime.emit('TOUCH_EVENT_SATELLITE', {topic: t[1]})
        //     this.touchHandler(t[1], message);
        // } else {
        //     this.touchHandler(t[1], message);
        // }
        this.touchHandler(t[1], message);
    } else if (t[0] === 'sat' && t[2] === 'online') {
        const message = decoder.decode(payload);
        this._satelliteStatusHandler(t[1]);
    } else if (t[0] === 'fwserver' && t[1] === 'files') {
        this.firmwareHandler(payload);
    } else if (t[0] === 'sat' && t[2] === 'ev' && t[3] === 'radar') {
        const message = decoder.decode(payload);
        const data = {
            satellite: t[1],
            sensing: message,
        };
        this.props.vm.runtime.emit('HAS_PRESENCE', data);
    }
}
    

    firmwareHandler (payload) {
        // log.info(`firmware handler fired`);
        const json = JSON.parse(payload);
        const files = json.files;
        this.setupSoundVar(files);
        // this._setupLightVar(files);
        // this._runtime.emit(this._runtime.constructor.PERIPHERAL_LIST_UPDATE, this._satellites);
    };

    _satelliteStatusHandler (sender) {
        // log.info(`satelliteStatusHandler fired for sender: ${sender}`);
        this._satellites[sender] = {
            isTouched: false,
            hasPresence: false
        };
        const stage = this.props.vm.runtime.getTargetForStage();
        let singleSat = stage.lookupVariableByNameAndType(`${sender}`, '');
        let allSats = stage.lookupVariableByNameAndType('All_Satellites', 'list');
        if (!allSats) {
            allSats = this.props.workspace.createVariable(`All_Satellites`, 'list', false, false);
            singleSat = this.props.workspace.createVariable(`${sender}`, '', false, false);
        }
        setTimeout(() => {
            stage.variables[allSats.id_].value = Object.keys(this._satellites);
            stage.variables[singleSat.id_].value = `${sender}`;
        },5000);
        // this.setRadarConfiguration({
        //     SATELLITE: sender,
        //     FSPEED: ['2'],
        //     BSPEED: ['2'],
        //     FMAG: ['5'],
        //     BMAG: ['5'],
        //     DET: ['1']
        // });
        // this._runtime.emit(this._runtime.constructor.PERIPHERAL_LIST_UPDATE, this._satellites);
        this.props.vm.setSatellites(this._satellites);
    };

    setupSoundVar (names) {
        const stage = this.props.vm.runtime.getTargetForStage();
        const wavs = names.filter(currentValue => (currentValue.includes('.wav')));
        const soundsByName = {Silence: 'AS: STOP'};
        wavs.forEach(currentValue => {
            const val = currentValue.replace('.wav', '');
            soundsByName[val] = `AS: 1,${currentValue}`;
        });
        this._soundsByName = Object.freeze(soundsByName);

        // Setup the variable
        let allSounds = stage.lookupVariableByNameAndType('All_Sounds', 'list');
        if (!allSounds) {
            allSounds = this.props.workspace.createVariable('All_Sounds', 'list', false, false);
            console.log(allSounds, 'allSounds');
        }
        setTimeout(() => {
            stage.variables[allSounds.id_].value = wavs.map(currentValue => currentValue.replace('.wav', ''));
        },5000);
    };

    presenceHandler (sender, payload) {
        // log.info(`presenceHandler fired for payload: ${payload}`);
        if (!sender.includes('BC')) {
            return;
        }
        this._satellites[sender].hasPresence = payload[0] === 0x31;
        console.log(payload, 'PRESENCEpayload');
        if (payload === '1') {
            this.props.vm.runtime.emit('HAS_PRESENCE', {
                sender: sender,
                presence: true
            });
            console.log('hit for payload 1');
        } else {
            this.props.vm.runtime.emit('HAS_PRESENCE', {
                sender: sender,
                presence: false
            });
            console.log('hit for payload 0');
        }
    };

    touchHandler (sender, payload) {
        // log.info(`touchHandler fired for payload: ${payload}`);
        if (!sender.includes('BC')) {
            return;
        }
        this._satellites[sender].isTouched = payload[0] === 0x31;
        console.log(payload, 'TOUCHpayload');
        if (payload === '1') {
            this.props.vm.runtime.emit('IS_TOUCHED', {
                sender: sender,
                touched: true
            });
            console.log('hit for payload 1');
        } else {
            this.props.vm.runtime.emit('IS_TOUCHED', {
                sender: sender,
                touched: false
            });
            console.log('hit for payload 0');
        }
    };

    isTouched (sat) {
        // const sat = this.findSatelliteSerial(satellite);
        console.log(sat, 'sat');
        return sat &&
        sat !== this.NOT_FOUND &&
        this._satellites &&
        this._satellites !== this.NOT_FOUND &&
        this._satellites[sat] &&
        this._satellites[sat] !== this.NOT_FOUND &&
        this._satellites[sat].isTouched;
    }

    hasPresence (sat) {
        console.log(sat, 'sat from has Presence');
        return sat &&
        sat !== NOT_FOUND &&
        this._satellites &&
        this._satellites !== NOT_FOUND &&
        this._satellites[sat] &&
        this._satellites[sat] !== NOT_FOUND &&
        this._satellites[sat].hasPresence;
    }

    stopSequences () {
        this._timeoutIds1.forEach(id => clearTimeout(id));
        this._timeoutIds2.forEach(id => clearTimeout(id));
        this._timeoutIds3.forEach(id => clearTimeout(id));
        this._timeoutIds4.forEach(id => clearTimeout(id));
        this._time1 = 0;
        this._time2 = 0;
        this._time3 = 0;
        this._time4 = 0;
        let positions = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
        this.positionsCopy = [...positions];
        this.props.vm.runtime.emit('PIXEL_EVENT_1', {
            type: 'sequence1',
            value: this.positionsCopy
        })
        this.props.vm.runtime.emit('PIXEL_EVENT_2', {
            type: 'sequence2',
            value: this.positionsCopy
        })
        this.props.vm.runtime.emit('PIXEL_EVENT_3', {
            type: 'sequence3',
            value: this.positionsCopy
        })
        this.props.vm.runtime.emit('PIXEL_EVENT_4', {
            type: 'sequence4',
            value: this.positionsCopy
        })
    }

    stopSequences1 () {
        this._timeoutIds1.forEach(id => clearTimeout(id));
        this._time1 = 0;
        let positions = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
        // this.positionsCopy = [...positions];
        this.props.vm.runtime.emit('PIXEL_EVENT_1', {
            type: 'sequence1',
            value: positions,
        })
    }

    stopSequences2 () {
        this._timeoutIds2.forEach(id => clearTimeout(id));
        this._time2 = 0;
        let positions = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
        // this.positionsCopy = [...positions];
        this.props.vm.runtime.emit('PIXEL_EVENT_2', {
            type: 'sequence2',
            value: positions
        })
    }

    stopSequences3 () {
        this._timeoutIds3.forEach(id => clearTimeout(id));
        this._time3 = 0;
        let positions = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
        this.positionsCopy = [...positions];
        this.props.vm.runtime.emit('PIXEL_EVENT_3', {
            type: 'sequence3',
            value: this.positionsCopy
        })
    }

    stopSequences4 () {
        this._timeoutIds4.forEach(id => clearTimeout(id));
        this._time4 = 0;
        let positions = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
        this.positionsCopy = [...positions];
        this.props.vm.runtime.emit('PIXEL_EVENT_4', {
            type: 'sequence4',
            value: this.positionsCopy
        })
    }

    playSound (soundName) {
        console.log(soundName, 'soundName');
        const sounds = SoundFiles.sounds;
        const ext = sounds.find((x) => x.name === soundName);
        let audio = new Audio(`https://cdn.assets.scratch.mit.edu/internalapi/asset/${ext.md5ext}/get`);
        console.log(audio, 'audio');
        audio.play();
    }

    playSoundMQTT (args) {
        console.log(args, 'args');
        // const satellite = this.findSatelliteSerial(args.SATELLITE);
        const outboundTopic = `sat/${args.satellite}/cmd/fx`;
        const string = [this._soundsByName[args.sound]];
        const utf8Encode = new TextEncoder();
        const arr = utf8Encode.encode(string);
        this.props.vm.client.publish(outboundTopic, arr);
        return Promise.resolve();
    }
    
    sendGameStart (message) {
        this.props.vm.runtime.emit('GAME_STARTED', () => {
            message
        })
    }

    sendTimerStart (message) {
        this.props.vm.runtime.emit('TIMER_STARTED', () => {
            message
        })
    }

    sendCelebration (message) {
        this.props.vm.runtime.emit('CELEBRATION_STARTED', () => {
            message
        })
    }

    displaySequence1 (satellite, message) {
        debugger
      let seq = '';
        let splitArgs = [];
        let loopAmount = '';
        splitArgs = message.split(',');
        const splitForLoopNum = splitArgs[0].split(':');
        (splitForLoopNum[1].trim() === '-1') ? loopAmount = 100 : loopAmount = splitForLoopNum[1].trim();
        // const sat = require(`!raw-loader!../import/SatelliteFiles/${splitArgs[1]}`);
        const sat = require(`!raw-loader!../sequences/${splitArgs[1]}`);
        const split = sat.default.split('\n');
        const filtered = split.filter(e => e === 0 || e);
        seq = filtered.join(',');
        const stringSplit = seq.split(',');
        const filteredList = stringSplit.filter(e => e === 0 || e);
        let arrayLength = filteredList.length;
        const pos = [];
        const totalPos = [];
        let count = 0;
        let j = 0
        while (arrayLength > 0) {
            while (filteredList[j].includes('L')) {
                pos.push(filteredList[j]);
                j++;
                arrayLength--;
                count++;
            }
            totalPos.push(pos.join(','));
            if (filteredList[j].includes('D')) {
                totalPos.push(filteredList[j]);
                j++;
                pos.length = 0;
                arrayLength--;
                count++;
            }
        }
        while (loopAmount > 0) {
            let positions = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
            for (let i = 0; i < totalPos.length; i++) {
                if (this.copyThePositions) {
                    this.positionsCopy = [...positions];
                }
                let splitHex = '';
                if (totalPos[i].includes('L')) {
                    if (totalPos[i].includes(',')) {
                        const splitted = totalPos[i].split(',');
                        let splitLength = splitted.length;
                        let k = 0;
                        while (splitLength > 0) {
                            this.copyThePositions = false;
                            splitHex = splitted[k].split(' ');
                            const convertedHSV = this.props.vm.convertHSVBrightness(`#${splitHex[1]}`);
                            const converted = this.props.vm.convertBase(splitHex[2]);
                            for (let i = 0; i < converted.length; i++) {
                                // this.positionsCopy.splice(converted[i], 1, `${this.shadeHexColor(splitHex[1], 10)}`);
                                this.positionsCopy.splice(converted[i], 1, convertedHSV);
                            }
                            splitLength--;
                            k++;
                        }
                        const sequence = [...this.positionsCopy];
                        const message = {
                            satellite: satellite,
                            sequence: sequence
                        };
                        const timeoutId = setTimeout(() => {
                            this.props.vm.runtime.emit(`PIXEL_EVENT_${satellite}`, {
                                type: `sequence${satellite}`,
                                value: sequence
                            });
                        }, this._time1 += Number(10));
                        this._timeoutIds1.push(timeoutId);
                    } else {
                        this.copyThePositions = false;
                        splitHex = totalPos[i].split(' ');
                        console.log(splitHex, 'splitHex');
                        const converted = this.props.vm.convertBase(splitHex[2]);
                        const convertedHSV = this.props.vm.convertHSVBrightness(`#${splitHex[1]}`);
                        for (let i = 0; i < converted.length; i++) {
                            this.positionsCopy.splice(converted[i], 1, convertedHSV);
                        }
                        const sequence = [...this.positionsCopy];
                        // const message = [satellite, sequence];
                        const timeoutId = setTimeout(() => {
                            this.props.vm.runtime.emit(`PIXEL_EVENT_${satellite}`, {
                                type: `sequence${satellite}`,
                                value: sequence
                            });
                        }, this._time1 += Number(10));
                        this._timeoutIds1.push(timeoutId);
                    }
                } else {
                    const splitHex = totalPos[i].split(' ');
                    const sequence = [...this.positionsCopy];
                    const timeoutId = setTimeout(() => {}, this._time1 += Number(splitHex[1]));
                    this._timeoutIds1.push(timeoutId);
                    this.copyThePositions = true;
                }
            }
            loopAmount--;
        }
        const positions = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
        const timeoutId = setTimeout(() => {
            this.props.vm.emit(`PIXEL_EVENT_${satellite}`, {
                type: `sequence${satellite}`,
                value: positions
            });
            this.props.setProjectState(false);
            this._time1 = 0;
        }, this._time1 += Number(100));
        this._timeoutIds1.push(timeoutId);
    }

    displaySequence2 (satellite, message) {
        let seq = '';
          let splitArgs = [];
          // const time = this.satelliteTimeSelector(satellite);
          // console.log(time, 'time');
          let loopAmount = '';
          splitArgs = message.split(',');
          const splitForLoopNum = splitArgs[0].split(':');
          console.log(splitForLoopNum, 'from displaySequence2');
        (splitForLoopNum[1].trim() === '-1') ? loopAmount = 100 : loopAmount = splitForLoopNum[1].trim();
        // const sat = require(`!raw-loader!../import/SatelliteFiles/${splitArgs[1]}`);
        const sat = require(`!raw-loader!../sequences/${splitArgs[1]}`);
        const split = sat.default.split('\n');
        const filtered = split.filter(e => e === 0 || e);
        seq = filtered.join(',');
        const stringSplit = seq.split(',');
        const filteredList = stringSplit.filter(e => e === 0 || e);
        let arrayLength = filteredList.length;
        const pos = [];
        const totalPos = [];
        let count = 0;
        let j = 0
        while (arrayLength > 0) {
            while (filteredList[j].includes('L')) {
                pos.push(filteredList[j]);
                j++;
                arrayLength--;
                count++;
            }
            totalPos.push(pos.join(','));
            if (filteredList[j].includes('D')) {
                totalPos.push(filteredList[j]);
                j++;
                pos.length = 0;
                arrayLength--;
                count++;
            }
        }
        while (loopAmount > 0) {
            let positions = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
            for (let i = 0; i < totalPos.length; i++) {
                if (this.copyThePositions) {
                    this.positionsCopy = [...positions];
                }
                let splitHex = '';
                if (totalPos[i].includes('L')) {
                    if (totalPos[i].includes(',')) {
                        const splitted = totalPos[i].split(',');
                        let splitLength = splitted.length;
                        let k = 0;
                        while (splitLength > 0) {
                            this.copyThePositions = false;
                            splitHex = splitted[k].split(' ');
                            const convertedHSV = this.props.vm.convertHSVBrightness(`#${splitHex[1]}`);
                            const converted = this.props.vm.convertBase(splitHex[2]);
                            for (let i = 0; i < converted.length; i++) {
                                // this.positionsCopy.splice(converted[i], 1, `${this.shadeHexColor(splitHex[1], 10)}`);
                                this.positionsCopy.splice(converted[i], 1, convertedHSV);
                            }
                            splitLength--;
                            k++;
                        }
                        const sequence = [...this.positionsCopy];
                        const message = {
                            satellite: satellite,
                            sequence: sequence
                        };
                        const timeoutId = setTimeout(() => {

                            this.props.vm.runtime.emit(`PIXEL_EVENT_${satellite}`, {
                                type: `sequence${satellite}`,
                                value: sequence
                            });
                        }, this._time2 += Number(10));
                        this._timeoutIds2.push(timeoutId);
                    } else {
                        this.copyThePositions = false;
                        splitHex = totalPos[i].split(' ');
                        console.log(splitHex, 'splitHex');
                        const converted = this.props.vm.convertBase(splitHex[2]);
                        const convertedHSV = this.props.vm.convertHSVBrightness(`#${splitHex[1]}`);
                        for (let i = 0; i < converted.length; i++) {
                            this.positionsCopy.splice(converted[i], 1, convertedHSV);
                        }
                        const sequence = [...this.positionsCopy];
                        // const message = [satellite, sequence];
                        const timeoutId = setTimeout(() => {
                            this.props.vm.runtime.emit(`PIXEL_EVENT_${satellite}`, {
                                type: `sequence${satellite}`,
                                value: sequence
                            });
                        }, this._time2 += Number(100));
                        this._timeoutIds2.push(timeoutId);
                    }
                } else {
                    const splitHex = totalPos[i].split(' ');
                    const sequence = [...this.positionsCopy];
                    const timeoutId = setTimeout(() => {}, this._time2 += Number(splitHex[1]));
                    this._timeoutIds2.push(timeoutId);
                    this.copyThePositions = true;
                }
            }
            loopAmount--;
        }
        const positions = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
        const timeoutId = setTimeout(() => {
            this.props.vm.emit(`PIXEL_EVENT_${satellite}`, {
                type: `sequence${satellite}`,
                value: positions
            });
            this.props.setProjectState(false);
            this._time2 = 0;
        }, this._time2 += Number(100));
        this._timeoutIds2.push(timeoutId);
      }

      displaySequence3 (satellite, message) {
        let seq = '';
          let splitArgs = [];
          // const time = this.satelliteTimeSelector(satellite);
          // console.log(time, 'time');
          let loopAmount = '';
          splitArgs = message.split(',');
          const splitForLoopNum = splitArgs[0].split(':');
          (splitForLoopNum[1].trim() === '-1') ? loopAmount = 100 : loopAmount = splitForLoopNum[1].trim();
          // const sat = require(`!raw-loader!../import/SatelliteFiles/${splitArgs[1]}`);
          const sat = require(`!raw-loader!../sequences/${splitArgs[1]}`);
          const split = sat.default.split('\n');
          const filtered = split.filter(e => e === 0 || e);
          seq = filtered.join(',');
          const stringSplit = seq.split(',');
          const filteredList = stringSplit.filter(e => e === 0 || e);
          let arrayLength = filteredList.length;
          const pos = [];
          const totalPos = [];
          let count = 0;
          let j = 0
          while (arrayLength > 0) {
              while (filteredList[j].includes('L')) {
                  pos.push(filteredList[j]);
                  j++;
                  arrayLength--;
                  count++;
              }
              totalPos.push(pos.join(','));
              if (filteredList[j].includes('D')) {
                  totalPos.push(filteredList[j]);
                  j++;
                  pos.length = 0;
                  arrayLength--;
                  count++;
              }
          }
          while (loopAmount > 0) {
              let positions = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
              for (let i = 0; i < totalPos.length; i++) {
                  if (this.copyThePositions) {
                      this.positionsCopy = [...positions];
                  }
                  let splitHex = '';
                  if (totalPos[i].includes('L')) {
                      if (totalPos[i].includes(',')) {
                          const splitted = totalPos[i].split(',');
                          let splitLength = splitted.length;
                          let k = 0;
                          while (splitLength > 0) {
                              this.copyThePositions = false;
                              splitHex = splitted[k].split(' ');
                              const convertedHSV = this.props.vm.convertHSVBrightness(`#${splitHex[1]}`);
                              const converted = this.props.vm.convertBase(splitHex[2]);
                              for (let i = 0; i < converted.length; i++) {
                                  // this.positionsCopy.splice(converted[i], 1, `${this.shadeHexColor(splitHex[1], 10)}`);
                                  this.positionsCopy.splice(converted[i], 1, convertedHSV);
                              }
                              splitLength--;
                              k++;
                          }
                          const sequence = [...this.positionsCopy];
                          const message = {
                              satellite: satellite,
                              sequence: sequence
                          };
                          const timeoutId = setTimeout(() => {
  
                              this.props.vm.runtime.emit(`PIXEL_EVENT_${satellite}`, {
                                  type: `sequence${satellite}`,
                                  value: sequence
                              });
                          }, this._time3 += Number(10));
                          this._timeoutIds3.push(timeoutId);
                      } else {
                          this.copyThePositions = false;
                          splitHex = totalPos[i].split(' ');
                          console.log(splitHex, 'splitHex');
                          const converted = this.props.vm.convertBase(splitHex[2]);
                          const convertedHSV = this.props.vm.convertHSVBrightness(`#${splitHex[1]}`);
                          for (let i = 0; i < converted.length; i++) {
                              this.positionsCopy.splice(converted[i], 1, convertedHSV);
                          }
                          const sequence = [...this.positionsCopy];
                          // const message = [satellite, sequence];
                          const timeoutId = setTimeout(() => {
                              this.props.vm.runtime.emit(`PIXEL_EVENT_${satellite}`, {
                                  type: `sequence${satellite}`,
                                  value: sequence
                              });
                          }, this._time3 += Number(10));
                          this._timeoutIds3.push(timeoutId);
                      }
                  } else {
                      const splitHex = totalPos[i].split(' ');
                      const sequence = [...this.positionsCopy];
                      const timeoutId = setTimeout(() => {}, this._time3 += Number(splitHex[1]));
                      this._timeoutIds3.push(timeoutId);
                      this.copyThePositions = true;
                  }
              }
              loopAmount--;
          }
          const positions = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
          const timeoutId = setTimeout(() => {
              this.props.vm.emit(`PIXEL_EVENT_${satellite}`, {
                  type: `sequence${satellite}`,
                  value: positions
              });
              this.props.setProjectState(false);
              this._time3 = 0;
          }, this._time3 += Number(100));
          this._timeoutIds3.push(timeoutId);
      }

      displaySequence4 (satellite, message) {
        let seq = '';
          let splitArgs = [];
          // const time = this.satelliteTimeSelector(satellite);
          // console.log(time, 'time');
          let loopAmount = '';
          splitArgs = message.split(',');
          const splitForLoopNum = splitArgs[0].split(':');
          (splitForLoopNum[1].trim() === '-1') ? loopAmount = 100 : loopAmount = splitForLoopNum[1].trim();
          // const sat = require(`!raw-loader!../import/SatelliteFiles/${splitArgs[1]}`);
          const sat = require(`!raw-loader!../sequences/${splitArgs[1]}`);
          const split = sat.default.split('\n');
          const filtered = split.filter(e => e === 0 || e);
          seq = filtered.join(',');
          const stringSplit = seq.split(',');
          const filteredList = stringSplit.filter(e => e === 0 || e);
          let arrayLength = filteredList.length;
          const pos = [];
          const totalPos = [];
          let count = 0;
          let j = 0
          while (arrayLength > 0) {
              while (filteredList[j].includes('L')) {
                  pos.push(filteredList[j]);
                  j++;
                  arrayLength--;
                  count++;
              }
              totalPos.push(pos.join(','));
              if (filteredList[j].includes('D')) {
                  totalPos.push(filteredList[j]);
                  j++;
                  pos.length = 0;
                  arrayLength--;
                  count++;
              }
          }
          while (loopAmount > 0) {
              let positions = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
              for (let i = 0; i < totalPos.length; i++) {
                  if (this.copyThePositions) {
                      this.positionsCopy = [...positions];
                  }
                  let splitHex = '';
                  if (totalPos[i].includes('L')) {
                      if (totalPos[i].includes(',')) {
                          const splitted = totalPos[i].split(',');
                          let splitLength = splitted.length;
                          let k = 0;
                          while (splitLength > 0) {
                              this.copyThePositions = false;
                              splitHex = splitted[k].split(' ');
                              const convertedHSV = this.props.vm.convertHSVBrightness(`#${splitHex[1]}`);
                              const converted = this.props.vm.convertBase(splitHex[2]);
                              for (let i = 0; i < converted.length; i++) {
                                  // this.positionsCopy.splice(converted[i], 1, `${this.shadeHexColor(splitHex[1], 10)}`);
                                  this.positionsCopy.splice(converted[i], 1, convertedHSV);
                              }
                              splitLength--;
                              k++;
                          }
                          const sequence = [...this.positionsCopy];
                          const message = {
                              satellite: satellite,
                              sequence: sequence
                          };
                          const timeoutId = setTimeout(() => {
  
                              this.props.vm.runtime.emit(`PIXEL_EVENT_${satellite}`, {
                                  type: `sequence${satellite}`,
                                  value: sequence
                              });
                          }, this._time4 += Number(10));
                          this._timeoutIds.push(timeoutId);
                      } else {
                          this.copyThePositions = false;
                          splitHex = totalPos[i].split(' ');
                          console.log(splitHex, 'splitHex');
                          const converted = this.props.vm.convertBase(splitHex[2]);
                          const convertedHSV = this.props.vm.convertHSVBrightness(`#${splitHex[1]}`);
                          for (let i = 0; i < converted.length; i++) {
                              this.positionsCopy.splice(converted[i], 1, convertedHSV);
                          }
                          const sequence = [...this.positionsCopy];
                          // const message = [satellite, sequence];
                          const timeoutId = setTimeout(() => {
                              this.props.vm.runtime.emit(`PIXEL_EVENT_${satellite}`, {
                                  type: `sequence${satellite}`,
                                  value: sequence
                              });
                          }, this._time4 += Number(10));
                          this._timeoutIds.push(timeoutId);
                      }
                  } else {
                      const splitHex = totalPos[i].split(' ');
                      const sequence = [...this.positionsCopy];
                      const timeoutId = setTimeout(() => {}, this._time4 += Number(splitHex[1]));
                      this._timeoutIds.push(timeoutId);
                      this.copyThePositions = true;
                  }
              }
              loopAmount--;
          }
          const positions = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
          const timeoutId = setTimeout(() => {
              this.props.vm.emit(`PIXEL_EVENT_${satellite}`, {
                  type: `sequence${satellite}`,
                  value: positions
              });
              this.props.setProjectState(false);
              this._time4 = 0;
          }, this._time4 += Number(100));
          this._timeoutIds.push(timeoutId);
      }

    render () {
        return (
          <React.Fragment>
            <WebBTButtonComponent
                handleClick={this.handleClick}
            />
            <MQTTModal onMessage={(topic, payload) => this.onMessage(topic, payload)}
                       vm={this.props.vm}
            />
          </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
  pixelType: state.pixels.pixelType,
  client: state.client.mqttClient,
  satOneName: state.satNames.satelliteOne,
  satTwoName: state.satNames.satelliteTwo,
  satThreeName: state.satNames.satelliteThree,
  satFourName: state.satNames.satelliteFour,
  workspace: state.workspace.workspace,
});

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(openMQTTModal()),
  closeModal: () => dispatch(closeMQTTModal()),
  setProjectState: (state) => dispatch(setProjectRunState(state))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MQTTButton);
