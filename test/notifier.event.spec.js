const hook = require('./demo/rule.processor');

describe('Notifier Event', () => {

    beforeAll(() => {
        // onUserFailure -> onUserFake
        hook.subscribe({
            subscriber: "Model",
            event: "onUserFailure",
            notifier: "Event",
            value: "onUserFake",
            status: 1
        });

        // onUserFailure -> onUserFake -> user_fake_level_1
        hook.subscribe({
            subscriber: "Model",
            event: "onUserFake",
            notifier: "locator",
            value: "user_fake_level_1",
            processor: "Native",
            expression: "val EQUAL 5",
            status: 1
        });

        // onUserFailure -> onUserFake -> onUserFake 
        hook.subscribe({
            subscriber: "Model",
            event: "onUserFake",
            notifier: "Event",
            value: {
                subscriber: "Model",
                event: "onUserFake",
                data: { val: 10, mix: 12 }
            },
            status: 1,
            processor: "Native",
            expression: "val EQUAL 5",
        });

        // onUserFailure -> onUserFake -> onUserFake -> user_fake_level_2
        hook.subscribe({
            subscriber: "Model",
            event: "onUserFake",
            notifier: "locator",
            value: "user_fake_level_2",
            status: 1,
            processor: "Native",
            expression: "val EQUAL 10",
        });
    });

    it("hierarchical event trigger", async () => {
        const res = hook.trigger({
            subscriber: "Model",
            event: "onUserFailure",
            data: { fai: 11, val: 5 }
        });

        const dta_level_1 = await res.Model;
        const dta_level_2 = await dta_level_1[0].Model;
        const dta_level_3 = await dta_level_2[1].Model;

        expect(dta_level_1.length).toBe(1);
        expect(dta_level_2.length).toBe(2);
        expect(dta_level_3.length).toBe(1);
        
        expect(dta_level_1[0].Model).toBeInstanceOf(Promise);

        expect(dta_level_2[1].Model).toBeInstanceOf(Promise);
        expect(dta_level_2[0].target.value).toBe("user_fake_level_1");
        expect(dta_level_2[0].data.val).toBe(5);
        expect(dta_level_2[0].data.fai).toBe(11);
        expect(dta_level_2[0].data.mix).toBe(undefined);

        expect(dta_level_3[0].data.val).toBe(10);
        expect(dta_level_3[0].data.fai).toBe(11);
        expect(dta_level_3[0].data.mix).toBe(12);
        expect(dta_level_3[0].target.value).toBe("user_fake_level_2");
    });

});