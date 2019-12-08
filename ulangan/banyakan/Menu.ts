import { BaseComponent } from "./src/BaseComponent.js";
import { TombolMenu } from "./Tombol.js";
import { Game } from "./Game.js";

export class Menu extends BaseComponent {
	private puluhanTbl: TombolMenu = null;
	private banyakanTbl: TombolMenu = null;

	constructor() {
		super();
		this._template = `
			<div class='menu'>

			</div>
		`;

		this.puluhanTbl = new TombolMenu();
		this.banyakanTbl = new TombolMenu();
	}

	init(): void {
		this.puluhanTbl.label = 'Puluhan Satuan';
		this.puluhanTbl.onClick = () => {
			this.puluhanClick();
		}
		this.puluhanTbl.attach(this._elHtml);

		this.banyakanTbl.label = 'Membandingkan';
		this.banyakanTbl.attach(this._elHtml);
		this.banyakanTbl.attach(this._elHtml)
	}

	puluhanClick(): void {
		this.detach();
		Game.inst.puluhan.attach(Game.inst.cont);
	}

	banyakanMulai(): void {
		this.detach();
		this.banyakanTbl.onClick = () => {
			Game.inst.banyakan.pageCont.attach(Game.inst.cont);
		}

	}
}