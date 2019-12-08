import { Game } from "../Game.js";
import { BaseComponent } from "./BaseComponent.js";
export class Selesai extends BaseComponent {
    constructor() {
        super();
        this._tombol = null;
        this._menuTbl = null;
        this.nilaiP = null;
    }
    init() {
        this._elHtml = Game.inst.template.selesai;
        this._tombol = this.getEl('button.mulai');
        this._menuTbl = this.getEl('button.menu');
        this.nilaiP = this.getEl('p.nilai');
    }
    attach() {
        super.attach(Game.inst.cont);
    }
    set onClick(value) {
        this._tombol.onclick = () => {
            this.detach();
            value();
        };
    }
    set onMenuClick(value) {
        this._menuTbl.onclick = () => {
            this.detach();
            value();
        };
    }
    set nilai(value) {
        this.nilaiP.innerHTML = value + '';
    }
}
