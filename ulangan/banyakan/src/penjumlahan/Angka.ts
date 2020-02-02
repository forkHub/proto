import { BaseComponent } from "../BaseComponent.js";

export class Angka extends BaseComponent {
	private _angka: number = 0;
	private _input: HTMLInputElement = null;
	public get input(): HTMLInputElement {
		return this._input;
	}

	constructor(html: HTMLElement) {
		super();
		this._elHtml = html;
		this._input = this._elHtml as HTMLInputElement;
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