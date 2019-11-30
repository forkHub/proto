import { Banyakan } from "./banyakan/Banyakan.js";
import { Dom } from "./Dom.js";
export class Selesai {
    constructor() {
        this._view = null;
        this._tombol = null;
        this.nilaiP = null;
    }
    tampil(cont) {
        cont.appendChild(this._view);
        this.nilaiP.innerHTML = Banyakan.inst.nilai + '';
    }
    init() {
        this._view = Banyakan.inst.template.selesai;
        this._tombol = Dom.getEl(this._view, 'button');
        this._tombol.onclick = () => {
            this._view.parentElement.removeChild(this._view);
            Banyakan.inst.mulaiLagi();
        };
        this.nilaiP = Dom.getEl(this._view, 'p.nilai');
    }
    get view() {
        return this._view;
    }
    set view(value) {
        this._view = value;
    }
    get tombol() {
        return this._tombol;
    }
    set tombol(value) {
        this._tombol = value;
    }
}
