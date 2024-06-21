const kscryp = require('kscryp');
class KsReq {

    /**
     * @param {*} payload 
     * @param {*} headers 
     * @param {*} options 
     * @returns 
     */
    get(payload, headers = {}, options = {}) {
        return this.run(payload, headers, options);
    }

    /**
     * @param {*} payload 
     * @param {*} headers 
     * @param {*} options 
     * @returns 
     */
    post(payload, headers = {}, options = {}) {
        payload = (typeof payload === 'string' ? { url: payload } : payload) || {};
        payload.method = 'POST';
        return this.run(payload, headers, options);
    }

    /**
     * @param {*} payload 
     * @param {*} headers 
     * @param {*} options 
     * @returns 
     */
    put(payload, headers = {}, options = {}) {
        payload = (typeof payload === 'string' ? { url: payload } : payload) || {};
        payload.method = 'PUT';
        return this.run(payload, headers, options);
    }

    /**
     * @param {*} payload 
     * @param {*} headers 
     * @param {*} options 
     * @returns 
     */
    delete(payload, headers = {}, options = {}) {
        payload = (typeof payload === 'string' ? { url: payload } : payload) || {};
        payload.method = 'DELETE';
        return this.run(payload, headers, options);
    }

    /**
     * @param {*} payload 
     * @param {*} headers 
     * @param {*} options 
     * @returns 
     */
    async run(payload, headers = {}, options = {}) {
        try {
            payload = typeof payload === 'string' ? { url: payload } : payload;
            const opts = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                ...options
            };

            if (payload.method && ['POST', 'PUT'].includes(payload.method)) {
                opts.method = payload.method;
                opts.body = kscryp.encode(payload.data, 'json');
            }
            /** @type {any} */
            const drv = this.handler();
            const response = await drv.req(payload.url, opts);
            const data = drv.type === 'fetch' ? await response.json() : response.data;
            return { data };
        }
        catch (error) {
            return {
                error,
                payload,
                headers,
                options,
                version: process.version
            }
        }
    }

    handler() {
        try {
            return {
                type: 'fetch',
                req: fetch
            };
        }
        catch (error) {
            return {
                type: 'axios',
                req: require('axios')
            }
        }
    }
}

module.exports = KsReq;
