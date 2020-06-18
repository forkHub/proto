import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
export class ItemAnakDipilih extends BaseComponent {
    constructor() {
        super();
        this._elHtml = Util.getTemplate('div.item-anak-dipilih');
    }
    get namaP() {
        return this.getEl('p.nama');
    }
    get anggota() {
        return this._anggota;
    }
    set anggota(value) {
        this._anggota = value;
    }
}
