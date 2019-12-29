export class SeleniumWrapper {

	static create(): SeleniumWrapper {
		return new SeleniumWrapper();
	}

	constructor() {

	}

	async waitTime(n: number): Promise<any> {
		return new Promise<any>((resolve) => {
			setTimeout(() => {
				resolve();
			}, n);
		});
	}

}