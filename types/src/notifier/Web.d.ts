export = Web;
/**
 * @typedef {import('../types').TClientRequest} TClientRequest
 * @typedef {import('../types').TReqWeb} TReqWeb
 * @typedef {import('../types').TResWeb} TResWeb
 * @typedef {import('../types').TDtaWeb} TDtaWeb
 */
declare class Web {
    constructor(cfg?: any);
    cfg: {
        url: string;
        method: string;
    };
    /**
     * @description configure the web notificator
     * @param {*} cfg
     * @returns {Web} self
     */
    configure(cfg?: any): Web;
    /**
     * @description Execute HTTP notifications for Web Hooks
     * @param {Object} payload
     * @param {Object} [payload.target]
     * @param {TReqWeb|String} [payload.target.value]
     * @param {TDtaWeb} [payload.data]
     * @returns {Promise <TResWeb>} result
     */
    run(payload: {
        target?: {
            value?: TReqWeb | string;
        };
        data?: TDtaWeb;
    }): Promise<TResWeb>;
}
declare namespace Web {
    export { TClientRequest, TReqWeb, TResWeb, TDtaWeb };
}
type TClientRequest = import("../types").TClientRequest;
type TReqWeb = import("../types").TReqWeb;
type TResWeb = import("../types").TResWeb;
type TDtaWeb = import("../types").TDtaWeb;
