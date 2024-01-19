const axios = require('axios');
/**
 * Represents an HTTP client request.
 * @typedef {import('http').ClientRequest} ClientRequest
 */

/**
 * Represents an XMLHttpRequest object.
 * @typedef {XMLHttpRequest} XMLHttpRequest
 */

class Web {
    constructor(cfg) {
        this.cfg = {
            url: process.env.CHANNEL_URL,
            method: "post"
        };
        this.configure(cfg);
    }

    configure(cfg) {
        cfg && Object.assign(this.cfg, cfg);
        this.drv.configure(this.cfg);
        return this;
    }

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
    run(payload) {
        const url = payload?.target?.value?.url || payload?.target?.value || this.cfg.url;
        const headers = payload?.target?.value?.headers;
        const method = payload?.target?.value?.method || this.cfg.method;
        const req = { url, method };
        if (headers) {
            req.headers = headers;
        }
        if (payload?.data) {
            if (method === "post") {
                req.data = payload?.data;
            } else {
                req.params = payload?.data;
            }
        }
        return axios(req);
    }
}

module.exports = Web;