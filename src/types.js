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

// SUBSCRIBER MODEL

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

// NOTIFIER WEB

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

// NOTIFIER TELEGRAM

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

// NOTIFIER EVENT

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

// NOTIFIER MS TEAMS

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
function build(cls, args = []) {
    return new cls(...args);
}

module.exports = {
    build
};