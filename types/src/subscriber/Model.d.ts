export = Model;
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
declare class Model {
    /**
     * @type {THook}
     */
    hook: THook;
    /**
     * @type {Console}
     */
    logger: Console;
    /**
     * @type {TList}
     */
    models: TList;
    cfg: {
        model: {
            hook: {
                name: string;
                attr: {
                    id: string;
                    notifier: string;
                    event: string;
                    value: string;
                    param: string;
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
    configure(options: {
        models?: TList;
        driver?: any;
        manager?: any;
        logger?: Console;
        cfg?: {
            model?: {
                hook?: TMetaHook;
                event?: TMetaEvent;
            };
        };
    }): Model;
    /**
     * @description save subscriptions
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Promise<TSubscription[]>} succeed subscriptions
     */
    subscribe(payload: TSubscription | Array<TSubscription>): Promise<TSubscription[]>;
    /**
     * @description remove subscriptions
     * @param {TSubscription} payload
     * @returns {Promise<TSubscription>} succeed unsubscriptions
     */
    remove(payload: TSubscription): Promise<TSubscription>;
    /**
     * @description remove subscriptions
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Promise<TSubscription[]>} succeed unsubscriptions
     */
    unsubscribe(payload: TSubscription | Array<TSubscription>): Promise<TSubscription[]>;
    /**
     * @description get the subscriptions list
     * @param {TList} payload
     * @returns {Promise<TSubscription[]>}
     */
    subscriptions(payload: TList): Promise<TSubscription[]>;
    /**
     * @description get the event list
     * @param {TList} payload
     * @returns {Promise<Event[]>}
     */
    events(payload: TList): Promise<Event[]>;
    /**
     * @description preformat subscriptions payload before precess the event
     * @param {TEmission} payload
     * @returns {TEmission} formated payload
     */
    format(payload: TEmission): TEmission;
    #private;
}
declare namespace Model {
    export { TList, THook, TEvent, TEmission, TMetaHook, TMetaEvent, TSubscription, EnumModelName };
}
type THook = import('../types').THook;
type TList = import('../types').TList;
type TEvent = import('../types').TEvent;
type TEmission = import('../types').TEmission;
type TMetaHook = import('../types').TMetaHook;
type TMetaEvent = import('../types').TMetaEvent;
type TSubscription = import('../types').TSubscription;
type EnumModelName = 'hook' | 'event';
