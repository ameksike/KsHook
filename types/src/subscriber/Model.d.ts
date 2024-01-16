export = Model;
declare class Model {
    cfg: {
        attr: {
            id: string;
            notifier: string;
            event: string;
            value: string;
            owner: string;
            group: string;
            status: string;
            processor: string;
            expression: string;
        };
        model: {
            hook: string;
            event: string;
        };
    };
    /**
     * @description Configure the model subscriber lib
     * @param {Object} options
     * @param {Object} options.models DaoModel list
     * @param {Object} options.driver db connection or DaoManager instance
     * @param {Object} options.manager db manager or DaoManager class
     * @param {Object} options.logger log handler
     * @param {Object} options.cfg
     * @param {Object} options.cfg.attr Attributes names association
     * @param {String} options.cfg.attr.id
     * @param {String} options.cfg.attr.notifier
     * @param {String} options.cfg.attr.event
     * @param {String} options.cfg.attr.value
     * @param {String} options.cfg.attr.owner
     * @param {String} options.cfg.attr.group
     * @param {String} options.cfg.attr.status
     * @param {String} options.cfg.attr.processor
     * @param {String} options.cfg.attr.expression
     * @param {Object} options.cfg.model Model names association
     * @param {String} options.cfg.model.hook
     * @param {String} options.cfg.model.event
     * @returns {Object} self reference
     */
    configure(options: {
        models: any;
        driver: any;
        manager: any;
        logger: any;
        cfg: {
            attr: {
                id: string;
                notifier: string;
                event: string;
                value: string;
                owner: string;
                group: string;
                status: string;
                processor: string;
                expression: string;
            };
            model: {
                hook: string;
                event: string;
            };
        };
    }): any;
    format(payload: any): any;
    /**
     * @description save subscriptions
     * @param {Object|Array} payload
     * @param {Number} payload.id
     * @param {Number} payload.owner
     * @param {Number} payload.group
     * @param {Number} payload.status
     * @param {String} payload.event
     * @returns {Object|Array} { group: String, owner: String, event: String, value: String|Object, notifier: String }
     */
    subscribe(payload: any | any[]): any | any[];
    /**
     * @description remove subscriptions
     * @param {Object|Array} payload
     * @param {Number} payload.id
     * @param {Number} payload.owner
     * @param {Number} payload.group
     * @param {Number} payload.status
     * @param {String} payload.event
     * @returns {Object|Array} { group: String, owner: String, event: String, value: String|Object, notifier: String }
     */
    unsubscribe(payload: any | any[]): any | any[];
    /**
     * @description get the subscriptions list
     * @param {Object} payload
     * @param {Number} payload.id
     * @param {Number} payload.owner
     * @param {Number} payload.group
     * @param {Number} payload.status
     * @param {String} payload.event
     * @returns {Array} [{ group: String, owner: String, event: String, value: String|Object, notifier: String }]
     */
    subscriptions(payload: {
        id: number;
        owner: number;
        group: number;
        status: number;
        event: string;
    }): any[];
    /**
     * @description get the event list
     * @param {Object} payload
     * @returns {Arrar} [{ name: String, description: String }]
     */
    events(payload: any): Arrar;
    #private;
}
