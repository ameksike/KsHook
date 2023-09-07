## How to used it

### Import your custom hook service
```js
const hook = require('../my.service.hook');
```
For more information on how to create your custom hook service, see [Create a preconfigured hook service in your project.](doc/create.service.md)


### Trigger and event with data
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