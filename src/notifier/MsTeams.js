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