import { BaseComponent } from "./BaseComponent.js";
class Data {
    get popupAktif() {
        return this._popupAktif;
    }
    set popupAktif(value) {
        this._popupAktif = value;
    }
    get menuAktif() {
        return this._menuAktif;
    }
    set menuAktif(value) {
        this._menuAktif = value;
    }
    get anggotaAwal() {
        return this._anggotaAwal;
    }
    set anggotaAwal(value) {
        this._anggotaAwal = value;
    }
}
export var data = new Data();
// export const file: string = 'silsilah07';
export const file2 = 'silsilah08';
export class KotakView extends BaseComponent {
    // private _anggota: IAnggota;
    // public get anggota(): IAnggota {
    // 	return this._anggota;
    // }
    constructor() {
        super();
        this._template = `
			<div class='kotak'>
				<div class='hubung-cont'>

				</div>
				<div class='cont-pasangan padding'>
					<div class='suami normal'></div>
					<div class='istri normal'></div>
				</div>
				<div class='anak'>
		
				</div>
			</div>
		`;
        this.build();
    }
    get hubungCont() {
        return this.getEl('div.hubung-cont');
    }
    get pasanganCont() {
        return this.getEl('div.cont-pasangan');
    }
    get suamiCont() {
        return this.getEl('div.cont-pasangan div.suami');
    }
    get istriCont() {
        return this.getEl('div.cont-pasangan div.istri');
    }
    get anakCont() {
        return this.getEl('div.anak');
    }
}
export class Foto extends BaseComponent {
    constructor() {
        super();
        this._template = `
		<div class='foto inline'>
			<div class='padding'>

				<div class='info'>
					<div class='foto'> 
						<img src='./gbr/kosong.png'/>
					</div>
					<div class='nama '></div>
				</div>

				<div class='menu relative'>
					<button class='menu'>|||</button>
					<div class='menu-popup padding absolute border'>
						<button class='hapus block'>hapus</button>
						<button class='pasangan block'>tambah pasangan</button>
						<button class='anak block'>tambah anak</button>
						<button class='profile block'>edit profile</button>
						<button class='debug block'>debug</button>
					</div>
				</div>
			<div>
		</div>`;
        this.build();
    }
    get hapusTbl() {
        return this.getEl('div.padding div.menu div.menu-popup button.hapus');
    }
    get tambahPasanganTbl() {
        return this.getEl('div.padding div.menu div.menu-popup button.pasangan');
    }
    get tambahAnakTbl() {
        return this.getEl('div.padding div.menu div.menu-popup button.anak');
    }
    get debugTbl() {
        return this.getEl('div.padding div.menu div.menu-popup button.debug');
    }
    get profileTbl() {
        return this.getEl('div.padding div.menu div.menu-popup button.profile');
    }
    get namaDiv() {
        return this.getEl('div.nama');
    }
    get infoDiv() {
        return this.getEl('div.info');
    }
    get menuDiv() {
        return this.getEl('div.menu');
    }
    get menuPopupDiv() {
        return this.getEl('div.menu-popup');
    }
    get tombolMenuBtn() {
        return this.menuDiv.querySelector('button.menu');
    }
}
export class Tambah extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='tambah-anak'>
				<div class='hubung-cont'>

				</div>
				<div class='padding'>
					<button class='tambah'>tambah<br/>anak</button>
				</div>
			</div>
		`;
        this.build();
    }
    get hubungCont() {
        return this.getEl('div.hubung-cont');
    }
    get tambahTbl() {
        return this.getEl('button.tambah');
    }
}
export class TambahPasangan extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='tambah'>
				<div class='padding'>
					<button class='tambah'>tambah<br/>pasangan</button>
				</div>
			</div>
		`;
        this.build();
    }
    get tambahTbl() {
        return this.getEl('button.tambah');
    }
}
export class Hubung extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='hubung'>
				<div class='kiri'></div>
				<div class='kanan'></div>
			</div>
		`;
        this.build();
    }
    get hubungDiv() {
        return this.getEl('div.hubung');
    }
    get kanan() {
        return this.getEl('div.hubung div.kanan');
    }
    get kiri() {
        return this.getEl('div.hubung div.kiri');
    }
}
