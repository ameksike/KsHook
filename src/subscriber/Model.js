const kscryp = require('kscryp');

/**
 * @typedef {import('../types').TList} TList 
 * @typedef {import('../types').THook} THook 
 * @typedef {import('../types').TEvent} TEvent 
 * @typedef {import('../types').TEmission} TEmission 
 * @typedef {import('../types').TMetaHook} TMetaHook 
 * @typedef {import('../types').TMetaEvent} TMetaEvent 
 * @typedef {import('../types').TSubscription} TSubscription 
 */

/**
 * @typedef { 'hook' | 'event' } EnumModelName 
 */
class Model {
    /**
     * @type {THook}
     */
    hook;

    /**
     * @type {Console}
     */
    logger;

    /**
     * @type {TList}
     */
    models;

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
                        param: 'param',
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
     * @param {TList} [options.models] DaoModel list 
     * @param {Object} [options.driver] db connection or DaoManager instance  
     * @param {Object} [options.manager] db manager or DaoManager class
     * @param {Console} [options.logger] log handler 
     * @param {Object} [options.cfg]  
     * @param {Object} [options.cfg.model] Model metadata
     * @param {TMetaHook} [options.cfg.model.hook] Hook Model metadata  
     * @param {TMetaEvent} [options.cfg.model.event] Event Model metadata  
     * @returns {Model} self reference
     */
    configure(options) {
        Object.assign(this, options);
        return this;
    }

    /**
     * @description Get Model instance by name
     * @param {EnumModelName} [name=hook] 
     * @returns {*} Model
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
     * @param {TSubscription|TEvent|TList} payload
     * @param {EnumModelName} [name=hook]
     * @returns {TList} 
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
     * @param {TList} item
     * @param {EnumModelName} [name=hook]
     * @returns {TSubscription|Event} row
     */
    #getRow(item, name = 'hook') {
        let row = { event: null };
        let met = this.cfg?.model[name]?.attr || {};
        for (let i in met) {
            item[met[i]] !== undefined && (row[i] = item[met[i]]);
        }
        row.value && (row.value = kscryp.decode(row.value, 'json'));
        return row;
    }

    /**
     * @description save subscriptions
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Promise<TSubscription[]>} succeed subscriptions
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
                return [await (row ? row.update(data) : model.create(data))];
            }
        }
        catch (error) {
            this.logger?.error({
                flow: (Array.isArray(payload) ? payload[0]?.flow : payload?.flow) || String(Date.now()) + '00',
                src: 'KsHook:Subscriber:Model:subscribe',
                error: error?.message || error,
                data: payload
            });
        }
    }

    /**
     * @description remove subscriptions
     * @param {TSubscription} payload
     * @returns {Promise<TSubscription>} succeed unsubscriptions
     */
    async remove(payload) {
        try {
            const model = this.#getModel('hook');
            if (!model || !payload) {
                return null;
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
     * @description remove subscriptions
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Promise<TSubscription[]>} succeed unsubscriptions
     */
    async unsubscribe(payload) {
        if (Array.isArray(payload)) {
            const out = [];
            for (let item of payload) {
                out.push(this.remove(item));
            }
            return Promise.all(out);
        } else {
            return [await this.remove(payload)];
        }
    }

    /**
     * @description get the subscriptions list
     * @param {TList} payload 
     * @returns {Promise<TSubscription[]>}
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
     * @param {TList} payload 
     * @returns {Promise<Event[]>}
     */
    async events(payload) {
        try {
            const model = this.#getModel('event');
            if (!model) {
                return [];
            }
            const query = {};
            const attrs = this.cfg?.model?.event?.attr || { event: null };
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

    /**
     * @description preformat subscriptions payload before precess the event
     * @param {TEmission} payload 
     * @returns {TEmission} formated payload
     */
    format(payload) {
        if (payload?.target?.param) {
            let processor = this.hook?.processor?.get('Native');
            let info = {};
            let data = processor?.run(payload.target.param, payload.data, info);
            data && (payload.data = data);
        }
        return payload;
    }
}

module.exports = Model;