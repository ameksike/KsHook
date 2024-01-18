export = Model;
declare class Model {
    cfg: {
        model: {
            hook: {
                name: string;
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
            };
            event: {
                name: string;
                attr: {
                    id: string;
                    event: string;
                    description: string;
                    payload: string;
                    group: string;
                };
            };
        };
    };
    /**
     * @description Configure the model subscriber lib
     * @param {Object} options
     * @param {List} [options.models] DaoModel list
     * @param {Object} [options.driver] db connection or DaoManager instance
     * @param {Object} [options.manager] db manager or DaoManager class
     * @param {Console} [options.logger] log handler
     * @param {Object} [options.cfg]
     * @param {Object} [options.cfg.model] Model metadata
     * @param {MetaHook} [options.cfg.model.hook] Hook Model metadata
     * @param {MetaEvent} [options.cfg.model.event] Event Model metadata
     * @returns {Model} self reference
     */
    configure(options: {
        models?: {
            [name: string]: any;
        };
        driver?: any;
        manager?: any;
        logger?: Console;
        cfg?: {
            model?: {
                hook?: {
                    name: string;
                    attr: {
                        id?: string | number;
                        event: string;
                        notifier: string;
                        value: string;
                        owner?: string;
                        group?: string;
                        status?: string;
                        processor?: string;
                        expression?: string;
                        subscriber?: string;
                    };
                };
                event?: {
                    name: string;
                    attr: {
                        id?: string;
                        event: string;
                        description: string;
                        payload?: string;
                        status?: string;
                    };
                };
            };
        };
    }): Model;
    /**
     * @param {*} payload
     * @returns {*}
     */
    format(payload: any): any;
    /**
     * @description save subscriptions
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} succeed subscriptions
     */
    subscribe(payload: {
        id?: string | number;
        event: string;
        notifier: string;
        value: string;
        owner?: string;
        group?: string;
        status?: string;
        processor?: string;
        expression?: string;
        subscriber?: string;
    } | {
        id?: string | number;
        event: string;
        notifier: string;
        value: string;
        owner?: string;
        group?: string;
        status?: string;
        processor?: string;
        expression?: string;
        subscriber?: string;
    }[]): {
        id?: string | number;
        event: string;
        notifier: string;
        value: string;
        owner?: string;
        group?: string;
        status?: string;
        processor?: string;
        expression?: string;
        subscriber?: string;
    } | {
        id?: string | number;
        event: string;
        notifier: string;
        value: string;
        owner?: string;
        group?: string;
        status?: string;
        processor?: string;
        expression?: string;
        subscriber?: string;
    }[];
    /**
     * @description remove subscriptions
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} succeed unsubscriptions
     */
    unsubscribe(payload: {
        id?: string | number;
        event: string;
        notifier: string;
        value: string;
        owner?: string;
        group?: string;
        status?: string;
        processor?: string;
        expression?: string;
        subscriber?: string;
    } | {
        id?: string | number;
        event: string;
        notifier: string;
        value: string;
        owner?: string;
        group?: string;
        status?: string;
        processor?: string;
        expression?: string;
        subscriber?: string;
    }[]): {
        id?: string | number;
        event: string;
        notifier: string;
        value: string;
        owner?: string;
        group?: string;
        status?: string;
        processor?: string;
        expression?: string;
        subscriber?: string;
    } | {
        id?: string | number;
        event: string;
        notifier: string;
        value: string;
        owner?: string;
        group?: string;
        status?: string;
        processor?: string;
        expression?: string;
        subscriber?: string;
    }[];
    /**
     * @description get the subscriptions list
     * @param {List} payload
     * @returns {Array<Subscription>}
     */
    subscriptions(payload: {
        [name: string]: any;
    }): {
        id?: string | number;
        event: string;
        notifier: string;
        value: string;
        owner?: string;
        group?: string;
        status?: string;
        processor?: string;
        expression?: string;
        subscriber?: string;
    }[];
    /**
     * @description get the event list
     * @param {List} payload
     * @returns {Array<Event>}
     */
    events(payload: {
        [name: string]: any;
    }): {
        id?: string;
        event: string;
        description: string;
        payload?: string;
        status?: string;
    }[];
    #private;
}
