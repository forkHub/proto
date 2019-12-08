import { BaseComponent } from "./src/BaseComponent.js";
import { TombolMenu } from "./Tombol.js";
import { Game } from "./Game.js";
export class Menu extends BaseComponent {
    constructor() {
        super();
        this.puluhanTbl = null;
        this.banyakanTbl = null;
        this._template = `
			<div class='menu'>

			</div>
		`;
        this.puluhanTbl = new TombolMenu();
        this.banyakanTbl = new TombolMenu();
    }
    init() {
        this.puluhanTbl.label = 'Puluhan Satuan';
        this.puluhanTbl.onClick = () => {
            this.puluhanClick();
        };
        this.puluhanTbl.attach(this._elHtml);
        this.banyakanTbl.label = 'Membandingkan';
        this.banyakanTbl.attach(this._elHtml);
        this.banyakanTbl.attach(this._elHtml);
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
