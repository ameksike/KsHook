class KsEvent {
    /**
     * Represents an HTTP client request.
     * @typedef {import('http').ClientRequest} ClientRequest
     */

    /**
     * Represents an XMLHttpRequest object.
     * @typedef {XMLHttpRequest} XMLHttpRequest
     */

    /**
     * @description Trigger event Hooks
     * @param {Object} payload 
     * @param {Object} payload.target
     * @param {Object|String} payload.target.value 
     * @param {String} payload.target.value.event
     * @param {Object|String} payload.target.value.subscriber
     * @param {Object} payload.target.value.data
     * @returns {Promise <{data: Object, status: Number, headers: Object, request: ClientRequest|XMLHttpRequest, config: Object }>} 
     */
    run(payload) {
        const event = payload?.target?.value?.event || payload?.target?.value;
        const subscriber = payload?.target?.value?.subscriber || payload?.subscriber;
        const data = payload?.target?.value?.data;
        const body = {
            subscriber,
            event,
            data: {
                ...payload?.data,
                ...data
            },
        };
        return this.hook.trigger(body);
    }
}

module.exports = KsEvent;