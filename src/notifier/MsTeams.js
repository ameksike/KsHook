const kshook = require('../../');

class MsTeams {
    constructor(cfg) {
        this.cfg = {};
        this.drv = new kshook.driver.MsTeams();
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
            format: payload?.data?.format || "MsgCard"
        });
    }
}

module.exports = MsTeams;