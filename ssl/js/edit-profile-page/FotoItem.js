import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
export class FotoItem extends BaseComponent {
    constructor() {
        super();
        this._elHtml = Util.getTemplate('div.item-foto');
    }
    init() {
    }
    get img() {
        return this.getEl('img');
    }
}
