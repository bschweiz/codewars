waitUntil (args, util) {
        debugger
        console.log(args, 'args from waitUntil');
        // why is args thought to be an object? and why TOIC in all caps?
        //  is there a 'TOPIC' type created somewhere?
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


// args needs to be the topic addreass aka heirarchy passed uniquely every 
// time, not some dumb boolean set and then passed you HDP
    