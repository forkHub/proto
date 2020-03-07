import { BaseComponent } from "./BaseComponent.js";
export class DaftarIsi extends BaseComponent {
    constructor() {
        super();
        // private tblAr: Array<Tombol> = [];
        this.itemAr = [];
        this._elHtml = document.createElement('div');
    }
    pop() {
    }
    popToHome() {
    }
    push(tbl) {
        let item = new Item();
        item.tombol = tbl;
        item.elHtml.innerText = tbl.elHtml.innerText;
        this.itemAr.push(item);
        while (this.itemAr.length > 3) {
            this.itemAr.shift();
        }
    }
    hapusSampai(item) {
        while (true) {
            let hps = this.itemAr.pop();
            if (hps == item)
                return;
        }
    }
    render() {
        this._elHtml.innerText = '';
        for (let i = 0; i < this.itemAr.length; i++) {
            let item = this.itemAr[i];
            let pemisah = document.createElement('span');
            pemisah.innerText = '/';
            item.attach(this._elHtml);
            this._elHtml.appendChild(pemisah);
            item.elHtml.onclick = () => {
                while (this._elHtml.children[0]) {
                    console.log('remove child');
                    this._elHtml.removeChild(this._elHtml.children[0]);
                }
                this.hapusSampai(item);
                item.tombol.renderMember();
            };
        }
    }
}
export class Item extends BaseComponent {
    constructor() {
        super();
        this._elHtml = document.createElement('button');
    }
    get tombol() {
        return this._tombol;
    }
    set tombol(value) {
        this._tombol = value;
    }
}
