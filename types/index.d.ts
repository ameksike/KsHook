import KsDp = require("ksdp");
export let handler: typeof KsDp.integration.hook;
export function get(cfg?: {
    mode?: 0 | 1;
    cls?: typeof KsDp.integration.hook;
    options?: any[];
    key?: string;
}): any;
export function set(cfg?: {
    driver?: {
        [name: string]: any;
    };
    handler?: {
        [name: string]: any;
    };
    options?: any[];
    key?: string;
    mode?: 0 | 1;
}): {
    /**
     * @typedef {({[name:String]:Object})} List
     **/
    /**
     * @typedef { 0 | 1 } EnumMode
     */
    /**
     * @typedef {import("ksdp").integration.hook} IHook
     */
    /**
     * @description Get the default Hook controller as the class to be instantiated
     * @returns {IHook}
     */
    handler: typeof KsDp.integration.hook;
    /**
     * @description Get an instance of the Hook library
     * @param {Object} [cfg]
     * @param {EnumMode} [cfg.mode=0] Forces creating a new instance if set to 1; otherwise it behaves as a singleton by default
     * @param {IHook} [cfg.cls="KsDp.integration.hook.Main"] Define the Hook handler as a class to be instantiated
     * @param {Array} [cfg.options] List of parameters to configure the Hook Handler in the instantiation process
     * @param {String} [cfg.key=instance] A namespace key to save the Hook handler instances
     * @returns {Object} Hook
     */
    get: (cfg?: {
        mode?: 0 | 1;
        cls?: typeof KsDp.integration.hook;
        options?: any[];
        key?: string;
    }) => any;
    /**
     * @description configure the hook library
     * @param {Object} [cfg]
     * @param {List} [cfg.driver] driver instance list
     * @param {List} [cfg.handler] default driver to use
     * @param {Array} [cfg.options] List of parameters to configure the Hook Handler in the instantiation process
     * @param {String} [cfg.key=instance] A namespace key to save the Hook handler instances
     * @param {EnumMode} [cfg.mode=0] Forces creating a new instance if set to 1; otherwise it behaves as a singleton by default
     * @returns {KsHook} self
     */
    set: (cfg?: {
        driver?: {
            [name: string]: any;
        };
        handler?: {
            [name: string]: any;
        };
        options?: any[];
        key?: string;
        mode?: 0 | 1;
    }) => any;
    driver: {
        MsTeams: typeof import("./src/driver/MsTeams");
        Telegram: typeof import("./src/driver/Telegram");
        DaoModel: typeof import("./src/driver/DaoModel");
        DaoManager: typeof import("./src/driver/DaoManager");
    };
    notifier: {
        MsTeams: typeof import("./src/notifier/MsTeams");
        Telegram: typeof import("./src/notifier/Telegram");
        Web: typeof import("./src/notifier/Web");
    };
    subscriber: {
        Model: typeof import("./src/subscriber/Model");
    };
    processor: {
        Native: {
            new (): import("./src/processor/Native");
        };
    };
};
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
