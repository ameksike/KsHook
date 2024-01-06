const { DaoModel, DaoManager } = require('../../').driver;

const list = [
    {
        id: 1,
        notifier: 'locator',
        event: 'onProfileFailure',
        value: 'newrelic.service:onEvent1',
        owner: null,
        group: 'first',
        status: 1,
        processor: null,
        expression: null
    }, {
        id: 2,
        event: 'onProfileFailure',
        notifier: 'locator',
        value: 'newrelic.service:onEvent',
        owner: null,
        group: 'second',
        status: 1,
        processor: 'Native',
        expression: "failure LESS THAN 10 AND step DISTINCT 'STEP-2'"
    }, {
        id: 3,
        event: 'onProfileFailure',
        notifier: 'locator',
        value: 'newrelic.service:onEvent',
        owner: null,
        group: 'second',
        status: 1,
        processor: 'Native',
        expression: "failure LESS THAN EQUAL 10 AND step EQUAL 'STEP-1'"
    }, {
        id: 3,
        event: 'onEvent',
        notifier: 'locator',
        value: 'newrelic.service:onEvent',
        owner: null,
        group: 'second',
        status: 1
    }, {
        id: 4,
        event: 'onLoginFailure',
        notifier: 'locator',
        value: 'newrelic.service:onEvent',
        owner: null,
        group: 'second',
        status: 1,
        processor: 'Custom',
        expression: "failure = 10"
    }, {
        id: 5,
        event: 'onLoginFailure',
        notifier: 'locator',
        value: 'newrelic.service:onEvent',
        owner: null,
        group: 'second',
        status: 1,
        processor: 'Custom',
        expression: "failure > max"
    }
].map(itm => new DaoModel(itm));

module.exports = {
    models: {
        hooks: new DaoModel(list),
        events: new DaoModel(),
    },
    driver: new DaoManager(),
    manager: DaoManager
}