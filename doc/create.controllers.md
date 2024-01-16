## Create a route/controller to handle hooks 

```js
const express = require("express");
const router = express.Router();

/**
 * @description subscribe a new hook
 */
router.post('/', (req, res) => {
    const query = Object.assign({ subscriber: "Model" }, req.query, req.params, req.body);
    const data = await hook.subscribe(query);
    res.json({ data });
});

/**
 * @description get the list of hooks 
 */
router.get('/', (req, res) => {
    const query = Object.assign({ subscriber: "Model" }, req.query, req.params, req.body);
    const data = await hook.subscriptions(query);
    res.json({ data });
});

/**
 * @description get the hook events list
 */
router.get('/events', (req, res) => {
        const query = Object.assign({ subscriber: "Model" }, req.query, req.params, req.body);
        const data = await hook.events(query);
        res.json({ data });
});

/**
 * @description remove a hook
 */
router.delete('/:id', (req, res) => {
    const query = Object.assign({ subscriber: "Model" }, req.query, req.params, req.body);
    const data = await hook.unsubscribe(query);
    res.json({ data });
});

module.exports = router;
```

### hook creation service call example
```
POST /hook
{
    "subscriber": "Model",
    "notifier": "Locator",
    "value": "user.service",
    "event": "onLoad",
    "owner": 5
}
```


For further information, check the following topics: 
- [Notifiers](./notifier.md)
- [Processors](./processor.md)
- [Subscribers](./subscriber.md)
- [Ksdp Hooks Model](https://github.com/ameksike/ksdp/blob/HEAD/doc/integration.hook.md).
- [Create a preconfigured hook service in your project.](./create.service.md)
- [Create a route/controller to handle hooks](./create.controllers.md)
