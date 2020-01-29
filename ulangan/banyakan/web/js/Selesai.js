import { BaseComponent } from "./BaseComponent.js";
export class Selesai extends BaseComponent {
    constructor() {
        super();
        this._mulaiTbl = null;
        this._menuTbl = null;
        this.nilaiP = null;
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
    init() {
        // this._elHtml = Game.inst.template.selesai;
        this._mulaiTbl = this.getEl('button.mulai');
        this._menuTbl = this.getEl('button.menu');
        this.nilaiP = this.getEl('p.nilai');
    }
    set onMulaiClick(value) {
        this._mulaiTbl.onclick = () => {
            this.detach();
            value();
        };
    }
    set onMenuClick(value) {
        this._menuTbl.onclick = () => {
            this.detach();
            value();
        };
    }
    set nilai(value) {
        this.nilaiP.innerHTML = value + '';
    }
}
