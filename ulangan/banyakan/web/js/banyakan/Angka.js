import { BaseComponent } from "../BaseComponent.js";
export class Angka extends BaseComponent {
    constructor() {
        super();
        this._angka = 0;
        this._view = null;
        //TODO: pakai sharing resource
        this.icons = [
            "&#127799", "&#127800", "&#127801", "&#127802", "&#127803",
            "&#127804", "&#127805", "&#127806", "&#127807", "&#127808",
            "&#127809", "&#127810", "&#127811", "&#127812", "&#127813",
            "&#127814", "&#127815", "&#127816", "&#127817", "&#127818",
            "&#127819", "&#127820", "&#127821", "&#127822", "&#127823",
            "&#127824", "&#127825", "&#127826", "&#127827", "&#127828",
            "&#127829", "&#127830"
        ];
        this._template = `<button class='angka putih'></button>`;
        this.build();
        this._view = this._elHtml;
    }
    tulis(angkaSaja) {
        let str = '';
        let idx = 0;
        let icon = '';
        idx = Math.floor(Math.random() * this.icons.length);
        icon = this.icons[idx];
        for (let i = 0; i < this._angka; i++) {
            str += icon;
        }
        str += "<br/>(" + this._angka + ")";
        if (angkaSaja) {
            str = this._angka + '';
        }
        this._view.innerHTML = str;
    }
    get angka() {
        return this._angka;
    }
    set angka(value) {
        this._angka = value;
    }
    get view() {
        return this._view;
    }
    set view(value) {
        this._view = value;
    }
}
