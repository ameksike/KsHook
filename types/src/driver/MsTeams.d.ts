export = MsTeams;
declare const MsTeams_base: typeof import("ksdp/types/src/integration/Dip");
declare class MsTeams extends MsTeams_base {
    cfg: {
        url: string;
    };
    cmd: import("ksdp/types/src/behavioral/Command");
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
