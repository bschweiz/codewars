const Cast = require('../util/cast');
const convert = require('../engine/parseSequence');
const convertBase = new convert();
const Color = require('../util/color');
const SoundData = require('../import/SoundFiles/soundData');
const Timer = require('../util/timer');
const VM = require('../virtual-machine');

class Scratch3MQTTListeners {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        this.runtime.on('MQTT_INBOUND', data => {
            this.runtime.startHats('listen_mqttinbound', {
                MQTT_OPTION: data
            });
            this.runtime.startHats('listen_mqttinbound', {
                MQTT_OPTION: 'any'
            });
        });
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            listen_gatewayMQTT: this.gatewayMQTT,
            listen_broadcast: this.broadcastMQTTtoScratch,
            
        };
    }

    getHats () {
        return {
            listen_mqttinbound: {
                restartExistingThreads: true
            },
            listen_whenmqttpubreceived: {
                restartExistingThreads: true
            }
        };
    }

    broadcastMQTTtoScratch (args, util) {
        const broadcastVar = util.runtime.getTargetForStage().lookupBroadcastMsg(
            args.BROADCAST_OPTION.id, args.BROADCAST_OPTION.name);
        if (broadcastVar) {
            const broadcastOption = broadcastVar.name;
            util.startHats('listen_whenmqttpubreceived', {
                BROADCAST_OPTION: broadcastOption
            });
        }
    }


    gatewayMQTT (args, util) {
        this.runtime.on('SET_NEW_MODE', topic => {
            debugger
            console.log(`topic from listenToTopicMQTT: ${topic}, args: ${args}`)
            if (topic.topic.includes(args.TOPIC)) {
                console.log('Match found')
                return;
            } else {
                util.yield();
            };
            
        }) 
        let stringActions = '';

        if (args.TOPIC === '') {
            return;
        }

        if (args.TOPIC === 'topic') {
            return;
        }

        const topic = args.TOPIC.split('/');
        const last = topic.length - 1;
        const action = topic[last];

        // if (this.actions.length === 0) {
        //     const add = {[`${action}`]: false};
        //     this.actions.push(add);
        // } else {
        //     stringActions = JSON.stringify(this.actions);
        //     if (stringActions.includes(action)) {
        //         this.actions.length = 0;
        //         const add = {[`${action}`]: false};
        //         this.actions.push(add);
        //     } else {
        //         const add = {[`${action}`]: false};
        //         this.actions.push(add);
        //     }
        // }

        console.log(this.actions, 'actions');

        this.runtime.emit('SET_BROADCAST_LISTENER', {
            topic: args.TOPIC,
            action: action
        });
    }

    waitUntil (args, util) {
        console.log(args, 'args from waitUntil');
        const topic = args.TOPIC.split('/');
        const last = topic.length - 1;
        const action = topic[last];
        let condition = '';

        for (let i = 0; i < this.actions.length; i++) {
            const keys = Object.keys(this.actions[i]);
            if (action === keys[0]) {
                condition = Object.values(this.actions[i])[0];
            }
        }

        if (!condition) {
            util.yield();
        } else {
            return;
        }
    }

    startCountdown (args) {
        this.runtime.emit('START_GAME');
    }

    whenGameStarted (args, util) {
        if (!this.gameFirst) {
            this.runtime.emit('ADD_GAME_START_LISTENER');
        }

        this.gameFirst = true;
        const condition = this.gameStart;

        if (!condition) {
            util.yield();
        } else {
            setTimeout(() => {
                this.runtime.emit('RESET_GAME_STARTED');
            }, 2000);
        }

    }

    checkAndResetThread (args, util) {
        
        util.startBranchFromTopBlock(1, false);
        
    }
}

module.exports = Scratch3MQTTListeners;
