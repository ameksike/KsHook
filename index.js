const path = require('path');
const KsDp = require('ksdp');
const store = { instance: null };

module.exports = {
    /**
     * @description Get an instance of the Hook library
     * @param {Boolean} force Forces creating a new instance, otherwise it behaves as a singleton by default
     * @param {Object} options 
     * @returns {Object} Hook
     */
    get: (force = false, options = null) => {
        options = options || {
            path: path.join(__dirname, "src")
        };
        if (force || !store.instance) {
            store.instance = new KsDp.integration.hook.Main(options);
        }
        return instance;
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
        Sequelize: require('./src/subscriber/Sequelize'),
    }
};