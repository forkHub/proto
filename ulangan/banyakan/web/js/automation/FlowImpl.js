import { SeleniumWrapper } from './SeleniumWrapper.js';
export class FlowImpl {
    constructor() {
        // private _waitTime: number = 60 * 1000;
        this._flDebug = false;
        this._p = Promise.resolve();
        this._sc = SeleniumWrapper.create();
        // this._opt = {
        // 	jira: 'nnnn'
        // };
    }
    getTime() {
        let date;
        date = new Date();
        return date.getMilliseconds();
    }
    // option(opt: any): Flow {
    // 	if (opt.waitTime) {
    // 		this._waitTime = opt.waitTime;
    // 	}
    // 	return this._flow;
    // }
    log(msg) {
        if (this._flDebug) {
            console.log(msg);
        }
    }
    debug() {
        try {
            throw new Error("");
        }
        catch (e) {
            console.log(e);
        }
    }
    // private getLocator(pom: PomStructure): webdriver.Locator {
    // 	if (pom.xpath) {
    // 		return By.xpath(pom.xpath);
    // 	}
    // 	else if (pom.css) {
    // 		return By.css(pom.css);
    // 	}
    // 	else {
    // 		throw new Error("invalid pom data");
    // 	}
    // }
    strToPom(str) {
        if (str.startsWith("//", 0))
            return { name: "", xpath: str };
        if (str.startsWith("/"))
            return { name: "", xpath: str };
        if (str.startsWith("("))
            return { name: "", xpath: str };
        return { name: "", css: str };
    }
    getPromise() {
        return this._p;
    }
    getSelenium() {
        return this._sc;
    }
    comment(msg) {
        this._p = this._p.then(() => {
            console.log("");
            console.log(msg);
        });
        return this._flow;
    }
    // navigate(url: string): Flow {
    // 	this._p = this._p.then((res) => {
    // 		this.log("");
    // 		this.log("navigate to " + url);
    // 		this.lastUrl = url;
    // 		return this._sc.navigate(url);
    // 	});
    // 	return this._flow;
    // }
    combine(reusable, opts = []) {
        reusable.run(this._flow, opts);
        return this._flow;
    }
    // runOtherTest(other: BaseStep): Flow {
    // 	this._p = this._p.then(() => {
    // 		return this._sc.runOther(other);
    // 	});
    // 	return this._flow;
    // }
    // checkElementEnable(pomParam: string | PomStructure): Flow {
    // 	let pom: PomStructure;
    // 	pom = (typeof pomParam == "string") ? this.strToPom(pomParam) : pomParam as PomStructure;
    // 	this._p = this._p.then((res) => {
    // 		this.log("");
    // 		this.log("check element enabled: " + pom.name);
    // 		let locator: webdriver.Locator;
    // 		locator = this.getLocator(pom);
    // 		return this._sc.waitElementEnable(locator, this._waitTime);
    // 	});
    // 	return this._flow;
    // }
    // checkElementVisible(pomParam: string | PomStructure): Flow {
    // 	let pom: PomStructure;
    // 	pom = (typeof pomParam == "string") ? this.strToPom(pomParam) : pomParam as PomStructure;
    // 	this._p = this._p.then(() => {
    // 		this.log("");
    // 		this.log("check element visible [" + pom.name + "]");
    // 		let locator: webdriver.Locator;
    // 		locator = this.getLocator(pom);
    // 		return this._sc.waitElementVisible(locator, this._waitTime);
    // 	});
    // 	return this._flow;
    // }
    // checkElementLocated(pomParam: string | PomStructure): Flow {
    // 	let pom: PomStructure;
    // 	pom = (typeof pomParam == "string") ? this.strToPom(pomParam) : pomParam as PomStructure;
    // 	this._p = this._p.then(() => {
    // 		this.log("");
    // 		this.log("check element located [" + pom.name + "]");
    // 		let locator: webdriver.Locator;
    // 		locator = this.getLocator(pom);
    // 		return this._sc.waitElement(locator, this._waitTime);
    // 	});
    // 	return this._flow;
    // }
    // maximize(): Flow {
    // 	this._p = this._p.then(() => {
    // 		return this._sc.getCurrentDriver().manage().window().maximize();
    // 	});
    // 	return this._flow;
    // }
    // switchTo(idx: number): Flow {
    // 	this._p = this._p.then(() => {
    // 		return this._sc.switchTo(idx);
    // 	});
    // 	return this._flow;
    // }
    // runJs(js: Function): Flow {
    // 	this._p = this._p.then(() => {
    // 		return this._sc.getCurrentDriver().executeScript(js);
    // 	});
    // 	return this._flow;
    // }
    // hideMask(): Flow {
    // 	this.runJs(() => {
    // 		let el: HTMLElement = document.querySelector("div.mask");
    // if(el) {
    // 			el.style.display = 'none';
    // 		}
    // 		else {
    // 			console.log("not found");
    // 		}
    // 	});
    // 	return this._flow;
    // }
    // hideLoading(): Flow {
    // 	this.runJs(() => {
    // 		let el: HTMLElement = document.querySelector("div#GTMainGlass.GTInvisibleGlass");
    // 		if (el) {
    // 			el.style.display = 'none';
    // 		}
    // 		else {
    // 			console.log("not found");
    // 		}
    // 	});
    // 	return this._flow;
    // }
    // killSession(): Flow {
    // 	this._p = this._p.then((res) => {
    // 		console.log('kill session');
    // 		return this._sc.navigate(this.lastUrl + "?killSession");
    // 	});
    // 	this.checkElementLocated(page.loginPage.btnLogin);
    // 	this.error();
    // 	return this._flow;
    // }
    // login(userName: string = "cccagent", password: string = "cccagent"): Flow {
    // this.comment("Login to EM")
    // .write(page.loginPage.inputUserName, userName)
    // .write(page.loginPage.inputPassword, password)
    // .click(page.loginPage.btnLogin)
    // 		.delaySec(10)
    // 	return this._flow;
    // }
    // click(pomParam: string | PomStructure): Flow {
    // 	let pom: PomStructure;
    // 	pom = (typeof pomParam == "string") ? this.strToPom(pomParam) : pomParam as PomStructure;
    // 	this.delay(1000);
    // 	this.checkElementVisible(pom);
    // 	this.checkElementEnable(pom);
    // 	this.hideLoading();
    // 	this._p = this._p.then(() => {
    // 		this.log("");
    // 		this.log("click element  [" + pom.name + "]");
    // 		return this._sc.click(this.getLocator(pom), this._waitTime);
    // 	});
    // 	return this._flow;
    // }
    click(e) {
        this.delay(1000);
        this._p = this._p.then(() => {
            this.log("click element  [" + e + "]");
            e.click();
            return Promise.resolve();
        });
        return this._flow;
    }
    // sendKey(pomParam: string | PomStructure, key: string = Key.ENTER): Flow {
    // 	let pom: PomStructure;
    // 	pom = (typeof pomParam == "string") ? this.strToPom(pomParam) : pomParam as PomStructure;
    // 	this.delay(1000);
    // 	this.checkElementLocated(pom);
    // 	this.checkElementVisible(pom);
    // 	this.checkElementEnable(pom);
    // 	this._p = this._p.then(() => {
    // 		this.log("");
    // 		this.log("write to element [" + pom.name + "] message: " + key);
    // 		let locator: webdriver.Locator = this.getLocator(pom);
    // 		return this._sc.write(locator, key);
    // 	});
    // 	return this._flow;
    // }
    // write(pomParam: string | PomStructure, str: string = ""): Flow {
    // 	let pom: PomStructure;
    // 	pom = (typeof pomParam == "string") ? this.strToPom(pomParam) : pomParam as PomStructure;
    // 	this.delay(1000);
    // 	this.checkElementLocated(pom);
    // 	this.checkElementVisible(pom);
    // 	this.checkElementEnable(pom);
    // 	this._p = this._p.then(() => {
    // 		this.log("");
    // 		this.log("write to element [" + pom.name + "] message: " + str);
    // 		let locator: webdriver.Locator = this.getLocator(pom);
    // 		return this._sc.write(locator, str);
    // 	});
    // 	return this._flow;
    // }
    // browserOpen(browser: string = 'chrome'): Flow {
    // 	this._p = this._p.then((res) => {
    // 		if (browser == 'chrome') {
    // 			return this._sc.createBrowserChrome();
    // 		}
    // 		else {
    // 			return this._sc.createBrowserFirefox();
    // 		}
    // 	});
    // 	return this._flow;
    // }
    // browserSwitch(browserIdx: number = 0): Flow {
    // 	this._p = this._p.then(() => {
    // 		this._sc.switchDriverByIdx(browserIdx);
    // 	});
    // 	return this._flow;
    // }
    delay(n) {
        this._p = this._p.then(() => {
            this.log("");
            this.log("delay for " + n + " millisecs");
            return this._sc.waitTime(n);
        });
        return this._flow;
    }
    delaySec(n) {
        this.delay(n * 1000);
        return this._flow;
    }
    delayMin(n) {
        let i = 0;
        for (i = 0; i < n * 6; i++) {
            this.delaySec(10);
        }
        return this._flow;
    }
    // quit(): Flow {
    // 	this._p = this._p.catch((err: any) => {
    // 		console.log("JIRA " + this._opt.jira);
    // 		console.log(err);
    // 	});
    // 	this.killSession();
    // 	this.error();
    // 	this._p = this._p
    // 		.then((res) => {
    // 			return this._sc.quit();
    // 		})
    // 		.catch(() => {
    // 		});
    // 	return this._flow;
    // }
    // //TODO: finish this
    // setOptions(opt?: FlowOption): Flow {
    // 	return this._flow;
    // }
    error(opt) {
        this._p = this._p.catch(err => {
            if (!opt) {
                opt = {
                    silent: false
                };
            }
            if (!opt.silent) {
                console.log("");
                console.log("ups something happens ");
                console.log(err);
            }
            return Promise.resolve();
        });
        return this._flow;
    }
    get flow() {
        return this._flow;
    }
    set flow(value) {
        this._flow = value;
    }
}
