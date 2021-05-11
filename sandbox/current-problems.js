waitUntil (args, util) {
        debugger
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
    