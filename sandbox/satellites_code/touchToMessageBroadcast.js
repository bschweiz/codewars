util.startHats('event_whenbroadcastreceived', {
    BROADCAST_OPTION: topic
});

//  that above is what needs to be called from a block page like scratch3_touch.js

//  below is what i was working on from the VM


translateTouchInput (touchedSatVars) {
    const target = this.runtime.getTargetForStage();
    // needs to look for messages === 'sat/+/ev/touch' AS WELL AS unique refs: 'sat/BCFDDDXX/ev/touch'
    const uniqueBroadcastVar = target.lookupBroadcastMsg('', `sat/${touchedSatVars.ALL_SAT_TOUCH_SATID}/ev/touch`); // params: (id, name)
    const wildBroadcastVar = target.lookupBroadcastMsg('', `sat/+/ev/touch`); // params: (id, name)
    if (wildBroadcastVar) {
        this.runtime.emit('TOUCH_TO_BROADCAST_MSG', wildBroadcastVar, data);
    }
    if (uniqueBroadcastVar) {
        this.runtime.emit('TOUCH_TO_BROADCAST_MSG', uniqueBroadcastVar, data);
    }

}

//  which would get called here above:
//  i removed  this.translateTouchInput(touchedSatVars); for potential PR

this.runtime.on('SET_TOUCH_VARS', touchedSatVars => {
    this.createTouchVariables(touchedSatVars);
    this.translateTouchInput(touchedSatVars);
});