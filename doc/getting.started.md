# Getting Started

Install the library:

``` npm install kshook```

Import the library:

```js
const KsHook = require('kshook');
```

## Demo 1
Import your custom hook service
```js
const hook = require('../my.service.hook');
```
For more information on how to create your custom hook service, see [Create a preconfigured hook service in your project.](./create.service.md)

Trigger and event with data
```js
hook.trigger({
    subscriber: "Model",
    event: "onLoadFailed",
    data: {
        flow: req.flow,
        src: "controller:User:read",
        error: { message: error?.message || error, stack: error?.stack }
    }
});
```

## Demo 2
Load your custom notifier, subscriber, and processors:

```js
const locator = require('./notifier.locator');
const { models, driver, manager } = require('./db');
```

Register subscribers for each event in the data model 
```
--------------------------------------------------------------------
| id | event  | notifier | value    | processor | expression       |
--------------------------------------------------------------------
| 1  | logout | locator  | newrelic | null      | null             |
| 2  | login  | locator  | alert    | native    | failure EQUAL 11 |
--------------------------------------------------------------------
```

Configure and run
```js
// Initialize KsHook instance
const hook = KsHook.get();

// Configure supported components
hook.notifier.set({
    name: "locator",
    target: locator
});
hook.subscriber.get("Model").configure({
    models,
    driver,
    manager
});

// Trigger the 'login' event
const res = hook.trigger({
    subscriber: ["Model"],
    event: "login",
    data: { failure: 10, flow: "6868465468415", step: "STEP-1" }
});
```

For further information, check the following topics: 
- [Notifiers](./notifier.md)
- [Processors](./processor.md)
- [Subscribers](./subscriber.md)
- [Ksdp Hooks Model](https://github.com/ameksike/ksdp/blob/HEAD/doc/integration.hook.md)
- [Create a preconfigured hook service in your project.](./create.service.md)
- [Create a route/controller to handle hooks](./create.controllers.md)