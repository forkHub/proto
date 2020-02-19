import { BaseComponent } from "../BaseComponent.js";
import { Acak } from "../Acak.js";
export class Angka extends BaseComponent {
    constructor(html) {
        super();
        this._angka = 0;
        this._input = null;
        this._elHtml = html;
        this._input = this._elHtml;
        this._acak = new Acak(10);
    }
    get angka() {
        return this._angka;
    }
    set angka(value) {
        this._angka = value;
        this._input.value = value + '';
    }
    get readonly() {
        return this._input.readOnly;
    }
    set readonly(value) {
        this._input.readOnly = value;
    }
    get value() {
        return (this._input.value);
    }
    set value(value) {
        this._input.value = value + '';
    }
    get acak() {
        return this._acak;
    }
    get input() {
        return this._input;
    }
}
