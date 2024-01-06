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

hook.processor.set({
    name: "Custom",
    target: class {
        run(expression, data) {
            const parts = expression.split(" ");
            const left = parseFloat(data[parts[0]] ?? parts[0]);
            const right =  parseFloat(data[parts[2]] ?? parts[2]);
            const operator = data[parts[1]] ?? parts[1];
            switch (operator) {
                case ">": return Boolean(left > right);
                case "<": return Boolean(left < right);
                case "=": return Boolean(left == right);
                case "!=": return Boolean(left != right);
                default: return false;
            }
        }
    }
});

module.exports = hook;