const PlayerPool = require('./playerPool');
const GroupPool = require('./groupPool');

class Matchmaker {

    constructor() {
        this.playerPools = new Map([
            ["Male", new PlayerPool()],
            ["Female", new PlayerPool()],
            ["Other", new PlayerPool()]
        ]);

        this.idToPool = new Map();

        // this.groupPool = new GroupPool();
    }

    addPlayer(id, info) {
        this.playerPools.get(info.gender).addPlayer(id, info);
        this.idToPool.set(id, [info.gender, info.group]);
    }

    getGenderFromID(id) {
        return this.idToPool.get(id)[0];
    }

    getGroupFromID(id) {
        return this.idToPool.get(id)[1];
    }

    removePlayer(id) {
        const gender = this.getGenderFromID(id);
        const group = this.getGroupFromID(id);

        this.playerPools.get(gender).removePlayer(id, group);
        this.idToPool.delete(id);
    }

    printPools() {
        for (const [key, value] of this.playerPools.entries()) {
            console.log();
            console.log(key);
            value.printPools();
        } 

        // for (const [key, value] of this.idToPool.entries()) {
        //     console.log(key);
        //     console.log(value);
        // } 
    }
}

module.exports = Matchmaker;