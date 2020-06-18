import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
export class Item extends BaseComponent {
    constructor() {
        super();
        this._elHtml = Util.getTemplate('div.item');
    }
    get foto() {
        return this._foto;
    }
    set foto(value) {
        this._foto = value;
    }
    get img() {
        return this.getEl('img');
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
}
