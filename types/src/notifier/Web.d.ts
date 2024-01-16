export = Web;
declare class Web {
    constructor(cfg: any);
    cfg: {
        url: string;
        method: string;
    };
    configure(cfg: any): this;
    /**
     * @description execute HTTP notifications for Web Hooks
     * @param {Object} payload
     * @param {Object} payload.target
     * @param {Object|String} payload.target.value
     * @param {Object|String} payload.target.value.url
     * @param {Object|String} payload.target.value.method
     * @param {Object|String} payload.target.value.headers
     * @returns {Object} Promise <{data: Object, status: Number, headers: Object, request: ClientRequest|XMLHttpRequest, config: Object }>
     */
    run(payload: {
        target: {
            value: any | string;
        };
    }): any;
}
