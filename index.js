const path = require('path');
const KsDp = require('ksdp');
const store = { instance: null };

module.exports = {
    /**
     * @description Get an instance of the Hook library
     * @param {Object} cfg
     * @param {Number} cfg.mode Forces creating a new instance, otherwise it behaves as a singleton by default
     * @param {Object} cfg.options 
     * @returns {Object} Hook
     */
    get: (cfg) => {
        let { mode = 0, options = null, cls = KsDp.integration.hook.Main } = cfg || {};
        options = options || {
            path: path.join(__dirname, "src")
        };
        if (!store.instance || mode) {
            let instance = new cls(options);
            if (mode > 1) {
                return instance;
            }
            store.instance = instance;
        }
        return store.instance;
    },
    driver: {
        MsTeams: require('./src/driver/MsTeams'),
        Telegram: require('./src/driver/Telegram')
    },
    notifier: {
        MsTeams: require('./src/notifier/MsTeams'),
        Telegram: require('./src/notifier/Telegram'),
    },
    subscriber: {
        Model: require('./src/subscriber/Model'),
    }
};