import { BaseComponent } from "../BaseComponent.js";
export class Angka extends BaseComponent {
    constructor() {
        super();
        this._jam = 0;
        this._menit = 0;
        this._template = `<button class='jam'></button>`;
        this.build();
    }
    acakJam(acak) {
        this._jam = acak.get();
        this._menit = acak.get() * 5;
    }
    padding(str) {
        str = "00" + str;
        str = str.slice(str.length - 2, str.length);
        return str;
    }
    getString() {
        return this.padding(this._jam + '') + ':' + this.padding(this.menit + '');
    }
    get angka() {
        return this._jam;
    }
    set angka(value) {
        this._jam = value;
    }
    get menit() {
        return this._menit;
    }
    set menit(value) {
        this._menit = value;
    }
}
