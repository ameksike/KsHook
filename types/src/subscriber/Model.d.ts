export = Model;
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
declare class Model {
    cfg: {
        model: {
            hook: {
                name: string;
                attr: {
                    id: string;
                    notifier: string;
                    event: string;
                    value: string;
                    owner: string;
                    group: string;
                    status: string;
                    processor: string;
                    expression: string;
                };
            };
            event: {
                name: string;
                attr: {
                    id: string;
                    event: string;
                    description: string;
                    payload: string;
                    group: string;
                    status: string;
                };
            };
        };
    };
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
    configure(options: {
        models?: List;
        driver?: any;
        manager?: any;
        logger?: Console;
        cfg?: {
            model?: {
                hook?: MetaHook;
                event?: MetaEvent;
            };
        };
    }): Model;
    /**
     * @description save subscriptions
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} succeed subscriptions
     */
    subscribe(payload: Subscription | Array<Subscription>): Subscription | Array<Subscription>;
    /**
     * @description remove subscriptions
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} succeed unsubscriptions
     */
    unsubscribe(payload: Subscription | Array<Subscription>): Subscription | Array<Subscription>;
    /**
     * @description get the subscriptions list
     * @param {List} payload
     * @returns {Array<Subscription>}
     */
    subscriptions(payload: List): Array<Subscription>;
    /**
     * @description get the event list
     * @param {List} payload
     * @returns {Array<Event>}
     */
    events(payload: List): Array<Event>;
    #private;
}
declare namespace Model {
    export { List, Subscription, Event, EnumModelName, MetaHook, MetaEvent };
}
type List = any[] | {
    [name: string]: any;
};
type Subscription = {
    id?: number;
    event: string;
    value?: any;
    data?: string;
    notifier?: string;
    group?: string;
    owner?: number;
    status?: number;
    processor?: string;
    expression?: string;
    date?: Date;
    /**
     * - formater action to run before process the event but after the subscriber format action
     */
    onPreTrigger?: Function;
    /**
     * - formater action to run after process the event action
     */
    onPosTrigger?: Function;
};
type Event = {
    id?: string | number;
    event: string;
    description: string;
    payload?: string;
    group?: string;
    status?: string;
};
type EnumModelName = 'hook' | 'event';
type MetaHook = {
    name: string;
    attr: Subscription;
};
type MetaEvent = {
    name: string;
    attr: Event;
};
