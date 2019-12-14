import { Game } from "./Game.js";
import { BaseComponent } from "./BaseComponent.js";

export class Selesai extends BaseComponent {
	private _tombol: HTMLButtonElement = null;
	private _menuTbl: HTMLButtonElement = null;
	private nilaiP: HTMLParagraphElement = null;

	constructor() {
		super();
	}

	init(): void {
		this._elHtml = Game.inst.template.selesai;
		this._tombol = this.getEl('button.mulai') as HTMLButtonElement;
		this._menuTbl = this.getEl('button.menu') as HTMLButtonElement;
		this.nilaiP = this.getEl('p.nilai') as HTMLParagraphElement;
	}

	attach(): void {
		super.attach(Game.inst.cont);
	}

	public set onClick(value: Function) {
		this._tombol.onclick = () => {
			this.detach();
			value();
		}
	}

	public set onMenuClick(value: Function) {
		this._menuTbl.onclick = () => {
			this.detach();
			value();
		}
	}


	public set nilai(value: number) {
		this.nilaiP.innerHTML = value + '';
	}

}