const PlayerPool = require('./playerPool');
const GroupPool = require('./groupPool');

class Matchmaker {

    constructor() {
        this.playerPools = new Map([
            ["Male", new PlayerPool()],
            ["Female", new PlayerPool()],
            ["Other", new PlayerPool()]
        ]);

        this.groupPool = new GroupPool();

        this.idToPool = new Map();

    }

    addPlayer(id, info) {
        this.playerPools.get(info.gender).addPlayer(id, info);
        this.idToPool.set(id, {
            isPlayer: true,
            gender: info.gender, 
            group: info.group
        });
    }

    addGroup(id, info) {
        this.idToPool.set(id, {
            isPlayer: false,
            ...info
        });
    }

    isPlayer(id) {
        return this.idToPool.get(id).isPlayer;
    }

    removeUser(id) {
        if (this.isPlayer(id)) {
            const gender = this.getGenderFromID(id);
            const group = this.getGroupFromID(id);
    
            this.playerPools.get(gender).removePlayer(id, group);
        }

        this.idToPool.delete(id);
    }
    
    getGenderFromID(id) {
        return this.idToPool.get(id).gender;
    }

    getGroupFromID(id) {
        return this.idToPool.get(id).group;
    }

    getNPlayers(id, n) {
        const gender = this.getGenderFromID(id);
        const group = this.getGroupFromID(id);

        return this.playerPools.get(gender).getNPlayers(group, n);
    }

    printPlayerPools() {
        for (const [key, value] of this.playerPools.entries()) {
            console.log();
            console.log(key);
            value.printPools();
        }
    }

    printIDPool() {
        for (const [key, value] of this.idToPool.entries()) {
            console.log();
            console.log(key);
            console.log(value);
        } 
    }
}

module.exports = Matchmaker;