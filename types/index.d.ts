export let handler: typeof import("ksdp/types/src/integration/hook");
export function get(cfg?: {
    mode?: 0 | 1;
    cls?: typeof import("ksdp/types/src/integration/hook");
    options?: any[];
    key?: string;
}): any;
export function set(cfg?: {
    driver?: {
        [name: string]: any;
    };
    handler?: typeof import("ksdp/types/src/integration/hook");
    options?: any[];
    key?: string;
    mode?: 0 | 1;
}): {
    /**
     * @typedef {import('./src/types').TList} TList
     * @typedef {import('./src/types').IHook} IHook
     * @typedef { 0 | 1 } TEnumMode
     */
    /**
     * @description Get the default Hook controller as the class to be instantiated
     * @returns {IHook}
     */
    handler: typeof import("ksdp/types/src/integration/hook");
    /**
     * @description Get an instance of the Hook library
     * @param {Object} [cfg]
     * @param {TEnumMode} [cfg.mode=0] Forces creating a new instance if set to 1; otherwise it behaves as a singleton by default
     * @param {IHook} [cfg.cls="KsDp.integration.hook.Main"] Define the Hook handler as a class to be instantiated
     * @param {Array} [cfg.options] List of parameters to configure the Hook Handler in the instantiation process
     * @param {String} [cfg.key=instance] A namespace key to save the Hook handler instances
     * @returns {Object} Hook
     */
    get: (cfg?: {
        mode?: 0 | 1;
        cls?: typeof import("ksdp/types/src/integration/hook");
        options?: any[];
        key?: string;
    }) => any;
    /**
     * @description configure the hook library
     * @param {Object} [cfg]
     * @param {TList} [cfg.driver] driver instance list
     * @param {IHook} [cfg.handler] default driver to use
     * @param {Array} [cfg.options] List of parameters to configure the Hook Handler in the instantiation process
     * @param {String} [cfg.key=instance] A namespace key to save the Hook handler instances
     * @param {TEnumMode} [cfg.mode=0] Forces creating a new instance if set to 1; otherwise it behaves as a singleton by default
     * @returns {KsHook} self
     */
    set: (cfg?: {
        driver?: {
            [name: string]: any;
        };
        handler?: typeof import("ksdp/types/src/integration/hook");
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
        Event: typeof import("./src/notifier/Event");
        Web: typeof import("./src/notifier/Web");
    };
    subscriber: {
        Model: typeof import("./src/subscriber/Model");
    };
    processor: {
        Native: {
            new (): import("./src/processor/Native");
            [x: string]: any;
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
    export let Event: typeof import("./src/notifier/Event");
    export let Web: typeof import("./src/notifier/Web");
}
export namespace subscriber {
    let Model: typeof import("./src/subscriber/Model");
}
export namespace processor {
    let Native: {
        new (): import("./src/processor/Native");
        [x: string]: any;
    };
}
