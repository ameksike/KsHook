/**
 * @typedef {import('../types').THook} THook 
 * @typedef {import('../types').TReqEvent} TReqEvent
 * @typedef {import('../types').TResEvent} TResEvent 
 * @typedef {import('../types').TDtaEvent} TDtaEvent 
 */

class KsEvent {
    /**
     * @type {THook|null}
     */
    hook = null;

    /**
     * @description Send MsTeams messages
     * @param {Object} payload 
     * @param {String} [payload.subscriber]
     * @param {Object} [payload.target]
     * @param {TReqEvent|String} [payload.target.value] 
     * @param {TDtaEvent} [payload.data]
     * @returns {*} response 
     */
    run(payload) {
        let event, subscriber, data;
        if (typeof payload?.target?.value === "object") {
            data = payload?.target?.value?.data;
            event = payload?.target?.value?.event;
            subscriber = payload?.target?.value?.subscriber;
        } else {
            event = payload?.target?.value;
            subscriber = payload?.subscriber;
        }
        if (!event) {
            return null;
        }
        const body = {
            subscriber,
            event,
            data: {
                ...payload?.data,
                ...data
            },
        };
        return this.hook?.trigger(body);
    }
}

module.exports = KsEvent;