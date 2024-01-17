const path = require('path');
const KsDp = require('ksdp');
const store = { instance: null };

module.exports = {
    /**
     * @typedef { 0 | 1 } EnumMode
     */

    /**
     * @description Get an instance of the Hook library
     * @param {Object} [cfg]
     * @param {EnumMode} [cfg.mode=0] Forces creating a new instance if set to 1; otherwise it behaves as a singleton by default
     * @param {Function} [cfg.cls="KsDp.integration.hook.Main"] Define the Hook handler as a class to be instantiated
     * @param {Object} [cfg.options] A single parameter to set the Hook Handler on instantiation process
     * @param {String} [cfg.key=instance] A namespace key to save the Hook handler instances
     * @returns {Object} Hook
     */
    get: (cfg) => {
        let { mode = 0, options = null, cls = KsDp.integration.hook.Main, key = 'instance' } = cfg || {};
        options = options || {
            path: path.join(__dirname, 'src')
        };
        if (!store[key] || mode) {
            let instance = new cls(options);
            if (mode > 1) {
                return instance;
            }
            store[key] = instance;
        }
        return store[key];
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
        Web: require('./src/notifier/Web'),
    },
    subscriber: {
        Model: require('./src/subscriber/Model'),
    },
    processor: {
        Native: require('./src/processor/Native'),
    }
};