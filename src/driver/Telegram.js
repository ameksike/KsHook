const axios = require('axios');
const ksdp = require('ksdp');

class Telegram extends ksdp.integration.Dip {

    constructor(cfg) {
        super();
        this.cfg = require('../../cfg/config.telegram.json');
        this.configure(cfg);
    }

    configure(cfg) {
        cfg && Object.assign(this.cfg, cfg);
        return this;
    }

    /**
     * @description send messages to a certain contact or group
     * @param {Object} payload 
     * @param {String} payload.urlSend 
     * @param {String} payload.message 
     * @param {String} payload.chatId 
     * @returns {Object} result
     */
    async send(payload) {
        try {
            const { message, chatId, urlSend = this.cfg.url_send } = payload;
            const url = urlSend.replace("{{BOT_TOKEN}}", this.cfg?.tokenBot || "");
            const bdy = {
                chat_id: chatId,
                text: message
            };
            this.logger?.info({
                src: "KsHook:Driver:Telegram:send",
                data: bdy
            });
            const res = await axios.post(url, bdy);
            return res.data;
        }
        catch (error) {
            this.logger?.error({
                src: "KsHook:Driver:Telegram:send",
                error: error?.response?.data?.description || error?.message,
                data: payload
            });
        }
    }

    /**
     * @description get information
     * @param {Object} payload 
     * @param {String} payload.urlInfo 
     * @returns {Object} result
     */
    async info(payload) {
        try {
            const { urlInfo = this.cfg.url_info } = payload || {};
            const url = urlInfo.replace("{{BOT_TOKEN}}", this.cfg?.tokenBot || "");
            this.logger?.info({
                src: "KsHook:Driver:Telegram:info",
                data: { url }
            });
            const res = await axios.get(url);
            return res.data;
        }
        catch (error) {
            this.logger?.error({
                src: "KsHook:Driver:Telegram:info",
                error: error?.response?.data?.description || error?.message,
                data: payload
            });
        }
    }

    /**
     * @description get information
     * @param {Object} payload 
     * @param {String} payload.urlUpdate 
     * @returns {Object} result
     */
    async updates(payload) {
        try {
            const { urlUpdate = this.cfg.url_update } = payload || {};
            const url = urlUpdate.replace("{{BOT_TOKEN}}", this.cfg?.tokenBot || "");
            this.logger?.info({
                src: "KsHook:Driver:Telegram:updates",
                data: { url }
            });
            const res = await axios.get(url);
            return res.data;
        }
        catch (error) {
            this.logger?.error({
                src: "KsHook:Driver:Telegram:updates",
                error: error?.response?.data?.description || error?.message,
                data: payload
            });
        }
    }

    async setHook(callback_url) {
        try {
            callback_url = callback_url || this.cfg?.redirect_uris;
            const url = cfg.url_hook.replace("{{BOT_TOKEN}}", cfg.token_bot);
            const bdy = {
                params: {
                    url: callback_url,
                    drop_pending_updates: true
                }
            };
            this.logger?.info({
                src: "KsHook:Driver:Telegram:setHook",
                data: { url }
            });
            const res = await axios.get(url, bdy);
            return res.data;
        }
        catch (error) {
            this.logger?.error({
                src: "KsHook:Driver:Telegram:setHook",
                error: error?.response?.data?.description || error?.message,
                data: payload
            });
            console.log("TELEGRAM:hook ", error?.response?.data?.description || error?.message);
        }
    }
}

module.exports = Telegram;