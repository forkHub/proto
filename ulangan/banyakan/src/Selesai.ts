import { BaseComponent } from "./BaseComponent.js";

export class Selesai extends BaseComponent {
	private _mulaiTbl: HTMLButtonElement = null;
	private _menuTbl: HTMLButtonElement = null;
	private nilaiP: HTMLParagraphElement = null;

	constructor() {
		super();
		this._template = `
			<div class='selesai'>
				<h1>&#127942</h1>
				<h1>Selesai!</h1>
				<p class='nilai'>

				</p>
				<button class='selesai mulai normal'>
					Mulai Lagi
				</button>
				<button class='selesai menu normal'>
					Menu Utama
				</button>
			</div>
		`;
		this.build();
	}

	init(): void {
		// this._elHtml = Game.inst.template.selesai;
		this._mulaiTbl = this.getEl('button.mulai') as HTMLButtonElement;
		this._menuTbl = this.getEl('button.menu') as HTMLButtonElement;
		this.nilaiP = this.getEl('p.nilai') as HTMLParagraphElement;
	}

	public set onMulaiClick(value: Function) {
		this._mulaiTbl.onclick = () => {
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