class DaoModel {
    /**
     * @param {*} data 
     */
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
            get(target, prop, receiver) {
                if (prop === "data") {
                    return target.data;
                }
                if (target?.dataValue?.hasOwnProperty(prop)) {
                    return target?.dataValue[prop];
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }
    /**
     * @param {*} obj 
     * @param {*} where 
     * @returns 
     */
    check(obj, where) {
        if (!where) return true;
        let res = true;
        for (let i in where) {
            res = res && obj[i] === where[i];
        }
        return Boolean(res);
    }
    /**
     * @param {*} id 
     * @returns {*}
     */
    findByPk(id) {
        return Promise.resolve(this.data.filter(itm => itm?.id === id)[0]);
    }
    /**
     * @param {*} param
     * @returns {*}
     */
    findOne({ where }) {
        return Promise.resolve(this.data.filter(itm => this.check(itm, where))[0]);
    }
    /**
     * @param {*} param
     * @returns {*}
     */
    findAll({ where }) {
        return Promise.resolve(where ? this.data.filter(itm => this.check(itm, where)) : this.data);
    }
    /**
     * @param {*} options
     * @returns {*}
     */
    findAndCountAll(options) {
        return [options];
    }
    /**
     * @param {*} data
     * @returns {*}
     */
    bulkCreate(data) {
        return [data];
    }

    /**
     * @param {*} options
     * @returns {*}
     */
    count(options) {
        return options;
    }
    /**
     * @param {*} data 
     */
    update(data) {
        return data;
    }
    /**
     * @param {*} data 
     */
    create(data) {
        data.id = data.id || this.data.length;
        this.data.push(new DaoModel(data));
    }
    /**
     * @param {*} data 
     */
    destroy({ where }) {
        return where;
    }
    getTableName() { return "" }
    /**
     * @param {*} options 
     */
    save(options) {
        return options;
    }
    toJSON() { this.dataValue }
}

module.exports = DaoModel;