export = Telegram;
/**
 * @typedef {import('../types').TClientRequest} TClientRequest
 * @typedef {import('../types').TReqTelegram} TReqTelegram
 * @typedef {import('../types').TResTelegram} TResTelegram
 * @typedef {import('../types').TDtaTelegram} TDtaTelegram
 */
declare class Telegram {
    constructor(cfg?: any);
    cfg: {};
    drv: TelegramDriver;
    /**
     * @description configure the web notificator
     * @param {*} cfg
     * @returns {Telegram} self
     */
    configure(cfg?: any): Telegram;
    /**
     * @description Send Telegram messages
     * @param {Object} payload
     * @param {Object} [payload.target]
     * @param {TReqTelegram|String} payload.target.value
     * @param {TDtaTelegram} [payload.data]
     * @returns {Promise <TResTelegram>}
     */
    run(payload: {
        target?: {
            value: TReqTelegram | string;
        };
        data?: TDtaTelegram;
    }): Promise<TResTelegram>;
}
declare namespace Telegram {
    export { TClientRequest, TReqTelegram, TResTelegram, TDtaTelegram };
}
import TelegramDriver = require("../driver/Telegram");
type TClientRequest = import('../types').TClientRequest;
type TReqTelegram = import('../types').TReqTelegram;
type TResTelegram = import('../types').TResTelegram;
type TDtaTelegram = import('../types').TDtaTelegram;
