import { BaseComponent } from "./src/BaseComponent.js";
import { TombolMenu } from "./Tombol.js";
import { Game } from "./Game.js";

export class Menu extends BaseComponent {
	private puluhanTbl: TombolMenu = null;
	private banyakanTbl: TombolMenu = null;
	private cont: HTMLDivElement = null;

	constructor() {
		super();
		this._template = `
			<div class='menu'>
				<p>Belajar Matematika Tingkat Dasar</p>
				<div class='cont'>
				</div>
			</div>
		`;

		this.build();
		this.cont = this.getEl('div.cont') as HTMLDivElement;

		this.puluhanTbl = new TombolMenu();
		this.banyakanTbl = new TombolMenu();
	}

	init(): void {
		this.puluhanTbl.label = 'Puluhan dan Satuan';
		this.puluhanTbl.onClick = () => {
			this.puluhanClick();
		}
		this.puluhanTbl.attach(this.cont);

		this.banyakanTbl.label = 'Membandingkan';
		this.banyakanTbl.attach(this.cont);
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