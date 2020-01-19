export class Angka {
	private _angka: number = 0;
	private _view: HTMLDivElement = null;

	//TODO: pakai sharing resource
	private icons: Array<string> = [
		"&#127799", "&#127800", "&#127801", "&#127802", "&#127803",
		"&#127804", "&#127805", "&#127806", "&#127807", "&#127808",
		"&#127809", "&#127810", "&#127811", "&#127812", "&#127813",
		"&#127814", "&#127815", "&#127816", "&#127817", "&#127818",
		"&#127819", "&#127820", "&#127821", "&#127822", "&#127823",
		"&#127824", "&#127825", "&#127826", "&#127827", "&#127828",
		"&#127829", "&#127830"
	]

	constructor() {

	}

	tulis(angkaSaja: boolean): void {
		let str: string = '';
		let idx: number = 0;
		let icon: string = '';

		idx = Math.floor(Math.random() * this.icons.length);
		icon = this.icons[idx];

		for (let i: number = 0; i < this._angka; i++) {
			str += icon;
		}
		str += "<br/>(" + this._angka + ")";

		if (angkaSaja) {
			str = this._angka + '';
		}

		this._view.innerHTML = str;
	}

	public get angka(): number {
		return this._angka;
	}
	public set angka(value: number) {
		this._angka = value;
	}
	public get view(): HTMLDivElement {
		return this._view;
	}
	public set view(value: HTMLDivElement) {
		this._view = value;
	}

}