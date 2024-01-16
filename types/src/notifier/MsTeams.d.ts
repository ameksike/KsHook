export = MsTeams;
declare class MsTeams {
    constructor(cfg: any);
    cfg: {};
    drv: MsTeamsDriver;
    configure(cfg: any): this;
    /**
     * @description Send MsTeams messages
     * @param {Object} payload
     * @param {Object} payload.target
     * @param {Object|String} payload.target.value
     * @param {String} payload.target.value.url
     * @param {Object} [payload.data]
     * @param {String} payload.data.title
     * @param {String} payload.data.subtitle
     * @param {String} payload.data.message
     * @param {Object} payload.data.facts
     * @returns {Promise<Boolean>}
     */
    run(payload: {
        target: {
            value: any | string;
        };
    }): Promise<boolean>;
}
import MsTeamsDriver = require("../driver/MsTeams");
