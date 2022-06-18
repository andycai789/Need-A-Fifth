class PlayerPool {
    constructor() {
        this.searchPools = new Map([
            ["All Male", new Map()],
            ["All Female", new Map([["lizz", "someinfo"],["jess", "someotherinfo"]])],
            ["Mixed", new Map()]
        ]);
    }

    printPools() {
        for (const [key, value] of this.searchPools.entries()) {
            console.log(key);
            console.log([...value.entries()]);
        }     
    }

    addPlayer(id, info) {
        this.searchPools.get(info.group).set(id, info);
    }

    removePlayer(id, group) {
        this.searchPools.get(group).delete(id);
    }

    getNPlayers(group, seenPlayers, n) {
        const pool = this.searchPools.get(group);
        let players = [];
        let count = 0;

        for (const [key, value] of pool) {
            if (count === n) {
                break;
            }

            if (seenPlayers.has(key)) {
                continue;
            }

            players.push({id: key, info: value});
            count++;
        }

        return players;
    }





}

module.exports = PlayerPool;


