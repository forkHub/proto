import { BaseComponent } from "./src/BaseComponent.js";
import { TombolMenu } from "./Tombol.js";
import { Game } from "./Game.js";
export class Menu extends BaseComponent {
    constructor() {
        super();
        this.puluhanTbl = null;
        this.banyakanTbl = null;
        this.cont = null;
        this._template = `
			<div class='menu'>
				<p>Belajar Matematika Tingkat Dasar</p>
				<div class='cont'>
				</div>
			</div>
		`;
        this.build();
        this.cont = this.getEl('div.cont');
        this.puluhanTbl = new TombolMenu();
        this.banyakanTbl = new TombolMenu();
    }
    init() {
        this.puluhanTbl.label = 'Puluhan dan Satuan';
        this.puluhanTbl.onClick = () => {
            this.puluhanClick();
        };
        this.puluhanTbl.attach(this.cont);
        this.banyakanTbl.label = 'Membandingkan';
        this.banyakanTbl.attach(this.cont);
    }
    puluhanClick() {
        this.detach();
        Game.inst.puluhan.attach(Game.inst.cont);
    }
    banyakanMulai() {
        this.detach();
        this.banyakanTbl.onClick = () => {
            Game.inst.banyakan.pageCont.attach(Game.inst.cont);
        };
    }
}
