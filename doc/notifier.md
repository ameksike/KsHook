# Notifier:

- Implements actions based on parameters received, including the event name, subscriber content, and specified parameters at the time of event triggering.
- Executes actions based on event data and subscriber information.

By default **KsHook** provides support for the following notifiers:

- **MsTeams:** Send message to a certain MS Teams channel.
- **Telegram:** Send message to a certain Telegram channel.
- **Web:** Send web notifications via a WEB API.

## Start

Install the library:

` npm install kshook`

Import the KsHook library

```js
const KsHook = require("kshook");
```

Create a KsHook instance

```js
const hook = KsHook.get();
```

## MsTeams notifier

Add a subscription to an event specifying the notifier named MsTeams and the decided channel to notify.

```js
hook.subscribe({
  subscriber: "Model",
  notifier: "MsTeams",
  value:
    "https://365.webhook.office.com/webhookb2/051e016e-70f5-457c-9684-1258e9101ba5@9ceb45d9-8994-49de-a178-bcc598fec3ce/IncomingWebhook/367b9eeb6ec846a0a5ac8eeb001e51f7/b3a41495-b76f-47f6-9c96-7884fff1fe74",
  event: "onLogin",
});
```

It is also possible to define global MS Teams Channel through an environment variable named **CHANNEL_URL_OUT**.

```
CHANNEL_URL_OUT=https://365.webhook.office.com/webhookb2/051e016e-70f5-457c-9684-1258e9101ba5@9ceb45d9-8994-49de-a178-bcc598fec3ce/IncomingWebhook/367b9eeb6ec846a0a5ac8eeb001e51f7/b3a41495-b76f-47f6-9c96-7884fff1fe74
```

Using the CHANNEL_URL_OUT it is not necessary the value.

```js
class MsTeamsData {
	title: String,
	subtitle: String,
	message: String,
	format: String,
	facts: {
        [name: String]: value: String|Object
    },
}
```

The last step will be trigger the _"oneLogin"_ event specifying all data based on the MsTeamsData interface.

```js
hook.trigger({
  subscriber: "Model",
  event: "onLogin",
  data: {
    title: "Failed login attempts",
    subtitle: "Security",
    message: "maximum failed user login attempts",
    format: "MsgCard",
  },
});
```

## Telegram notifier

The Telegram notifier must be configured, specifying the Telegram Token Bot code.

```js
hook.notifier.get("Telegram").configure({
  tokenBot: "5521267355:55FEbBvWTrNlMAvWuXo8PyyVBN2BYKICI55",
});
```

Add a subscription to an event specifying the notifier named **Telegram** and the chatId or channel to notify in the value property.

```js
hook.subscribe([
  {
    subscriber: "Memory",
    notifier: "Telegram",
    event: "onLoad",
    value: 1482657376,
  },
]);
```

The last step will be trigger the _"onLoad"_ event specifying all data based on the MsTeamsData interface.

```js
hook.trigger({
  subscriber: "Memory",
  event: "onLoad",
  data: {
    message: "Library uploaded on " + Date.now(),
  },
});
```

## Web notifier

Add a subscription to an event specifying the notifier named **Web**.

```js
hook.subscribe([
  {
    subscriber: "Memory",
    notifier: "Web",
    event: "onLoad",
    value: {
      method: "post",
      url: "https://my.webhook.api.com/callback",
      headers: {
        "Content-Type": "application/json"
      }
    },
  },
]);
```

The last step will be trigger the _"onLoad"_ event specifying all data as Object

```js
hook.trigger({
  subscriber: "Memory",
  event: "onLoad",
  data: {
    name: "MyLib",
    date: Date.now(),
  },
});
```

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
  run(payload) {}
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

Register a custom or anonymous Notifier named **locator**

```js
hook.notifier.set({
  name: "locator",
  target: class {
    run(payload) {
      return payload;
    }
  },
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
          action: lst[1],
        };
      }
      target.params = target.params || [payload?.data];
      target.action = target.action || payload?.target?.event;
      if (!target?.name || !target?.action) {
        return null;
      }
      target.locate = target.locate || "services";
      target.file =
        target.file ||
        path.join(__dirname, "../", target.locate, target.name + ".js");
      target.service = target.service || require(target.file);
      this.logger?.info({
        flow: payload?.data?.flow,
        src: "Hook:Locator:Run",
        message: "Event received",
        data: { action: target.action, name: target.name },
      });
      return this.cmd.run(target.action, target.params, target.service);
    } catch (error) {
      this.logger?.error({
        flow: payload?.data?.flow,
        src: "Hook:Locator:Run",
        error: error?.message || error,
        data: payload,
      });
    }
  }
}

const obj = new Locator();
obj.Cls = Locator;
module.exports = obj;
```

For more information on how to create a custom notifier, see [Create a preconfigured hook service in your project.](doc/create.service.md)
