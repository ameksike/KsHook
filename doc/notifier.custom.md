## Create a custom notifier in your project called locator

```js
const ksdp = require("ksdp");
const path = require("path");

class Locator extends ksdp.integration.Dip {

    constructor() {
        super();
        this.cmd = new ksdp.behavioral.Command();
    }

    /**
     * @description Custom KsHook Notifier
     * @param {Object} payload 
     * @param {Object} payload.data
     * @param {Object} payload.target
     * @param {Object|String} payload.target.value 
     * @param {String} payload.target.value.name 
     * @param {String} payload.target.value.action 
     * @param {String} payload.target.value.locate
     * @param {String} payload.target.value.file
     * @param {Object} payload.target.value.service 
     * @param {Array} payload.target.value.params 
     * @returns {Object} { result: Object }
     */
    run(payload) {
        try {
            let target = payload?.target?.value;
            if (typeof target === "string") {
                let lst = target.split(":");
                target = {
                    name: lst[0],
                    action: lst[1]
                }
            }
            target.params = target.params || [payload?.data];
            target.action = target.action || payload?.target?.event;
            if (!target?.name || !target?.action) {
                return null;
            }
            target.locate = target.locate || "services";
            target.file = target.file || path.join(__dirname, "../", target.locate, target.name + ".js");
            target.service = target.service || require(target.file);
            this.logger?.info({
                flow: payload?.data?.flow,
                src: "Hook:Locator:Run",
                message: "Event received",
                data: { action: target.action, name: target.name }
            });
            return this.cmd.run(target.action, target.params, target.service);
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.data?.flow,
                src: "Hook:Locator:Run",
                error: error?.message || error,
                data: payload
            });
        }
    }
}

const obj = new Locator();
obj.Cls = Locator;
module.exports = obj;
```

For more information on how to create a custom notifier, see [Create a preconfigured hook service in your project.](doc/create.service.md)