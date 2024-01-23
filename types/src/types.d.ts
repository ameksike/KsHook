export type TList<T = any> = {
    [name: string]: T;
};
export type TCls<T> = new (...args: any[]) => T;
export type TSubscription = {
    flow?: string | number;
    data?: any;
    value?: any;
    event: string;
    param?: string;
    notifier?: string;
    subscriber?: string | string[];
    expression?: string;
    processor?: string;
    group?: string;
    owner?: number;
    status?: number;
    id?: number | string;
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
export type TEvent = {
    flow?: string | number;
    id?: string | number;
    event: string;
    description?: string;
    payload?: string;
    group?: string;
    status?: string;
};
export type TEmission = {
    flow?: string | number;
    subscriber?: string;
    event?: string;
    data?: any;
    date?: number | Date;
    target?: TSubscription;
};
export type TMetaHook = {
    name: string;
    attr: TSubscription;
};
export type TMetaEvent = {
    name: string;
    attr: TEvent;
};
export type THook = import("ksdp/types/src/integration/hook");
export type IHook = typeof import('ksdp').integration.hook.Main;
/**
 * Represents an HTTP client request.
 */
export type TClientRequest = import('http').ClientRequest;
export type TReqWeb = {
    url?: string;
    method?: string;
    headers?: string;
};
export type TResWeb = {
    data?: any;
    status?: number;
    headers?: any;
    request?: TClientRequest | XMLHttpRequest;
    config?: any;
};
export type TDtaWeb = any;
export type TReqTelegram = {
    recipient?: string;
    chatId?: string;
};
export type TResTelegram = any;
export type TDtaTelegram = {
    message?: string;
};
export type TReqEvent = {
    event?: string;
    subscriber?: string;
    data?: any;
};
export type TResEvent = any;
export type TDtaEvent = any;
export type TReqMsTeams = {
    url?: string;
};
export type TResMsTeams = boolean;
export type TDtaMsTeams = {
    title?: string;
    subtitle?: string;
    message?: string;
    format?: string;
    facts?: any;
};
/**
 * @template [T=object]
 * @typedef {{[name:String]:T}} TList
 **/
/**
 * @template T
 * @typedef {new (...args: any[]) => T} TCls
 */
/**
 * @typedef {Object} TSubscription
 * @property {String|Number} [flow]
 * @property {*} [data]
 * @property {*} [value]
 * @property {String} event
 * @property {String} [param]
 * @property {String} [notifier]
 * @property {String|String[]} [subscriber]
 * @property {String} [expression]
 * @property {String} [processor]
 * @property {String} [group]
 * @property {Number} [owner]
 * @property {Number} [status]
 * @property {Number|String} [id]
 * @property {Date} [date]
 * @property {Function} [onPreTrigger] - formater action to run before process the event but after the subscriber format action
 * @property {Function} [onPosTrigger] - formater action to run after process the event action
 **/
/**
 * @typedef {Object} TEvent
 * @property {String|Number} [flow]
 * @property {String|Number} [id]
 * @property {String} event
 * @property {String} [description]
 * @property {String} [payload]
 * @property {String} [group]
 * @property {String} [status]
 */
/**
 * @typedef {Object} TEmission
 * @property {String|Number} [flow]
 * @property {String} [subscriber]
 * @property {String} [event]
 * @property {Object} [data]
 * @property {Number|Date} [date]
 * @property {TSubscription} [target]
 */
/**
 * @typedef {Object} TMetaHook
 * @property {String} name
 * @property {TSubscription} attr
 */
/**
 * @typedef {Object} TMetaEvent
 * @property {String} name
 * @property {TEvent} attr
 */
/**
 * @typedef {import('ksdp').integration.hook.Main} THook
 */
/**
 * @typedef {typeof import('ksdp').integration.hook.Main} IHook
 */
/**
 * Represents an HTTP client request.
 * @typedef {import('http').ClientRequest} TClientRequest
 */
/**
 * @typedef {Object} TReqWeb
 * @property {String} [url]
 * @property {String} [method]
 * @property {String} [headers]
 */
/**
 * @typedef {Object} TResWeb
 * @property {Object} [data]
 * @property {Number} [status]
 * @property {Object} [headers]
 * @property {TClientRequest|XMLHttpRequest} [request]
 * @property {Object} [config]
 */
/**
 * @typedef {Object} TDtaWeb
 */
/**
 * @typedef {Object} TReqTelegram
 * @property {String} [recipient]
 * @property {String} [chatId]
 */
/**
 * @typedef {Object} TResTelegram
 */
/**
 * @typedef {Object} TDtaTelegram
 * @property {String} [message]
 */
/**
 * @typedef {Object} TReqEvent
 * @property {String} [event]
 * @property {String} [subscriber]
 * @property {Object} [data]
 */
/**
 * @typedef {Object} TResEvent
 */
/**
 * @typedef {Object} TDtaEvent
 */
/**
 * @typedef {Object} TReqMsTeams
 * @property {String} [url]
 */
/**
 * @typedef {Boolean} TResMsTeams
 */
/**
 * @typedef {Object} TDtaMsTeams
 * @property {String} [title]
 * @property {String} [subtitle]
 * @property {String} [message]
 * @property {String} [format]
 * @property {Object} [facts]
 */
/**
 * @description Dynamically create an instance of a class with variable parameters.
 * @template T
 * @param {TCls<T>} cls - The class constructor.
 * @param {any[]} [args] - An array of arguments to be passed to the class constructor.
 * @returns {T} - An instance of the class.
 */
export function build<T>(cls: TCls<T>, args?: any[]): T;
