class PlayerPool {
    constructor() {
        this.searchPools = new Map([
            ["All Male", new Map()],
            ["All Female", new Map()],
            ["Mixed", new Map()]
        ]);
    }

    addPlayer(id, info) {
        this.searchPools.get(info.group).set(id, info);
    }

    removePlayer(id, group) {
        this.searchPools.get(group).delete(id);
    }

    printPools() {
        for (const [key, value] of this.searchPools.entries()) {
            console.log(key);
            console.log([...value.entries()]);
        }     
    }


}

module.exports = PlayerPool;


