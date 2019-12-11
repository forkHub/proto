export class Template {
	private template: DocumentFragment = null;

	constructor() {
		this.template = document.body.querySelector('template').content;
	}

	private getEl(query: string): HTMLElement {
		return this.template.querySelector(query).cloneNode(true) as HTMLElement;
	}

	get angka1(): HTMLDivElement {
		return this.getEl('div.angka.satu') as HTMLDivElement;
	}

	get angka2(): HTMLDivElement {
		return this.getEl('div.angka.dua') as HTMLDivElement;
	}

	get angka3(): HTMLDivElement {
		return this.getEl('div.angka.tiga') as HTMLDivElement;
	}

	get selesai(): HTMLDivElement {
		return this.getEl('div.selesai') as HTMLDivElement;
	}

	get feedback(): HTMLDivElement {
		return this.getEl('div.feedback') as HTMLDivElement;
	}
}