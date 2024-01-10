const hook = require('./demo/rule.processor');

describe('Processor', () => {

    it("common processor", async () => {
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

    it("custom processor", async () => {
        const res = hook.trigger({
            subscriber: "Model",
            event: "onLoginFailure",
            data: { failure: 10, max: 11, min: 5 }
        });

        const dta = await res.Model;
        expect(dta[0].target.id).toBe(4);
        expect(dta[0].target.processor).toBe("Custom");
        expect(dta[0].target.expression).toBe("failure = 10");
        expect(dta[0].data.max).toBe(11);
        expect(dta[0].data.min).toBe(5);
        expect(dta[0].data.failure).toBe(10);
        expect(dta.length).toBe(1);
    });
});