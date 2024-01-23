const path = require('path');
const KsDp = require('ksdp');

const { build } = require('./src/types');

const store = {
    instance: null
};

const config = {
    handler: KsDp.integration.hook.Main,
    mode: 0,
    options: null,
    key: 'instance'
};

const KsHook = {    
    /**
     * @typedef {import('./src/types').TList} TList 
     * @typedef {import('./src/types').IHook} IHook 
     * @typedef { 0 | 1 } TEnumMode
     */

    /**
     * @description Get the default Hook controller as the class to be instantiated
     * @returns {IHook}
     */
    get handler() {
        return config.handler;
    },
    /**
     * @description Set the default Hook controller as the class to be instantiated
     * @param {IHook} value
     */
    set handler(value) {
        value instanceof Function && (config.handler = value);
    },
    /**
     * @description Get an instance of the Hook library
     * @param {Object} [cfg]
     * @param {TEnumMode} [cfg.mode=0] Forces creating a new instance if set to 1; otherwise it behaves as a singleton by default
     * @param {IHook} [cfg.cls="KsDp.integration.hook.Main"] Define the Hook handler as a class to be instantiated
     * @param {Array} [cfg.options] List of parameters to configure the Hook Handler in the instantiation process
     * @param {String} [cfg.key=instance] A namespace key to save the Hook handler instances
     * @returns {Object} Hook
     */
    get: (cfg) => {
        let {
            mode = config.mode,
            options = config.options,
            cls = config.handler,
            key = config.key
        } = cfg || {};
        options = Array.isArray(options) ? options : [{
            path: path.join(__dirname, 'src')
        }];
        if (!store[key] || mode) {
            let instance = build(cls, options);
            if (mode) {
                return instance;
            }
            store[key] = instance;
        }
        return store[key];
    },
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
    set: (cfg) => {
        cfg?.driver && Object.assign(store, cfg.driver);
        cfg?.handler && (config.handler = cfg.handler);
        cfg?.options && (config.options = cfg.options);
        cfg?.key && (config.key = cfg.key);
        cfg?.mode && (config.mode = cfg.mode);
        return KsHook;
    },
    driver: {
        MsTeams: require('./src/driver/MsTeams'),
        Telegram: require('./src/driver/Telegram'),
        DaoModel: require('./src/driver/DaoModel'),
        DaoManager: require('./src/driver/DaoManager'),
    },
    notifier: {
        MsTeams: require('./src/notifier/MsTeams'),
        Telegram: require('./src/notifier/Telegram'),
        Event: require('./src/notifier/Event'),
        Web: require('./src/notifier/Web'),
    },
    subscriber: {
        Model: require('./src/subscriber/Model'),
    },
    processor: {
        Native: require('./src/processor/Native'),
    }
};

module.exports = KsHook;