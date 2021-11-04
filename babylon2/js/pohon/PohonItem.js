import { BaseComponent } from "../comp/BaseComponent.js";
export class PohonItem extends BaseComponent {
    constructor() {
        super();
        this._elHtml = document.body.querySelector('template').content.querySelector('pohon-item').cloneNode(true);
    }
    get obj3D() {
        return this._obj3D;
    }
    set obj3D(value) {
        this._obj3D = value;
    }
    get nama() {
        return this.getEl('nama');
    }
    get cont() {
        return this.getEl('cont');
    }
    get menuTbl() {
        return this.getEl('div.nama-cont button.menu');
    }
    get toggleTbl() {
        return this.getEl('div.nama-cont button.toggle');
    }
    get namaCont() {
        return this.getEl('div.nama-cont');
    }
}
