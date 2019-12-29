import { Flow } from "./Flow.js";
// import { page } from "../data/Page";

export class BaseStep {
	protected flow: Flow;

	constructor() {
		this.flow = new Flow();
	}

	getPromise(): Promise<any> {
		return this.flow.getPromise();
	}

	run(): void {

	}

	// login(userName: string = "cccagent", password: string = "cccagent"): void {
	//     this.flow
	//         .comment("Login to EM")
	//         .write(page.loginPage.inputUserName, userName)
	//         .write(page.loginPage.inputPassword, password)
	//         .click(page.loginPage.btnLogin)
	//         .delaySec(10)
	// }

	// logout(): void {
	//     this.flow
	//         .comment("Logout")
	//         .delay(5000)
	//         .hideLoading()
	//         .click(page.homePage.btnLogout)
	//         .click(page.homePage.dialogConfirmLogout.btnComfirm)
	//         .checkElementLocated(page.logoutPage.btnLoginAgain)
	//         .quit();
	// }

	// warpUp(): void {
	// 	this.flow
	// 		.comment("Warp Up Customer")
	// 		.delay(5000)
	// 		.click(page.agentPage.contextMenu.btnWarpUp)
	// 		.click(page.agentPage.WarpUp.optReasonCode.completed)
	// 		.write(page.agentPage.WarpUp.textAreaNote, "note")
	// 		.click(page.agentPage.WarpUp.btnConfirm)
	// }
}