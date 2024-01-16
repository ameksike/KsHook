const MsTeamsDriver = require('../driver/MsTeams');
class MsTeams {
    constructor(cfg) {
        this.cfg = {};
        this.drv = new MsTeamsDriver();
        this.configure(cfg);
    }

    configure(cfg) {
        cfg && Object.assign(this.cfg, cfg);
        this.drv.configure(this.cfg);
        return this;
    }

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
    run(payload) {
        return this.drv.send({
            title: payload?.data?.title || "MSG",
            subtitle: payload?.data?.subtitle,
            text: payload?.data?.message,
            facts: payload?.data?.facts || {}
        }, {
            format: payload?.data?.format || "MsgCard",
            url: payload?.target?.value?.url || payload?.target?.value
        });
    }
}

module.exports = MsTeams;