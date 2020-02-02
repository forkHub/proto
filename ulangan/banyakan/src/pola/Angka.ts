import { BaseComponent } from "../BaseComponent.js";

export class Angka extends BaseComponent {
	private _angka: number = 0;
	private _input: HTMLInputElement = null;

	constructor(angka: number = 0) {
		super();
		this._angka = angka;

		this._template = `<input type='number' value='' class='angka'/>`;
		this.build();
		this._input = this._elHtml as HTMLInputElement;
		this._input.value = angka + '';
	}

	public get angka(): number {
		return this._angka;
	}
	public set angka(value: number) {
		this._angka = value;
		this._input.value = value + '';
	}
	public get readonly(): boolean {
		return this._input.readOnly;
	}
	public set readonly(value: boolean) {
		this._input.readOnly = value;
	}
	public get value(): string {
		return (this._input.value);
	}
	public set value(value: string) {
		this._input.value = value + '';
	}

}