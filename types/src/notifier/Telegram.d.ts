export = Telegram;
declare class Telegram {
    constructor(cfg: any);
    cfg: {};
    drv: TelegramDriver;
    configure(cfg: any): this;
    run(payload: any): any;
}
import TelegramDriver = require("../driver/Telegram");
