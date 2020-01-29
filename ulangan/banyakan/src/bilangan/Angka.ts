import { BaseComponent } from "../BaseComponent.js";

export class Angka extends BaseComponent {
	private _angka: number = 0;
	private _angkaClick: Function = null;

	constructor(angka: number = 0) {
		super();
		this._angka = angka;

		this._template = `
			<button class='angka putih'>
				<button class='angka'><span class='angka'></span></button>
			</button>
		`;
		this.build();

		this.elHtml.onclick = () => {
			this.onclick();
		}
	}

	private onclick(): void {
		this._angkaClick(this);
	}

	public get angka(): number {
		return this._angka;
	}
	public set angka(value: number) {
		this._angka = value;
		this._elHtml.innerText = value + '';
	}
	public set angkaClick(value: Function) {
		this._angkaClick = value;
	}


}