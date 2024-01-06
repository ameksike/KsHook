const KsHook = require('..');
describe('Load KsHook Lib', () => {

    beforeAll(async () => { });

    afterAll(async () => { });

    it("valid instance", (done) => {
        expect(KsHook).toBeInstanceOf(Object);
        expect(KsHook.get).toBeInstanceOf(Function);
        expect(KsHook.get()).toBeInstanceOf(Object);
        expect(KsHook.driver.MsTeams).toBeInstanceOf(Function);
        expect(KsHook.driver.Telegram).toBeInstanceOf(Function);
        expect(KsHook.notifier.MsTeams).toBeInstanceOf(Function);
        expect(KsHook.notifier.Telegram).toBeInstanceOf(Function);
        expect(KsHook.notifier.Web).toBeInstanceOf(Function);
        expect(KsHook.subscriber.Model).toBeInstanceOf(Function);
        expect(KsHook.processor.Native).toBeInstanceOf(Function);
        done();
    });
});