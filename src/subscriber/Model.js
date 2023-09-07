const kscryp = require('kscryp');
class Model {

    constructor() {
        this.cfg = {
            attr: {
                id: 'id',
                notifier: 'notifier',
                event: 'event',
                value: 'value',
                owner: 'owner',
                group: 'group',
                status: 'status'
            },
            model: {
                hook: 'hooks',
                event: 'events',
            }
        };
    }

    configure(cfg) {
        Object.assign(this, cfg);
        return this;
    }

    #getModel() {
        if (!this.models || !this.models[this.cfg?.model?.hook]) {
            return null;
        }
        return this.models[this.cfg?.model?.hook];
    }

    /**
     * @description format query
     * @param {Object|Array} item
     * @param {Number} item.id 
     * @param {Number} item.owner
     * @param {Number} item.group 
     * @param {Number} item.status
     * @param {String} item.event 
     * @param {String} item.notifier 
     * @returns {Object|Array} { group: String, owner: String, event: String, value: String|Object, notifier: String }
     */
    #getQuery(payload) {
        let where = {};
        payload.status === undefined && (payload.status = 1);
        payload.status === "-" && (delete payload["status"]);
        payload?.id && (where[this.cfg?.attr?.id] = payload.id);
        payload?.event && (where[this.cfg?.attr?.event] = payload.event);
        payload?.owner && (where[this.cfg?.attr?.owner] = payload.owner);
        payload?.group && (where[this.cfg?.attr?.group] = payload.group);
        payload?.status && (where[this.cfg?.attr?.status] = payload.status);
        payload?.notifier && (where[this.cfg?.attr?.notifier] = payload.notifier);
        return where;
    }

    /**
     * @description format getRow
     * @param {Object|Array} item
     * @param {Number} item.id 
     * @param {Number} item.owner
     * @param {Number} item.group 
     * @param {Number} item.status
     * @param {String} item.event 
     * @returns {Object|Array} { group: String, owner: String, event: String, value: String|Object, notifier: String }
     */
    #getRow(item) {
        let row = {};
        item?.id && (row.id = item[this.cfg?.attr?.id]);
        item?.event && (row.event = item[this.cfg?.attr?.event]);
        item?.owner && (row.owner = item[this.cfg?.attr?.owner]);
        item?.group && (row.group = item[this.cfg?.attr?.group]);
        item?.value && (row.value = item[this.cfg?.attr?.value]);
        item?.notifier && (row.notifier = item[this.cfg?.attr?.notifier]);
        item?.status && (row.status = item[this.cfg?.attr?.status]);
        row.value && (row.value = kscryp.decode(row.value, "json"));
        return row;
    }

    format(payload) {
        return payload;
    }

    /**
     * @description save subscriptions
     * @param {Object|Array} payload
     * @param {Number} payload.id 
     * @param {Number} payload.owner
     * @param {Number} payload.group 
     * @param {Number} payload.status
     * @param {String} payload.event 
     * @returns {Object|Array} { group: String, owner: String, event: String, value: String|Object, notifier: String }
     */
    async subscribe(payload) {
        try {
            const model = this.#getModel();
            if (!model || !payload) {
                return null;
            }
            if (Array.isArray(payload)) {
                let data = payload.map(item => this.#getRow(item));
                return model.bulkCreate(data);
            } else {
                let data = this.#getRow(payload);
                let where = this.#getQuery(payload);
                let row = await model.findOne({ where });
                return await (row ? row.update(data) : model.create(data));
            }
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.flow || String(Date.now()) + "00",
                src: "KsHook:Subscriber:Model:subscribe",
                error: error?.message || error,
                data: payload
            });
        }
    }

    /**
     * @description remove subscriptions
     * @param {Object|Array} payload
     * @param {Number} payload.id 
     * @param {Number} payload.owner
     * @param {Number} payload.group 
     * @param {Number} payload.status
     * @param {String} payload.event 
     * @returns {Object|Array} { group: String, owner: String, event: String, value: String|Object, notifier: String }
     */
    async unsubscribe(payload) {
        try {
            const model = this.#getModel();
            if (!model || !payload) {
                return null;
            }
            if (Array.isArray(payload)) {
                const out = [];
                for (let item of payload) {
                    out.push(this.subscribe(payload));
                }
                return out;
            }
            let where = this.#getQuery(payload);
            return await model.destroy({ where });
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.flow || String(Date.now()) + "00",
                src: "KsHook:Subscriber:Model:unsubscribe",
                error: error?.message || error,
                data: payload
            });
        }
    }

    /**
     * @description get the subscriptions list
     * @param {Object} payload
     * @param {Number} payload.id 
     * @param {Number} payload.owner
     * @param {Number} payload.group 
     * @param {Number} payload.status
     * @param {String} payload.event 
     * @returns {Array} [{ group: String, owner: String, event: String, value: String|Object, notifier: String }]  
     */
    async subscriptions(payload) {
        try {
            const model = this.#getModel();
            if (!model) {
                return [];
            }
            const where = this.#getQuery(payload);
            const res = await model.findAll({ where });
            return (res?.map && res.map(item => this.#getRow(item))) || [];
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.flow || String(Date.now()) + "00",
                src: "KsHook:Subscriber:Model:subscriptions",
                error: error?.message || error,
                data: payload
            });
        }
    }

    /**
     * @description get the event list
     * @param {Object} payload 
     * @returns {Arrar} [{ name: String, description: String }]
     */
    async events(payload) {
        try {
            const model = this.#getModel();
            if (!model) {
                return [];
            }
            const query = {
                group: [this.cfg?.attr?.event],
                attributes: [this.cfg?.attr?.event]
            };
            const res = await model.findAll(query);
            return res?.map(item => {
                return {
                    name: item[this.cfg?.attr?.event],
                    description: ""
                }
            });
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.flow || String(Date.now()) + "00",
                src: "KsHook:Subscriber:Model:events",
                error: error?.message || error,
                data: payload
            });
        }
    }
}

module.exports = Model;