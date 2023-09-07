const axios = require('axios');
const ksdp = require('ksdp');
const kscryp = require('kscryp');

class MsTeams extends ksdp.integration.Dip {

    constructor() {
        super();
        this.cfg = {
            url: process.env.CHANNEL_URL_OUT
        };
        this.cmd = new ksdp.behavioral.Command();
    }

    configure(cfg) {
        cfg && Object.assign(this.cfg, cfg);
        return this;
    }

    /**
     * @description Register user account
     * @param {Object} payload 
     * @param {String} payload.text 
     * @returns {Boolean} status
     */
    async send(payload, opt) {
        try {
            const url = opt?.url || this.cfg.url;
            const act = "format" + (opt?.format || "Simple");
            payload = this.cmd.run(act, [payload], this);
            await axios({ url, method: 'post', data: payload.result });
            return true;
        }
        catch (error) {
            this.logger?.error({
                flow: opt?.flow || payloadt?.flow,
                src: "KsHook:Connector:MsTeams:send",
                message: error?.message,
                data: arguments
            });
            return false;
        }
    }

    formatSimple(payload) {
        return typeof (payload) === 'string' ? { text: payload } : payload;
    }

    formatMsgCardItem(itm) {
        let name = itm?.name || "Datos";
        let value = kscryp.encode(itm?.value || itm, "json");
        return { name, value }
    }

    formatMsgCardItemObj(itm) {
        let tmp = [];
        for (let i in itm) {
            let name = i;
            let value = kscryp.encode(itm[i], "json");
            tmp.push({ name, value });
        }
        return tmp;
    }

    formatMsgCard(payload) {
        payload = payload || {};
        payload.facts = Array.isArray(payload.facts) ? payload.facts.map(itm => this.formatMsgCardItem(itm)) : this.formatMsgCardItemObj(payload?.facts);

        return {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": payload.themeColor || "0076D7",
            "summary": payload.summary || "AUTH ALERT",
            "sections": payload.sections || [
                {
                    "activityTitle": payload.title || "Messaje title",
                    "activitySubtitle": payload.subtitle || "Messaje subtitle",
                    "text": payload.text || "",
                    "activityImage": payload.image || "",
                    "facts": payload.facts || [{ "name": "Dato 1", "value": "Valor 1" }],
                    "markdown": true
                }
            ]
        }
    }
}

module.exports = MsTeams;