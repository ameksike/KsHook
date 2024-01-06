const hook = require('./demo/rule.processor');

describe('trigger', () => {

    it("trigger", async () => {
        const res = hook.trigger({
            subscriber: "Model",
            event: "onProfileFailure",
            data: { failure: 10, flow: "6868465468415", step: "STEP-1" }
        });

        const dta = await res.Model;
        expect(dta[0].target.id).toBe(1);
        expect(dta[1].target.id).toBe(3);
        expect(dta[0].data.flow).toBe("6868465468415");
        expect(dta.length).toBe(2);
    });
});