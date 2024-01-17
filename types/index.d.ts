export function get(cfg?: {
    mode?: 0 | 1;
    cls?: Function;
    options?: any;
    key?: string;
}): any;
export namespace driver {
    let MsTeams: typeof import("./src/driver/MsTeams");
    let Telegram: typeof import("./src/driver/Telegram");
    let DaoModel: typeof import("./src/driver/DaoModel");
    let DaoManager: typeof import("./src/driver/DaoManager");
}
export namespace notifier {
    let MsTeams_1: typeof import("./src/notifier/MsTeams");
    export { MsTeams_1 as MsTeams };
    let Telegram_1: typeof import("./src/notifier/Telegram");
    export { Telegram_1 as Telegram };
    export let Web: typeof import("./src/notifier/Web");
}
export namespace subscriber {
    let Model: typeof import("./src/subscriber/Model");
}
export namespace processor {
    let Native: {
        new (): import("./src/processor/Native");
    };
}
