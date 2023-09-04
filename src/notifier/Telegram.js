const kshook = require('../../');

class Telegram {

    constructor(cfg) {
        this.cfg = {};
        this.drv = new kshook.driver.Telegram();
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
        const chatId = payload.recipient || payload.chat_id;
        const message = payload?.data?.text || payload?.message;
        return this.drv.send({
            message,
            chatId
        });
    }
}

module.exports = Telegram;