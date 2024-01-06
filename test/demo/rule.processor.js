const KsHook = require("../../");
const locator = require('./notifier.locator');
const { models, driver, manager } = require('./db');

const hook = KsHook.get();

hook.notifier.set({
    name: "locator",
    target: locator
});

hook.subscriber.get("Model").configure({
    models,
    driver,
    manager
});

module.exports = hook;