# Notifier:
- Implements actions based on parameters received, including the event name, subscriber content, and specified parameters at the time of event triggering.
- Executes actions based on event data and subscriber information.

By default **KsHook** provides support for the following notifiers:
- MsTeams
- Telegram
- Web Notifications

## Structure
```js
class Notifier {
    /**
     * @description execute HTTP notifications for Web Hooks
     * @param {EventData} payload 
     * @returns {Object} Promise<{
     *      data: Object, 
     *      status: Number, 
     *      headers: Object, 
     *      request: ClientRequest|XMLHttpRequest, 
     *      config: Object 
     * }>
     */
    run(payload){}
}
```
```js
class EventData {
    event: String,
	subscriber: String,
	date: Number,
	data: Object, 
	target: {
        id: Number,
        event: String,
		value: String,
		notifier: String,
		owner: String,
		processor: String,
		expression: String
    }
}
```


## Create a custom Notifier

Install the library:

``` npm install kshook```

Import the KsHook library

```js
const KsHook = require('kshook');
```

Create a KsHook instance

```js
const hook = KsHook.get();
```

Register a custom or anonymous Notifier named **locator**

```js
hook.notifier.set({
    name: "locator",
    target: class {
        run(payload) {
            return payload;
        }
    }
});
```

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