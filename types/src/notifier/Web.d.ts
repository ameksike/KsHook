export = Web;
/**
 * Represents an HTTP client request.
 * @typedef {import('http').ClientRequest} ClientRequest
 */
/**
 * Represents an XMLHttpRequest object.
 * @typedef {XMLHttpRequest} XMLHttpRequest
 */
declare class Web {
    constructor(cfg: any);
    cfg: {
        url: string;
        method: string;
    };
    configure(cfg: any): this;
    /**
     * @description Execute HTTP notifications for Web Hooks
     * @param {Object} payload
     * @param {Object} payload.target
     * @param {Object|String} payload.target.value
     * @param {Object|String} payload.target.value.url
     * @param {Object|String} payload.target.value.method
     * @param {Object|String} payload.target.value.headers
     * @returns {Promise <{data: Object, status: Number, headers: Object, request: ClientRequest|XMLHttpRequest, config: Object }>}
     */
    run(payload: {
        target: {
            value: any | string;
        };
    }): Promise<{
        data: any;
        status: number;
        headers: any;
        request: ClientRequest | XMLHttpRequest;
        config: any;
    }>;
}
declare namespace Web {
    export { ClientRequest, XMLHttpRequest };
}
/**
 * Represents an HTTP client request.
 */
type ClientRequest = import('http').ClientRequest;
/**
 * Represents an XMLHttpRequest object.
 */
type XMLHttpRequest = XMLHttpRequest;
