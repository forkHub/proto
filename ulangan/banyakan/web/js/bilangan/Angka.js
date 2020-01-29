import { BaseComponent } from "../BaseComponent.js";
export class Angka extends BaseComponent {
    constructor(angka = 0) {
        super();
        this._angka = 0;
        this._angkaClick = null;
        this._angka = angka;
        this._template = `
			<button class='angka putih'>
				<button class='angka'><span class='angka'></span></button>
			</button>
		`;
        this.build();
        this.elHtml.onclick = () => {
            this.onclick();
        };
    }
    onclick() {
        this._angkaClick(this);
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
