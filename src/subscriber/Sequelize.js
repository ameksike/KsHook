class Db {

    subscribe(payload) {
        this.list[payload.owner] = this.list[payload.owner] || [];
        this.list[payload.owner].push(payload);
    }

    subscriptions(payload) {
        return this.list[payload.owner];
    }
}

module.exports = Db;