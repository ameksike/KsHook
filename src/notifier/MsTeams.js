const kshook = require('../../');

class MsTeams {
    constructor(cfg) {
        this.cfg = {};
        this.drv = new kshook.driver.MsTeams();
        this.configure(cfg);
    }

    configure(cfg) {
        this.cfg = Object.assign(
            require('../../cfg/config.telegram.json'),
            cfg || this.cfg
        );
        this.drv.configure(this.cfg);
        return this;
    }

    run(payload) {
        return {
            from: "MyNotifier",
            payload
        };
    }
}

module.exports = MsTeams;