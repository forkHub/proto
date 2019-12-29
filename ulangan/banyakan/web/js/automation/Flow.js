import { FlowImpl } from './FlowImpl.js';
export class Flow {
    constructor() {
        this.impl = new FlowImpl();
        this.impl.flow = this;
    }
    static create() {
        Flow.inst = new Flow();
        return Flow.inst;
    }
    getTime() { return this.impl.getTime(); }
    // option(opt: any): Flow { return this.impl.option(opt); }
    getPromise() { return this.impl.getPromise(); }
    getSelenium() { return this.impl.getSelenium(); }
    comment(msg) { return this.impl.comment(msg); }
    // navigate(url: string): Flow { return this.impl.navigate(url); }
    combine(reusable, opts = []) { return this.impl.combine(reusable, opts); }
    // runOtherTest(other: BaseStep): Flow { return this.impl.runOtherTest(other); }
    // checkElementEnable(pomParam: string | PomStructure): Flow { return this.impl.checkElementEnable(pomParam); }
    // checkElementVisible(pomParam: string | PomStructure): Flow { return this.impl.checkElementVisible(pomParam); }
    // checkElementLocated(pomParam: string | PomStructure): Flow { return this.impl.checkElementLocated(pomParam); }
    // maximize(): Flow { return this.impl.maximize(); }
    // switchTo(idx: number): Flow { return this.impl.switchTo(idx); }
    // runJs(js: Function): Flow { return this.impl.runJs(js); }
    // hideMask(): Flow { return this.impl.hideMask(); }
    // hideLoading(): Flow { return this.impl.hideLoading(); }
    // killSession(): Flow { return this.impl.killSession(); }
    // login(userName: string = "cccagent", password: string = "cccagent"): Flow { return this.impl.login(userName, password); }
    // click(pomParam: string | PomStructure): Flow { return this.impl.click(pomParam); }
    click(el) { return this.impl.click(el); }
    ;
    // sendKey(pomParam: string | PomStructure, key: string = Key.ENTER): Flow { return this.impl.sendKey(pomParam, key); }
    // write(pomParam: string | PomStructure, str: string = ""): Flow { return this.impl.write(pomParam, str); }
    // browserOpen(browser: string = 'chrome'): Flow { return this.impl.browserOpen(browser); }
    // browserSwitch(browserIdx: number = 0): Flow { return this.impl.browserSwitch(browserIdx); }
    delay(n) { return this.impl.delay(n); }
    delaySec(n) { return this.impl.delaySec(n); }
    delayMin(n) { return this.impl.delayMin(n); }
    // quit(): Flow { return this.impl.quit(); }
    // setOptions(opt?: FlowOption): Flow { return this.impl.setOptions(opt); }
    error(opt) { return this.impl.error(opt); }
}
