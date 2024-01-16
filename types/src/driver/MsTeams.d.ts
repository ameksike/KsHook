export = MsTeams;
declare class MsTeams {
    cfg: {
        url: string;
    };
    cmd: any;
    configure(cfg: any): this;
    /**
     * @description Register user account
     * @param {Object} payload
     * @param {String} payload.text
     * @returns {Boolean} status
     */
    send(payload: {
        text: string;
    }, opt: any, ...args: any[]): boolean;
    formatSimple(payload: any): any;
    formatMsgCardItem(itm: any): {
        name: any;
        value: any;
    };
    formatMsgCardItemObj(itm: any): {
        name: string;
        value: any;
    }[];
    formatMsgCard(payload: any): {
        "@type": string;
        "@context": string;
        themeColor: any;
        summary: any;
        sections: any;
    };
}
