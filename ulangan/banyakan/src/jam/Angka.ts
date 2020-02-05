import { BaseComponent } from "../BaseComponent.js";
import { Acak } from "../Acak.js";

export class Angka extends BaseComponent {
	private _jam: number = 0;
	private _menit: number = 0;

	constructor() {
		super();
		this._template = `<button class='jam'></button>`;
		this.build();
	}

	acakJam(acak: Acak): void {
		this._jam = acak.get();
		this._menit = acak.get() * 5;
	}

	private padding(str: string): string {
		str = "00" + str;
		str = str.slice(str.length - 2, str.length);
		return str;
	}

	getString(): string {
		return this.padding(this._jam + '') + ':' + this.padding(this.menit + '');
	}

	public get angka(): number {
		return this._jam;
	}
	public set angka(value: number) {
		this._jam = value;
	}
	public get menit(): number {
		return this._menit;
	}
	public set menit(value: number) {
		this._menit = value;
	}

}