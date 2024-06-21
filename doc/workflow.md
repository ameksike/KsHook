# KsHook and Workflows

## Overview

KsHook is a library for Node.js that enables the implementation of an Event-Driven Architecture (EDA). It allows developers to create and manage event-driven workflows by defining subscribers, events, and notifiers. KsHook supports advanced features like conditional event handling, alternative notifiers, and parameter mapping, making it highly adaptable for complex workflows.

## Key Concepts and Components

1. **Subscriber**: An entity that listens for specific events and executes a handler when those events occur.
2. **Event**: An occurrence or action that triggers subscribers.
3. **Notifier**: A service or component responsible for notifying subscribers about an event.
4. **Processor**: A handler that evaluates expressions to determine whether certain conditions are met.
5. **Expression**: A logical condition that can trigger alternative actions if not met.

## Example Model

Consider the following model:

```
----------------------------------------------------------------------------------------------------------------------------------------
| id | event  | notifier | value    |  param            | processor | expression       | notifier_alt | value_alt    |  param_alt      |
----------------------------------------------------------------------------------------------------------------------------------------
| 1  | logout | locator  | newrelic | null              | null      | null             | null         | null         | null            |
| 2  | login  | locator  | alert    | {failure:dto.inf} | native    | failure EQUAL 11 | email        | test@srv.com | {note:dto.note} |
----------------------------------------------------------------------------------------------------------------------------------------
```


This table defines two events: `logout` and `login`. For the `login` event, it specifies additional logic to handle different outcomes based on conditions.

## Implementation Details

### Setting Up KsHook

First, you need to set up KsHook in your Node.js application:

```js
const KsHook = require("kshook");

// load your custom notifier in this case it is an implementation of IoC pattern
const locator = require('./locator');

// load your logger services, it is not required
const logger = require('../services/log.service');

// load your database models using Sequelize
const { models, driver, manager } = require("../models/db");

// create singleton instance from Hook library
const hook = KsHook.get();

// set the custom notifier which implement a service locator pattern
hook.notifier.set({
    name: "locator",
    target: locator.inject({ logger })
});

// configure your subscriber handler based on Sequelize models
hook.subscriber.get("Model").configure({
    models,
    driver,
    manager,
    logger
});

// export your custom hook service
module.exports = hook;
```

In this setup:

- **locator** is a custom notifier that uses a service locator pattern.
- **logger** is a logging service.
- **models, driver, manager** are database components using Sequelize.
- **hook** is the KsHook singleton instance.

### Defining a Custom Notifier
A custom notifier, such as NewRelicService, can be defined to handle events:

```js
const newrelic = require('newrelic');

class NewRelicService {
    onEvent(payload, meta) {
        newrelic.recordCustomEvent("sys_log", payload);
        // Notice how the NewRelic Service is able to trigger another event from the same
        this.hook.trigger({
            subscriber: "Model",
            event: "onReload",
            data: { ...payload, logged: true }
        });
    }
}
```

In this example:

- **NewRelicService** listens for events and records them using New Relic.
- It can also trigger another event (*onReload*) within the same workflow.

### Subscribing to Events
You can subscribe to events using the subscribe method, specifying the processor and expression properties:

```js
hook.subscribe({
    subscriber: "Model",
    event: "onProfileFailure",
    notifier: "locator",
    value: "newrelic.service:onEvent",
    param: "{ email: user.email, id: user.id, flow, failure }",
    status: 1,
    processor: "Native",
    expression: "failure LESS THAN EQUAL 10",
    notifier_alt: "mailer",
    param_alt: "{ to: user.email, flow }",
    value_alt: "SMTP"
});
```

This subscription:

- Listens for the `onProfileFailure` event.
- Uses the `locator` notifier to load the `newrelic.service:onEvent` handler.
- Evaluates the expression ```failure LESS THAN EQUAL 10``` using the `Native` processor.
- If the expression fails, it uses the `mailer` notifier with alternative parameters and value.

### Triggering Events

Finally, you can trigger events with the necessary data:

```js
hook.trigger({
    subscriber: "Model",
    event: "onProfileFailure",
    data: { 
        failure: 10, 
        flow: "6868465468415", 
        user: { 
            email: "tst@demo.cu", 
            id: 12121 
        } 
    }
});
```

In this example:

- The `onProfileFailure` event is triggered with the specified data.
- Based on the subscription logic, it will evaluate the expression and decide whether to use the primary or alternative notifier.

### Attribute Mapping Syntax
KsHook allows for detailed attribute mapping using the `param` and `param_alt` properties. These properties map values from the event payload to the parameters expected by the subscriber's handler.

Example, for the subscription:

```js
hook.subscribe({
    subscriber: "Model",
    event: "onProfileFailure",
    notifier: "locator",
    value: "newrelic.service:onEvent",
    param: "{ email: user.email, id: user.id, flow, failure }",
    status: 1,
    processor: "Native",
    expression: "failure LESS THAN EQUAL 10",
    notifier_alt: "mailer",
    param_alt: "{ to: user.email, flow }",
    value_alt: "SMTP"
});
```

- `param` maps the event payload values to the handler's parameters.
    - `email`: `user.email` maps the user's email from the event payload.
    - `id`: `user.id` maps the user's ID from the event payload.
    - `flow` and `failure` are taken directly from the event payload.
- `param_alt` provides alternative mappings if the expression fails.
    - `to`: `user.email` maps the user's email for the alternative notifier.

### Advanced Workflows and BPM
KsHook's architecture supports complex workflows by allowing events to trigger other events, enabling a form of Business Process Modeling (BPM).

Example: Chained Events

Consider a scenario where an event triggers another event based on certain conditions:

```js
const newrelic = require('newrelic');

class NewRelicService {
    onEvent(payload, meta) {
        newrelic.recordCustomEvent("sys_log", payload);
        // Trigger another event
        this.hook.trigger({
            subscriber: "Model",
            event: "onReload",
            data: { ...payload, logged: true }
        });
    }
}
```

In this setup, the `NewRelicService` handles an event and triggers the `onReload` event, adding more data (`logged: true`) to the payload. This chained event mechanism allows for creating complex, conditional workflows.


### Conditional Logic with Alternative Notifiers

KsHook supports conditional logic to handle different outcomes based on expressions:

```js
hook.subscribe({
    subscriber: "Model",
    event: "onProfileFailure",
    notifier: "locator",
    value: "newrelic.service:onEvent",
    param: "{ email: user.email, id: user.id, flow, failure }",
    status: 1,
    processor: "Native",
    expression: "failure LESS THAN EQUAL 10",
    notifier_alt: "mailer",
    param_alt: "{ to: user.email, flow }",
    value_alt: "SMTP"
});
```

Here:

- The primary handler (`newrelic.service:onEvent`) is used if `failure LESS THAN EQUAL 10`.
- If the condition fails, the alternative handler (`mailer`) is used with different parameters and value (`SMTP`).

This flexibility enables the creation of dynamic workflows that can adapt to different conditions and outcomes, similar to BPM solutions.

## Conclusion

KsHook provides a robust framework for implementing EDA in Node.js applications. By defining subscribers, events, notifiers, and processors, you can create flexible and dynamic workflows that adapt to various conditions and requirements. This allows for efficient handling of complex event-driven scenarios, making your application more responsive and modular. With the ability to map attributes and chain events, KsHook supports advanced workflows and approaches akin to Business Process Modeling (BPM), enabling sophisticated and conditionally-driven process automation.

