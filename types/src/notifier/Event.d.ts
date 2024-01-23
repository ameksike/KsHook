export = KsEvent;
/**
 * @typedef {import('../types').THook} THook
 * @typedef {import('../types').TReqEvent} TReqEvent
 * @typedef {import('../types').TResEvent} TResEvent
 * @typedef {import('../types').TDtaEvent} TDtaEvent
 */
declare class KsEvent {
    /**
     * @type {THook|null}
     */
    hook: THook | null;
    /**
     * @description Send MsTeams messages
     * @param {Object} payload
     * @param {String} [payload.subscriber]
     * @param {Object} [payload.target]
     * @param {TReqEvent|String} [payload.target.value]
     * @param {TDtaEvent} [payload.data]
     * @returns {*} response
     */
    run(payload: {
        subscriber?: string;
        target?: {
            value?: TReqEvent | string;
        };
        data?: TDtaEvent;
    }): any;
}
declare namespace KsEvent {
    export { THook, TReqEvent, TResEvent, TDtaEvent };
}
type THook = import('../types').THook;
type TReqEvent = import('../types').TReqEvent;
type TResEvent = import('../types').TResEvent;
type TDtaEvent = import('../types').TDtaEvent;
