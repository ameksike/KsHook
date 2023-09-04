const path = require('path');
const KsDp = require('ksdp');

const hook = KsDp.integration.hook.Main({
    path: path.join(__dirname, "src")
});

module.exports = {
    hook,
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