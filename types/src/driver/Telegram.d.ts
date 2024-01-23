export = Telegram;
declare const Telegram_base: typeof import("ksdp/types/src/integration/Dip");
declare class Telegram extends Telegram_base {
    constructor(cfg?: {});
    /**
     * @type {Console|null}
     */
    logger: Console | null;
    cfg: {
        uri: string;
        docs: string;
        token_bot: string;
        url_user: string;
        url_info: string;
        url_update: string;
        url_send: string;
        url_hook: string;
        redirect_uris: string;
    };
    configure(cfg?: {}): this;
    /**
     * @description send messages to a certain contact or group
     * @param {Object} payload
     * @param {String} [payload.urlSend]
     * @param {String} [payload.message]
     * @param {String} [payload.chatId]
     * @returns {Promise<any>} result
     */
    send(payload: {
        urlSend?: string;
        message?: string;
        chatId?: string;
    }): Promise<any>;
    /**
     * @description get information
     * @param {Object} payload
     * @param {String} [payload.urlInfo]
     * @returns {Promise<any>} result
     */
    info(payload: {
        urlInfo?: string;
    }): Promise<any>;
    /**
     * @description get information
     * @param {Object} payload
     * @param {String} [payload.urlUpdate]
     * @returns {Promise<*>} result
     */
    updates(payload: {
        urlUpdate?: string;
    }): Promise<any>;
    /**
     * @description set Hook actions
     * @param {String} callback_url
     * @returns {Promise<any>} result
     */
    setHook(callback_url: string): Promise<any>;
}
