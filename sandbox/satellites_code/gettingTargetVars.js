/** FROM scratch-vm/src/virtual-machine.js */



const target = this.runtime.getTargetById(targetId);


const stageVariables = this.runtime.getTargetForStage().variables;
    let messageIds = [];
    for (const varId in stageVariables) {
        if (stageVariables[varId].type === Variable.BROADCAST_MESSAGE_TYPE) {
            messageIds.push(varId);
        }
    }

    const stage = this.runtime.getTargetForStage();




    broadcast (args, util) {
        const broadcastVar = util.runtime.getTargetForStage().lookupBroadcastMsg(
            args.BROADCAST_OPTION.id, args.BROADCAST_OPTION.name);
        if (broadcastVar) {
            const broadcastOption = broadcastVar.name;
            util.startHats('event_whenbroadcastreceived', {
                BROADCAST_OPTION: broadcastOption
            });
        }
    }
