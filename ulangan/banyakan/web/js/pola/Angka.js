import { BaseComponent } from "../BaseComponent.js";
export class Angka extends BaseComponent {
    constructor(angka = 0) {
        super();
        this._angka = 0;
        this._input = null;
        this._angka = angka;
        this._template = `<input type='number' value='' class='angka'/>`;
        this.build();
        this._input = this._elHtml;
        this._input.value = angka + '';
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
}
