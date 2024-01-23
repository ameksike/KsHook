export = MsTeams;
declare const MsTeams_base: typeof import("ksdp/types/src/integration/Dip");
declare class MsTeams extends MsTeams_base {
    /**
     * @type {Console|null}
     */
    logger: Console | null;
    cfg: {
        url: string;
    };
    cmd: import("ksdp/types/src/behavioral/Command");
    configure(cfg?: {}): this;
    /**
     * @description Register user account
     * @param {Object} payload
     * @param {String} [payload.title]
     * @param {String} [payload.text]
     * @param {String} [payload.subtitle]
     * @param {Object} [payload.facts]
     * @param {String} [payload.flow]
     * @param {*} [payload.result]
     * @param {Object} [opt]
     * @param {String} [opt.url]
     * @param {String} [opt.format]
     * @param {String} [opt.flow]
     * @returns {Promise<boolean>} status
     */
    send(payload: {
        title?: string;
        text?: string;
        subtitle?: string;
        facts?: any;
        flow?: string;
        result?: any;
    }, opt?: {
        url?: string;
        format?: string;
        flow?: string;
    }, ...args: any[]): Promise<boolean>;
    /**
     * @description Structure the output with a simple format
     * @param {*} payload
     * @returns {*} structure
     */
    formatSimple(payload: any): any;
    /**
     * @description Structure the output items with a tuple format for MsgCard
     * @param {*} itm
     * @returns {*} structure Item
     */
    formatMsgCardItem(itm: any): any;
    /**
     * @description Structure the output items with an object format for MsgCard
     * @param {*} itm
     * @returns {*} structure Item
     */
    formatMsgCardItemObj(itm: any): any;
    /**
     * @description Structure the output with a card format
     * @param {*} payload
     * @returns {*} structure
     */
    formatMsgCard(payload: any): any;
}
