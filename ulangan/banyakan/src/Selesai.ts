import { Banyakan } from "./banyakan/Banyakan.js";
import { Dom } from "./Dom.js";

export class Selesai {
	private _view: HTMLDivElement = null;
	private _tombol: HTMLButtonElement = null;
	private nilaiP: HTMLParagraphElement = null;

	constructor() {

	}

	tampil(cont: HTMLDivElement): void {
		cont.appendChild(this._view);
		this.nilaiP.innerHTML = Banyakan.inst.nilai + '';
	}

	init(): void {
		this._view = Banyakan.inst.template.selesai;
		this._tombol = Dom.getEl(this._view, 'button') as HTMLButtonElement;
		this._tombol.onclick = () => {
			this._view.parentElement.removeChild(this._view);
			Banyakan.inst.mulaiLagi();
		}
		this.nilaiP = Dom.getEl(this._view, 'p.nilai') as HTMLParagraphElement;
	}

	public get view(): HTMLDivElement {
		return this._view;
	}
	public set view(value: HTMLDivElement) {
		this._view = value;
	}

	public get tombol(): HTMLButtonElement {
		return this._tombol;
	}
	public set tombol(value: HTMLButtonElement) {
		this._tombol = value;
	}

}