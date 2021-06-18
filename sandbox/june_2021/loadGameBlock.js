// import statements:

const fs = require('fs');
const path = require('path');
const readFileToBuffer = require('../src/util/readProjectFile').readFileToBuffer;


// code structure adapted/borrowd from the way projects are loaded and ran in the test suites
loadGameFile (args) {
    this.reader = new FileReader();
    // const gamePath = `${process.cwd()}/game/${args.GAMENAME}.sb3`;
    // const file = new File('ChildGame.sb3', {
    //     name: 'ChildGame.sb3',
    //     path: gamePath
    // });

    const uri = path.resolve(__dirname, `${process.cwd()}/game/${args.GAMENAME}.sb3`);
    const projectData = readFileToBuffer(uri);

    // await vm.loadProject(projectData);
    // debugger
    this.reader.readAsArrayBuffer(file);
    this.reader.onload = () => {
        if (this.client) {
            this.DisconnectMqtt();
        }
        this.start();
        this.clear();
        this.setCompatibilityMode(false);
        this.setTurboMode(false);
        log.info(`Loading ${gamePath}`);
        this.loadProject(projectData);
        // this.emitWorkspaceUpdate();
        // this.runtime.on(Runtime.CLIENT_CONNECTED, () => {
        //     this.runtime.emit('START_GAME');
        // });
    };
}