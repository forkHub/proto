export class Dom {
	static getEl(parent: HTMLElement, str: string): HTMLElement {
		let el: HTMLElement = null;

		el = parent.querySelector(str);

		if (!el) {
			console.log(parent);
			console.log(str)
			throw Error();
		}

		return el;
	}
}