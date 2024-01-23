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
 * @property {TClientRequest} [request]
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

// WEB REQUEST

/**
 * @typedef {'Bearer' | 'Basic'} TTokenType
 * @typedef {'application/json' | 'application/xml' | 'text/html' | 'text/javascript'| 'application/gzip' | 'multipart/form-data' | 'application/x-www-form-urlencoded' } TContType
 * @typedef {'arraybuffer' | 'document' | 'json' | 'text' | 'stream' | 'blob' } TResType
 * @typedef {'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'trace' | 'connect' } THttpAction
 **/

/**
 * @callback TTransformRequest
 * @param {*} data
 * @param {TList} [headers]
 * @returns {*} data
 * 
 * @callback TTransformResponse
 * @param {*} data
 * @returns {*} data
 * 
 * @callback TParamsSerializer
 * @param {TList} params
 * @returns {String} data
 * 
 * @callback TConfigure
 * @param {TList} config
 * @returns {Promise} result
 * 
 * @callback TValidateStatus
 * @param {Number} status
 * @returns {Boolean} result
 */

/**
 * @typedef {Object} TReqConfig
 * @property {String} [url] - the server URL that will be used for the request
 * @property {String} [baseURL] - will be prepended to `url` unless `url` is absolute.
 * @property {THttpAction} [method=get] - the request method to be used when making the request It can be convenient to set `baseURL` for an instance of axios to pass relative URLs to methods of that instance.
 * @property {TTokenType} [token=Bearer]
 * @property {TContType|String} [contentType=application/json]
 * @property {Array<TTransformRequest>} [transformRequest] - allows changes to the request data before it is sent to the server. This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE' 
 * @property {Array<TTransformResponse>} [transformResponse] - allows changes to the response data to be made before
 * @property {TParamsSerializer} [paramsSerializer] -  is an optional function in charge of serializing `params`
 * @property {TList<String>} [headers] - are custom headers to be sent
 * @property {TList|String} [params] - are the URL parameters to be sent with the request. Must be a plain object or a URLSearchParams object
 * @property {TList|String|ArrayBuffer|ArrayBufferView} [data] - is the data to be sent as the request body. Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
 * @property {Number} [timeout=0] -  specifies the number of milliseconds before the request times out.
 * @property {Boolean} [withCredentials=false] - indicates whether or not cross-site Access-Control requests
 * @property {TConfigure} [adapter] - allows custom handling of requests which makes testing easier.
 * @property {Object} [auth] - indicates that HTTP Basic auth should be used, and supplies credentials.
 * @property {String} [auth.username]
 * @property {String} [auth.password]
 * @property {TResType} [responseType=json] - indicates the type of data that the server will respond with
 * @property {String} [responseEncoding=utf8] - indicates encoding to use for decoding responses (Node.js only)
 * @property {String} [xsrfCookieName=XSRF-TOKEN] - is the name of the cookie to use as a value for xsrf token
 * @property {String} [xsrfHeaderName=X-XSRF-TOKEN] - is the name of the http header that carries the xsrf token value
 * @property {Number} [maxContentLength] - defines the max size of the http response content in bytes allowed in node.js
 * @property {Number} [maxBodyLength] - (Node only option) defines the max size of the http request content in bytes allowed
 * @property {Number} [maxRedirects=5] -  defines the maximum number of redirects to follow in node.js.
 * @property {String} [socketPath=null] - defines a UNIX Socket to be used in node.js.
 * @property {TValidateStatus} [validateStatus] - defines whether to resolve or reject the promise for a given
 * @property {Object} [proxy] - defines the hostname, port, and protocol of the proxy server.
 * @property {String} [proxy.protocol] - Ex: https
 * @property {String} [proxy.host] - Ex: 127.0.0.1  
 * @property {Number} [proxy.port] - Ex: 9000  
 * @property {Object} [proxy.auth] - indicates that HTTP Basic auth should be through the proxy.
 * @property {String} [proxy.auth.username]
 * @property {String} [proxy.auth.password]
 * @property {Boolean} [decompress=true] - indicates whether or not the response body should be decompressed 
 */

// BUILDER

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