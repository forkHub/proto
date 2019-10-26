import { BaseComponent2 } from "../BaseComponent2";
import { Akun } from "../Akun";
// import { Template } from "../Template";
export class Item extends BaseComponent2 {
    constructor(label) {
        super();
        this._button = null;
        this.label = label;
        // this._el = this.getEl()
    }
    init() {
        // let template:Template = ;
        this._el = Akun.inst.template.menuItem;
        this._button = this.getEl('button');
        this._button.innerText = this.label;
    }
    get button() {
        return this._button;
    }
    set button(value) {
        this._button = value;
    }
}
