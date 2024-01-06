# Processors

- Optional class defining how a logical expression is evaluated to determine whether the specified Notifier should be executed.
- Evaluates logical expressions and determines whether to proceed with Notifier execution.
- Provides flexibility to conditionally execute actions based on configurable logic.

By default KsHook provides support for the following processors:

- **Native:** Evaluate JavaScript native expressions. For further information, check the [KsEval documentation](https://www.npmjs.com/package/kseval).


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


## Native Processor
To use the native expression processor you must add a subscription specifying the **processor** and **expression** properties.

```js
hook.subscribe({
  subscriber: "Model",
  event: "onProfileFailure",
  notifier: "locator",
  value: "newrelic.service:onEvent",
  status: 1,
  processor: "Native",
  expression: "failure LESS THAN EQUAL 10",
});
```
The last step will be trigger the _"onProfileFailure"_ event specifying all data as an Object.

```js
hook.trigger({
    subscriber: "Model",
    event: "onProfileFailure",
    data: { failure: 10, flow: "6868465468415"}
});
```

## Structure
```js
class Processor {
    /**
     * @description Evaluate JavaScript native expressions
     * @param {String} expression
     * @param {Object} data
     * @param {Object} opt {
     *      error: { message: String },
     *      format: FnFormat,
     * }
     * @returns {Boolean|Number|String|null} result
     */
    run(expression, data, opt = {}){}

    /**
     * @description Modify expression and data before execution to support new data types or for security reasons
     * @param {String} expression
     * @param {Object} data
     * @param {Object} opt
     * @returns {Object} {
     *      expression: String,
     *      data: Object,
     *      opt: Object
     * }
     */
    format(expression, data, opt = {}){}
}
````

```js
/**
 * @description Modify expression and data before execution to support new data types or for security reasons
 * @param {String} expression
 * @param {Object} data
 * @param {Object} opt
 * @returns {Object} {
 *      expression: String,
 *      data: Object
 * }
 */
function FnFormat(expression, data, opt = {}) {}
```

## Create a custom Processor

Register a custom or anonymous Processor named **locator**

```js
hook.processor.set({
  name: "Custom",
  target: class {
    run(expression, data) {
      const parts = expression.split(" ");
      const left = parseFloat(data[parts[0]] ?? parts[0]);
      const right = parseFloat(data[parts[2]] ?? parts[2]);
      const operator = data[parts[1]] ?? parts[1];
      switch (operator) {
        case ">":
          return Boolean(left > right);
        case "<":
          return Boolean(left < right);
        case "=":
          return Boolean(left == right);
        case "!=":
          return Boolean(left != right);
        default:
          return false;
      }
    }
  },
});
```

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

Configure an existing Subscriber named **Model**

```js
// Import the database objects
const { models, driver, manager } = require("./db");

// Confugure the Model subscriber
hook.subscriber.get("Model").configure({
  models,
  driver,
  manager,
});
```

Trigger the event named **"onLoginFailure"** for all subscribers type **Model**

```js
const res = hook.trigger({
  subscriber: "Model",
  event: "onLoginFailure",
  data: { failure: 10, max: 11, min: 5 },
});
```

Check the result

```js
const dta = await res.Model;

console.log(
  dta[0].target.id === 4,
  dta[0].target.processor === "Custom",
  dta[0].target.expression === "failure = 10",
  dta[0].data.max === 11,
  dta[0].data.failure === 10,
  dta.length === 10
);
```

For more information on how to create a custom notifier, see [Create a preconfigured hook service in your project.](doc/create.service.md)
