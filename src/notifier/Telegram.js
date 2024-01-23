const TelegramDriver = require('../driver/Telegram');

/**
 * @typedef {import('../types').TClientRequest} TClientRequest
 * @typedef {import('../types').TReqTelegram} TReqTelegram
 * @typedef {import('../types').TResTelegram} TResTelegram 
 * @typedef {import('../types').TDtaTelegram} TDtaTelegram 
 */

class Telegram {

    constructor(cfg = null) {
        this.cfg = {};
        this.drv = new TelegramDriver();
        this.configure(cfg);
    }

    /**
     * @description configure the web notificator 
     * @param {*} cfg 
     * @returns {Telegram} self 
     */
    configure(cfg = null) {
        cfg && Object.assign(this.cfg, cfg);
        this.drv.configure(this.cfg);
        return this;
    }

    /**
     * @description Send Telegram messages
     * @param {Object} payload 
     * @param {Object} [payload.target]
     * @param {TReqTelegram|String} payload.target.value 
     * @param {TDtaTelegram} [payload.data]
     * @returns {Promise <TResTelegram>} 
     */
    run(payload) {
        let chatId;
        let message = payload?.data?.message;
        if (typeof payload?.target?.value === "object") {
            chatId = payload?.target?.value?.recipient || payload?.target?.value?.chatId;
        } else {
            chatId = payload?.target?.value;
        }
        return this.drv.send({ message, chatId });
    }
}

module.exports = Telegram;