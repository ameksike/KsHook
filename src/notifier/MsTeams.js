const MsTeamsDriver = require('../driver/MsTeams');

/**
 * @typedef {import('../types').TReqMsTeams} TReqMsTeams
 * @typedef {import('../types').TResMsTeams} TResMsTeams 
 * @typedef {import('../types').TDtaMsTeams} TDtaMsTeams 
 */
class MsTeams {
    constructor(cfg = null) {
        this.cfg = {};
        this.drv = new MsTeamsDriver();
        this.configure(cfg);
    }

    /**
     * @description configure the web notificator 
     * @param {*} cfg 
     * @returns {MsTeams} self 
     */
    configure(cfg = null) {
        cfg && Object.assign(this.cfg, cfg);
        this.drv.configure(this.cfg);
        return this;
    }

    /**
     * @description Send MsTeams messages
     * @param {Object} payload 
     * @param {Object} payload.target
     * @param {TReqMsTeams|String} payload.target.value 
     * @param {TDtaMsTeams} [payload.data]
     * @returns {Promise<TResMsTeams>} response 
     */
    run(payload) {
        return this.drv.send({
            title: payload?.data?.title || "MSG",
            subtitle: payload?.data?.subtitle,
            text: payload?.data?.message,
            facts: payload?.data?.facts || {}
        }, {
            format: payload?.data?.format || "MsgCard",
            url: typeof payload?.target?.value === "object" ? payload?.target?.value?.url : payload?.target?.value
        });
    }
}

module.exports = MsTeams;