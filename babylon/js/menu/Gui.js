import { Menu } from "./Menu.js";
import { DaftarIsi } from "./DatarIsi.js";
export class Gui {
    constructor() {
        this.menu = null;
        this.daftarIsi = null;
        this._cont = null;
    }
    init() {
        // document.body.appendChild(this.cont);
        this.daftarIsi = new DaftarIsi();
        this.daftarIsi.attach(this._cont);
        this.menu = new Menu();
        this.menu.daftarIsi = this.daftarIsi;
        this.menu.init();
        this.menu.renderMenu();
        this.menu.attach(this._cont);
    }
    get cont() {
        return this._cont;
    }
    set cont(div) {
        this._cont = div;
    }
}
