export = Telegram;
declare class Telegram {
    constructor(cfg: any);
    cfg: {};
    drv: TelegramDriver;
    configure(cfg: any): this;
    /**
     * @description Send Telegram messages
     * @param {Object} payload
     * @param {Object} payload.target
     * @param {Object|String} payload.target.value
     * @param {String} payload.target.value.recipient
     * @param {String} payload.target.value.chatId
     * @param {Object} [payload.data]
     * @param {String} payload.data.message
     * @returns {Promise <Object>}
     */
    run(payload: {
        target: {
            value: any | string;
        };
    }): Promise<any>;
}
import TelegramDriver = require("../driver/Telegram");
