class DaoModel {
    constructor(data) {
        this.dataValue = null;
        if (!data) {
            this.data = [];
        }
        else if (Array.isArray(data)) {
            this.data = data;
        } else {
            this.data = [data];
            this.dataValue = data;
        }
        return new Proxy(this, {
            get(target, prop) {
                if (prop === "data") {
                    return target.data;
                }
                if (target?.dataValue?.hasOwnProperty(prop)) {
                    return target?.dataValue[prop];
                }
                return Reflect.get(...arguments);
            }
        });
    }
    check(obj, where) {
        if (!where) return true;
        let res = true;
        for (let i in where) {
            res = res && obj[i] === where[i];
        }
        return Boolean(res);
    }
    findByPk(id) {
        return Promise.resolve(this.data.filter(itm => itm?.id === id)[0]);
    }
    findOne({ where }) {
        return Promise.resolve(this.data.filter(itm => this.check(itm, where))[0]);
    }
    findAll({ where }) {
        return Promise.resolve(where ? this.data.filter(itm => this.check(itm, where)) : this.data);
    }
    findAndCountAll(options) { }
    bulkCreate(data) { }
    count(options) { }
    update(data) { }
    create(data) { 
        data.id = data.id || this.data.length;
        this.data.push(new DaoModel(data));
    }
    destroy({ where }) { }
    getTableName() { return "" }
    save(options) { }
    toJSON() { this.dataValue }
}

module.exports = DaoModel;