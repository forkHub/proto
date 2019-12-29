import { BaseComponent } from "../BaseComponent.js";
// import { Dom } from "../Dom.js";

export class Angka extends BaseComponent {
	private _angka: number = 0;
	private _tempat: AngkaEnum = AngkaEnum.SUMBER;
	private _angkaClick: Function = null;

	constructor(angka: number = 0) {
		super();
		this._angka = angka;
		this.elHtml = document.body.querySelector('template').content.querySelector('button.angka').cloneNode(true) as HTMLDivElement;
		this.elHtml.onclick = () => {
			// console.log('click');
			this.onclick();
		}
		this._tempat = AngkaEnum.SUMBER;
	}

	private onclick(): void {
		// console.log('on click');

		// if (this._tempat === AngkaEnum.SUMBER) {
		// 	this._tempat = AngkaEnum.TARGET;
		// }
		// else if (AngkaEnum.TARGET == this._tempat) {
		// 	this._tempat = AngkaEnum.SUMBER;
		// }
		// else {
		// 	throw new Error();
		// }

		// console.log(this.tempat);
		this._angkaClick(this);
	}

	public get tempat(): AngkaEnum {
		return this._tempat;
	}
	public set tempat(value: AngkaEnum) {
		this._tempat = value;
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

export enum AngkaEnum {
	TARGET,
	SUMBER
}