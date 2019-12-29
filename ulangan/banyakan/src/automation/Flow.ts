import { SeleniumWrapper } from './SeleniumWrapper.js';
// import { Key } from 'selenium-webdriver';
// import { PomStructure } from './PomStructure';
// import { BaseStep } from './BaseStep';
import { BaseReusable } from "./BaseReusable.js";
import { FlowImpl } from './FlowImpl.js';

export class Flow {
	private static inst: Flow;
	private impl: FlowImpl;

	constructor() {
		this.impl = new FlowImpl();
		this.impl.flow = this;
	}

	static create(): Flow {
		Flow.inst = new Flow();
		return Flow.inst;
	}

	getTime(): number { return this.impl.getTime(); }

	// option(opt: any): Flow { return this.impl.option(opt); }

	getPromise(): Promise<any> { return this.impl.getPromise(); }

	getSelenium(): SeleniumWrapper { return this.impl.getSelenium(); }

	comment(msg: String): Flow { return this.impl.comment(msg); }

	// navigate(url: string): Flow { return this.impl.navigate(url); }

	combine(reusable: BaseReusable, opts: Array<any> = []): Flow { return this.impl.combine(reusable, opts); }

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
	click(el: HTMLElement): Flow { return this.impl.click(el) };

	// sendKey(pomParam: string | PomStructure, key: string = Key.ENTER): Flow { return this.impl.sendKey(pomParam, key); }

	// write(pomParam: string | PomStructure, str: string = ""): Flow { return this.impl.write(pomParam, str); }

	// browserOpen(browser: string = 'chrome'): Flow { return this.impl.browserOpen(browser); }

	// browserSwitch(browserIdx: number = 0): Flow { return this.impl.browserSwitch(browserIdx); }

	delay(n: number): Flow { return this.impl.delay(n); }

	delaySec(n: number): Flow { return this.impl.delaySec(n); }

	delayMin(n: number): Flow { return this.impl.delayMin(n); }

	// quit(): Flow { return this.impl.quit(); }

	// setOptions(opt?: FlowOption): Flow { return this.impl.setOptions(opt); }

	error(opt?: ErrOption): Flow { return this.impl.error(opt); }
}

export interface FlowOption {
	jira?: string

}

export interface ErrOption {
	silent?: boolean
}