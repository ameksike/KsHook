const kshook = require('../../');

class Telegram {

    constructor(cfg) {
        this.cfg = {};
        this.drv = new kshook.driver.Telegram();
        this.configure(cfg);
    }

    configure(cfg) {
        cfg && Object.assign(this.cfg, cfg);
        this.drv.configure(this.cfg);
        return this;
    }

    run(payload) {
        const chatId = payload?.data?.recipient || payload?.data?.chatId;
        const message = payload?.data?.message || payload?.message;
        return this.drv.send({
            message,
            chatId
        });
    }
}

module.exports = Telegram;