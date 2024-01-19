const kscryp = require('kscryp');

/**
 * @typedef {({[name:String]:Object} | Array)} List 
 **/

/**
 * @typedef {Object} Subscription
 * @property {Number} [id]
 * @property {String} event
 * @property {*} [value]
 * @property {String} [data]
 * @property {String} [notifier]
 * @property {String} [group]
 * @property {Number} [owner]
 * @property {Number} [status]
 * @property {String} [processor]
 * @property {String} [expression]
 * @property {Date} [date]
 * @property {Function} [onPreTrigger] - formater action to run before process the event but after the subscriber format action
 * @property {Function} [onPosTrigger] - formater action to run after process the event action
 **/

/**
 * @typedef {Object} Event
 * @property {String|Number} [id]
 * @property {String} event
 * @property {String} description
 * @property {String} [payload]
 * @property {String} [group]
 * @property {String} [status]
 */

/**
 * @typedef { 'hook' | 'event' } EnumModelName 
 *
 * @typedef {Object} MetaHook
 * @property {String} name
 * @property {Subscription} attr
 * 
 * @typedef {Object} MetaEvent
 * @property {String} name
 * @property {Event} attr
 */
class Model {

    constructor() {
        this.cfg = {
            model: {
                hook: {
                    name: 'hooks',
                    attr: {
                        id: 'id',
                        notifier: 'notifier',
                        event: 'event',
                        value: 'value',
                        owner: 'owner',
                        group: 'group',
                        status: 'status',
                        processor: 'processor',
                        expression: 'expression'
                    }
                },
                event: {
                    name: 'events',
                    attr: {
                        id: 'id',
                        event: 'event',
                        description: 'description',
                        payload: 'payload',
                        group: 'group',
                        status: 'status'
                    }
                },
            }
        };
    }

    /**
     * @description Configure the model subscriber lib
     * @param {Object} options 
     * @param {List} [options.models] DaoModel list 
     * @param {Object} [options.driver] db connection or DaoManager instance  
     * @param {Object} [options.manager] db manager or DaoManager class
     * @param {Console} [options.logger] log handler 
     * @param {Object} [options.cfg]  
     * @param {Object} [options.cfg.model] Model metadata
     * @param {MetaHook} [options.cfg.model.hook] Hook Model metadata  
     * @param {MetaEvent} [options.cfg.model.event] Event Model metadata  
     * @returns {Model} self reference
     */
    configure(options) {
        Object.assign(this, options);
        return this;
    }

    /**
     * @description Get Model instance by name
     * @param {EnumModelName} [name=hook] 
     * @returns {Object} Model
     */
    #getModel(name = 'hook') {
        const meta = this.cfg?.model[name];
        if (!this.models || !this.models[meta?.name]) {
            return null;
        }
        return this.models[meta?.name];
    }

    /**
     * @description format query
     * @param {Subscription|Event} payload
     * @param {EnumModelName} [name=hook]
     * @returns {List} 
     */
    #getQuery(payload, name = 'hook') {
        let where = {};
        let meta = this.cfg?.model[name]?.attr || {};
        for (let i in payload) {
            if (payload[i] !== undefined && meta[i] !== undefined) {
                where[meta[i]] = payload[i];
                if (i === 'status') {
                    payload[i] === undefined && (where[meta[i]] = 1);
                    payload[i] === '-' && (delete where[meta[i]]);
                }
            }
        }
        return where;
    }

    /**
     * @description format getRow
     * @param {List} item
     * @param {EnumModelName} [name=hook]
     * @returns {Subscription|Event} row
     */
    #getRow(item, name = 'hook') {
        let row = {};
        let met = this.cfg?.model[name]?.attr || {};
        for (let i in met) {
            item[met[i]] !== undefined && (row[i] = item[met[i]]);
        }
        row.value && (row.value = kscryp.decode(row.value, 'json'));
        return row;
    }

    /**
     * @description save subscriptions
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} succeed subscriptions
     */
    async subscribe(payload) {
        try {
            const model = this.#getModel('hook');
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
                flow: payload?.flow || String(Date.now()) + '00',
                src: 'KsHook:Subscriber:Model:subscribe',
                error: error?.message || error,
                data: payload
            });
        }
    }

    /**
     * @description remove subscriptions
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} succeed unsubscriptions
     */
    async unsubscribe(payload) {
        try {
            const model = this.#getModel('hook');
            if (!model || !payload) {
                return null;
            }
            if (Array.isArray(payload)) {
                const out = [];
                for (let item of payload) {
                    out.push(this.unsubscribe(item));
                }
                return out;
            }
            let where = this.#getQuery(payload);
            return await model.destroy({ where });
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.flow || String(Date.now()) + '00',
                src: 'KsHook:Subscriber:Model:unsubscribe',
                error: error?.message || error,
                data: payload
            });
        }
    }

    /**
     * @description get the subscriptions list
     * @param {List} payload 
     * @returns {Array<Subscription>}
     */
    async subscriptions(payload) {
        try {
            const model = this.#getModel('hook');
            if (!model) {
                return [];
            }
            const where = this.#getQuery(payload, 'hook');
            const res = await model.findAll({ where });
            return (res?.map && res.map(item => this.#getRow(item))) || [];
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.flow || String(Date.now()) + '00',
                src: 'KsHook:Subscriber:Model:subscriptions',
                error: error?.message || error,
                data: payload
            });
        }
    }

    /**
     * @description get the event list
     * @param {List} payload 
     * @returns {Array<Event>}
     */
    async events(payload) {
        try {
            const model = this.#getModel('event');
            if (!model) {
                return [];
            }
            const query = {};
            const attrs = this.cfg?.model?.event?.attr || {};
            const where = this.#getQuery(payload, 'event');
            attrs?.event && (query.group = [attrs.event]);
            where && (query.where = where);
            const res = await model.findAll(query);
            return res?.map(item => this.#getRow(item, 'event'));
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.flow || String(Date.now()) + '00',
                src: 'KsHook:Subscriber:Model:events',
                error: error?.message || error,
                data: payload
            });
        }
    }
}

module.exports = Model;