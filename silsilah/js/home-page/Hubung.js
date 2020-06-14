import { BaseComponent } from "../ha/BaseComponent.js";
export class Hubung extends BaseComponent {
    constructor() {
        super();
    }
    setClass(className) {
        this._elHtml.classList.remove(className);
        this._elHtml.classList.add(className);
    }
}
Hubung.ATAS = 'atas';
Hubung.KANAN = 'kanan';
Hubung.KIRI = 'kiri';
Hubung.TENGAH = 'tengah';
Hubung.KOSONG = 'kosong';
