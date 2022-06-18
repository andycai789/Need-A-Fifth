class PlayerPool {
    constructor() {
        this.searchPools = new Map([
            ["All Male", new Map()],
            ["All Female", new Map([["sarah", "someinfo"], ["eliz", "someinfosdofa"]])],
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

    getNPlayers(group, n) {
        const pool = this.searchPools.get(group);
        let players = [];
        let count = 0;

        for (const [key, value] of pool) {
            if (count === n) {
                break 
            }

            players.push({id: key, info: value});
            count++;
        }


        console.log(players);
    }





}

module.exports = PlayerPool;


