import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
// import { Kons } from "../Kons.js";
export class Foto extends BaseComponent {
    constructor() {
        super();
        this._elHtml = Util.getTemplate('div#foto');
        this.lihatTbl.onclick = (e) => {
            e.stopPropagation();
            console.log('edit tbl click');
            Util.bukaEditProfile(this._anggota.id, window.top.location.href);
        };
        this.utamaTbl.onclick = (e) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
            window.top.location.href = Util.urlHome + "?id=" + this._anggota.id;
        };
    }
    init() {
    }
    // updateTampil(): void {
    // 	if (this._elHtml.classList.contains('tampil')) {
    // 		this.attach(this._parent);
    // 	}
    // 	else {
    // 		this.detach();
    // 	}
    // }
    sembunyiTombol() {
        this.lihatTbl.classList.remove('tampil');
        this.utamaTbl.classList.remove('tampil');
    }
    // updateView(): void {
    // 	this.pNama.innerText = this._anggota.nama;
    // }
    get lihatTbl() {
        return this.getEl('button.edit');
    }
    get img() {
        return this.getEl('img.foto2');
    }
    get pNama() {
        return this.getEl('p.nama');
    }
    get utamaTbl() {
        return this.getEl('button.utama');
    }
    get fotoCont() {
        return this.getEl('div.foto-cont');
    }
    set anggota(value) {
        this._anggota = value;
    }
}
