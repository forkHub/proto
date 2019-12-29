import { BaseComponent } from "../BaseComponent.js";
// import { Dom } from "../Dom.js";
export class Angka extends BaseComponent {
    constructor(angka = 0) {
        super();
        this._angka = 0;
        this._tempat = AngkaEnum.SUMBER;
        this._angkaClick = null;
        this._angka = angka;
        this.elHtml = document.body.querySelector('template').content.querySelector('button.angka').cloneNode(true);
        this.elHtml.onclick = () => {
            // console.log('click');
            this.onclick();
        };
        this._tempat = AngkaEnum.SUMBER;
    }
    onclick() {
        // console.log('on click');
        // if (this._tempat === AngkaEnum.SUMBER) {
        // 	this._tempat = AngkaEnum.TARGET;
        // }
        // else if (AngkaEnum.TARGET == this._tempat) {
        // 	this._tempat = AngkaEnum.SUMBER;
        // }
        // else {
        // 	throw new Error();
        // }
        // console.log(this.tempat);
        this._angkaClick(this);
    }
    get tempat() {
        return this._tempat;
    }
    set tempat(value) {
        this._tempat = value;
    }
    get angka() {
        return this._angka;
    }
    set angka(value) {
        this._angka = value;
        this._elHtml.innerText = value + '';
    }
    set angkaClick(value) {
        this._angkaClick = value;
    }
}
export var AngkaEnum;
(function (AngkaEnum) {
    AngkaEnum[AngkaEnum["TARGET"] = 0] = "TARGET";
    AngkaEnum[AngkaEnum["SUMBER"] = 1] = "SUMBER";
})(AngkaEnum || (AngkaEnum = {}));
