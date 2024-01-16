export = Telegram;
declare const Telegram_base: typeof import("ksdp/types/src/integration/Dip");
declare class Telegram extends Telegram_base {
    constructor(cfg: any);
    cfg: any;
    configure(cfg: any): this;
    /**
     * @description send messages to a certain contact or group
     * @param {Object} payload
     * @param {String} payload.urlSend
     * @param {String} payload.message
     * @param {String} payload.chatId
     * @returns {Object} result
     */
    send(payload: {
        urlSend: string;
        message: string;
        chatId: string;
    }): any;
    /**
     * @description get information
     * @param {Object} payload
     * @param {String} payload.urlInfo
     * @returns {Object} result
     */
    info(payload: {
        urlInfo: string;
    }): any;
    /**
     * @description get information
     * @param {Object} payload
     * @param {String} payload.urlUpdate
     * @returns {Object} result
     */
    updates(payload: {
        urlUpdate: string;
    }): any;
    setHook(callback_url: any): Promise<any>;
}
