import { BaseComponent } from "./src/BaseComponent.js";
import { TombolMenu } from "./Tombol.js";
import { Game } from "./Game.js";
export class Menu extends BaseComponent {
    constructor() {
        super();
        this.puluhanTbl = null;
        this.banyakanTbl = null;
        this.banyakanGambar3Tbl = null;
        this.banyakanAngka2Tbl = null;
        this.banyakanAngka3Tbl = null;
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
        this.banyakanGambar3Tbl = new TombolMenu();
        this.banyakanAngka2Tbl = new TombolMenu();
        this.banyakanAngka3Tbl = new TombolMenu();
    }
    init() {
        this.banyakanTbl.label = 'Membandingkan <br/> dengan gambar';
        this.banyakanTbl.attach(this.cont);
        this.banyakanTbl.onClick = () => {
            this.banyakanClick();
        };
        this.banyakanGambar3Tbl.label = 'Membandingkan <br/> dengan gambar (3 angka)';
        this.banyakanGambar3Tbl.attach(this.cont);
        this.banyakanGambar3Tbl.onClick = () => {
            this.banyakanGambar3Click();
        };
        this.banyakanAngka2Tbl.label = 'Membandingkan <br/> tanpa gambar';
        this.banyakanAngka2Tbl.attach(this.cont);
        this.banyakanAngka2Tbl.onClick = () => {
            this.banyakanAngka2Click();
        };
        this.banyakanAngka3Tbl.label = 'Membandingkan <br/> tanpa gambar (3 angka)';
        this.banyakanAngka3Tbl.attach(this.cont);
        this.banyakanAngka3Tbl.onClick = () => {
            this.banyakanAngka3Click();
        };
        this.puluhanTbl.label = 'Puluhan dan Satuan';
        this.puluhanTbl.attach(this.cont);
        this.puluhanTbl.onClick = () => {
            this.puluhanClick();
        };
    }
    banyakanAngka2Click() {
        console.log('banyakan click gambar 3');
        this.detach();
        Game.inst.banyakan.jmlSoal = 2;
        Game.inst.banyakan.angkaSaja = true;
        Game.inst.banyakan.attach(Game.inst.cont);
        Game.inst.banyakan.mulaiLagi();
    }
    banyakanAngka3Click() {
        console.log('banyakan click gambar 3');
        this.detach();
        Game.inst.banyakan.jmlSoal = 3;
        Game.inst.banyakan.angkaSaja = true;
        Game.inst.banyakan.attach(Game.inst.cont);
        Game.inst.banyakan.mulaiLagi();
    }
    banyakanGambar3Click() {
        console.log('banyakan click gambar 3');
        this.detach();
        Game.inst.banyakan.jmlSoal = 3;
        Game.inst.banyakan.angkaSaja = false;
        Game.inst.banyakan.attach(Game.inst.cont);
        Game.inst.banyakan.mulaiLagi();
    }
    puluhanClick() {
        this.detach();
        Game.inst.puluhan.attach(Game.inst.cont);
        Game.inst.puluhan.mulaiLagi();
    }
    banyakanClick() {
        console.log('banyakan click');
        this.detach();
        Game.inst.banyakan.jmlSoal = 2;
        Game.inst.banyakan.angkaSaja = false;
        Game.inst.banyakan.attach(Game.inst.cont);
        Game.inst.banyakan.mulaiLagi();
    }
}
