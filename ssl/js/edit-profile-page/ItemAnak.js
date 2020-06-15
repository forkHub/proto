import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
export class ItemAnak extends BaseComponent {
    constructor() {
        super();
        this._elHtml = Util.getTemplate('div.item-anak');
    }
    get namaP() {
        return this.getEl("p.nama");
    }
    get atasTbl() {
        return this.getEl('button.atas');
    }
    get bawahTbl() {
        return this.getEl('button.bawah');
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
}
