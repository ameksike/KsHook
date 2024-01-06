# Subscriber

- Manages all data associated with events, defining the type of database to use and the required fields for each subscriber record.
- Interacts with different data storage sources (memory, databases, files, MySQL, MongoDB, Redis, etc.).
- Defines the data type and handles interactions with various data storage solutions.

## Structure
```js
class Subscriber {
  /**
   * @description Configure the model subscriber lib
   * @param {SubscriberOption} options
   * @returns {Subscriber} self reference
   */
  configure(options) {}

  /**
   * @description Get the event list
   * @param {Object} payload
   * @returns {Arrar<{name: String, description: String}>} list
   */
  async events(payload) {}

  /**
   * @description Get subscriptions list filtering by subscription
   * @param {Subscription} payload
   * @returns {Array<Subscription>} subscription
   */
  async subscriptions(payload) {}

  /**
   * @description Save subscription
   * @param {Subscription|Array<Subscription>} payload
   * @returns {Subscription|Array<Subscription>} subscribed
   */
  async subscribe(payload) {}

  /**
   * @description Remove subscription
   * @param {Subscription|Array<Subscription>} payload
   * @returns {Subscription|Array<Subscription>} unsubscription
   */
  async unsubscribe(payload) {}
}
```

```js
class Subscription {
    id: Number,
    event: String,
    value: String,
    notifier: String,
    group: Number,
    owner: Number,
    status: Number,
    processor: String,
    expression: String
}
```

```js
class SubscriberOption {
    // DaoModel list
    models: { 
        [name: String]: DaoModel 
    },
    // db manager or DaoManager class
    manager: DaoManager,
    // db connection or DaoManager instance
    driver: Object,
    logger: Object,
    // Model configuration
    cfg: {
        // Attributes names association
        attr: {
            id: 'id',
            notifier: 'notifier',
            event: 'event',
            value: 'value',
            owner: 'owner',
            group: 'group',
            status: 'status',
            processor: 'processor',
            expression: 'expression'
        },
        // Model names association
        model: {  
            hook: "hooks",
            event: "events",
        }
    }
}
```

## Create a custom Processor
