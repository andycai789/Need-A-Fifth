
class GroupPool {
    constructor() {
        this.pool = new Map();
    }

    addGroup(socketID) {
        this.pool.set(socketID, {something: new Set()});
    }

    addPlayerToGroupSeen(groupID, playerID) {
        this.pool.get(groupID).something.add(playerID);
        console.log(this.pool.get(groupID).something);
    }

    printPool() {
        console.log([...this.pool.entries()]);
        console.log();
    }


}


module.exports = GroupPool;
