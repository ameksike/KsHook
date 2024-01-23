const axios = require('axios');

/**
 * @typedef {import('../types').TClientRequest} TClientRequest
 * @typedef {import('../types').TReqWeb} TReqWeb
 * @typedef {import('../types').TResWeb} TResWeb 
 * @typedef {import('../types').TDtaWeb} TDtaWeb 
 */

class Web {

    constructor(cfg = null) {
        this.cfg = {
            url: process.env.CHANNEL_URL,
            method: "post"
        };
        this.configure(cfg);
    }

    /**
     * @description configure the web notificator 
     * @param {*} cfg 
     * @returns {Web} self 
     */
    configure(cfg = null) {
        cfg && Object.assign(this.cfg, cfg || {});
        return this;
    }

    /**
     * @description Execute HTTP notifications for Web Hooks
     * @param {Object} payload 
     * @param {Object} [payload.target]
     * @param {TReqWeb|String} [payload.target.value] 
     * @param {TDtaWeb} [payload.data]
     * @returns {Promise <TResWeb>} result
     */
    run(payload) {
        let method, headers, url;
        if (typeof (payload?.target?.value) === "object") {
            headers = payload.target.value?.headers || null;
            method = payload.target.value?.method || this.cfg.method;
            url = payload.target.value?.url || this.cfg.url;
        } else {
            url = payload?.target?.value || this.cfg.url;
        }
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