export = MsTeams;
declare class MsTeams {
    constructor(cfg: any);
    cfg: {};
    drv: MsTeamsDriver;
    configure(cfg: any): this;
    run(payload: any): boolean;
}
import MsTeamsDriver = require("../driver/MsTeams");
