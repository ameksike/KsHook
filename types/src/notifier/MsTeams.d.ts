export = MsTeams;
/**
 * @typedef {import('../types').TReqMsTeams} TReqMsTeams
 * @typedef {import('../types').TResMsTeams} TResMsTeams
 * @typedef {import('../types').TDtaMsTeams} TDtaMsTeams
 */
declare class MsTeams {
    constructor(cfg?: any);
    cfg: {};
    drv: MsTeamsDriver;
    /**
     * @description configure the web notificator
     * @param {*} cfg
     * @returns {MsTeams} self
     */
    configure(cfg?: any): MsTeams;
    /**
     * @description Send MsTeams messages
     * @param {Object} payload
     * @param {Object} payload.target
     * @param {TReqMsTeams|String} payload.target.value
     * @param {TDtaMsTeams} [payload.data]
     * @returns {Promise<TResMsTeams>} response
     */
    run(payload: {
        target: {
            value: TReqMsTeams | string;
        };
        data?: TDtaMsTeams;
    }): Promise<TResMsTeams>;
}
declare namespace MsTeams {
    export { TReqMsTeams, TResMsTeams, TDtaMsTeams };
}
import MsTeamsDriver = require("../driver/MsTeams");
type TReqMsTeams = import("../types").TReqMsTeams;
type TResMsTeams = import("../types").TResMsTeams;
type TDtaMsTeams = import("../types").TDtaMsTeams;
