"use strict";
class ItemView extends BaseComponent {
    constructor() {
        super();
        this._elHtml = this.getTemplate("div.item");
    }
    get post() {
        return this._post;
    }
    set post(value) {
        this._post = value;
    }
    get share() {
        return this.getEl('a');
    }
    get text() {
        return this.getEl('div.text');
    }
    get editTbl() {
        return this.getEl('button.edit');
    }
    get delTbl() {
        return this.getEl('button.hapus');
    }
}
