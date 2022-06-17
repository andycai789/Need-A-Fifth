class PlayerPool {
    constructor(poolType) {
        this.poolType = poolType;
        this.pool = new Map();
    }

    getPoolType() {
        return this.poolType;
    }

    addPlayer(socketID,  playerInfo) {
        this.pool.set(socketID, playerInfo);
    }

    printPool() {
        console.log(`Pool type: ${this.poolType}`);
        console.log([...this.pool.entries()]);
        console.log();
    }


}

module.exports = PlayerPool;


