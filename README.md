# KsHook: Dynamic Event Handling Library
Ksike Hook library for easy implementation of Event Driven Design. The Hooks pattern is a design pattern that facilitates event-driven programming within a software architecture. It allows you to define events and configure them with subscribers and notifiers. Subscribers listen to specific events and define which notifier should handle them when the event is triggered. This pattern enhances modularity and extensibility in event-driven systems.

This library belong to the Ksike ecosystem:
- [KsMf](https://www.npmjs.com/package/ksmf) - Microframework (WEB, REST API, CLI, Proxy, etc)
- [Ksdp](https://www.npmjs.com/package/ksdp) - Design Patterns Library (GoF, GRASP, IoC, DI, etc)
- [KsCryp](https://www.npmjs.com/package/kscryp) - Cryptographic Library (RSA, JWT, x509, HEX, Base64, Hash, etc) 
- [KsHook](https://www.npmjs.com/package/kshook) - Event Driven Library
- [KsEval](https://www.npmjs.com/package/kseval) - Expression Evaluator Library 
- [KsWC](https://www.npmjs.com/package/kswc) - Web API deployment Library

For further information, check the following topics: 
- [Getting Started](doc/getting.started.md)
- [Notifiers](doc/notifier.md)
- [Processors](doc/processor.md)
- [Subscribers](doc/subscriber.md)
- [Ksdp Hooks Model](https://github.com/ameksike/ksdp/blob/HEAD/doc/integration.hook.md)
- [Create a preconfigured hook service in your project.](doc/create.service.md)
- [Create a route/controller to handle hooks](doc/create.controllers.md)

## Quick overview

The library comprises four key components: Hooks, Subscriber, Notifier, and Processor. These components work in tandem to provide a modular and customizable solution for managing events and executing actions based on event triggers.

### Hooks
- Represents the core interface responsible for dynamically loading instances of controller classes for Subscribers, Notifiers, and Processors.
- Implements patterns such as service locator, inversion of control, strategy, dependency injection, and observers.

### Subscriber
- Manages all data associated with events, defining the type of database to use and the required fields for each subscriber record.
- Interacts with different data storage sources (memory, databases, files, MySQL, MongoDB, Redis, etc.).
- Defines the data type and handles interactions with various data storage solutions.

### Notifier:
- Implements actions based on parameters received, including the event name, subscriber content, and specified parameters at the time of event triggering.
- Executes actions based on event data and subscriber information.

### Processor:
- Optional class defining how a logical expression is evaluated to determine whether the specified Notifier should be executed.
- Evaluates logical expressions and determines whether to proceed with Notifier execution.
- Provides flexibility to conditionally execute actions based on configurable logic.

## Library Workflow:
- Initialize an instance of the KsHook, configuring the supported Subscriber, Notifier, and Processor implementations.
- Configure the list of observers for a specific event, managed by the Subscriber. Each observer record includes the names of the Notifier and Processor to use.
- Trigger an event through the trigger function, specifying the event name, parameterized data, and the Subscriber or list of Subscribers from which the KsHook obtains the list of subscribers for the triggered event.

## Usage Example:

Install the library:

``` npm install kshook```

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
const KsHook = require('kshook');

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

Explore the potential of dynamic event handling with KsHook, a library designed to empower developers with flexibility, extensibility, and seamless event-driven architecture.