const TelegramDriver = require('../driver/Telegram');

class Telegram {

    constructor(cfg) {
        this.cfg = {};
        this.drv = new TelegramDriver();
        this.configure(cfg);
    }

    configure(cfg) {
        cfg && Object.assign(this.cfg, cfg);
        this.drv.configure(this.cfg);
        return this;
    }

    run(payload) {
        const chatId = payload?.target?.value?.recipient || payload?.target?.value?.chatId || payload?.target?.value;
        const message = payload?.data?.message;
        return this.drv.send({
            message,
            chatId
        });
    }
}

module.exports = Telegram;