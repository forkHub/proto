import { BaseComponent } from '../ha/BaseComponent.js';
import { DataKosong } from '../DataKosong.js';
import { SoalEdit } from '../SoalEdit.js';
export class ListView {
    constructor() {
        this._list = [];
        this._itemDipilih = null;
        this._kiriEl = null;
        this._db = null;
        this.dataKosong = new DataKosong();
    }
    attach() {
        //this.refresh();
        for (let i; i < this._list.length; i++) {
            this._list[i].attach(this._kiriEl);
        }
    }
    detach() {
        console.log("list view detach " + this._list.length);
        for (let i = 0; i < this._list.length; i++) {
            let res = this._list[i].detach();
            console.log(res);
        }
    }
    deselectAll() {
        for (let i = 0; i < this._list.length; i++) {
            this._list[i].deselect();
        }
    }
    clear() {
        console.group('list view clear:');
        console.log('list length ' + this._list.length);
        for (let i = 0; i < this._list.length; i++) {
            this._list[i].destroy();
        }
        console.groupEnd();
    }
    refresh() {
        let view;
        console.group('list refresh');
        console.log('list cat list view length ' + this._list.length);
        console.log('db length ' + this._db.listCategory.length);
        //TODO: panggil pakai clear
        while (this._list.length > 0) {
            view = this._list.pop();
            view.detach();
        }
        this.dataKosong.detach();
        for (let i = 0; i < this._db.listCategory.length; i++) {
            view = this.buatItem(this._db.listCategory[i]);
            view.attach(this._kiriEl);
            this._list.push(view);
        }
        if (this._db.listCategory.length == 0) {
            this.dataKosong.attach(SoalEdit.inst.kiriEl);
            console.log('data kosong attach');
        }
        console.log('length akhir: ' + this._list.length);
        console.log('length akhir: ' + this._db.listCategory.length);
        console.groupEnd();
    }
    buatItem(cat) {
        let bc;
        bc = new ItemView();
        bc.category = cat;
        bc.label = cat.label + " - (" + cat.soal.length + " Soal)";
        bc.onClick = (view) => {
            this._itemClick(view);
        };
        return bc;
    }
    get list() {
        return this._list;
    }
    get kiriEl() {
        return this._kiriEl;
    }
    set kiriEl(value) {
        this._kiriEl = value;
    }
    get itemClick() {
        return this._itemClick;
    }
    set itemClick(value) {
        this._itemClick = value;
    }
    get itemDipilih() {
        return this._itemDipilih;
    }
    set itemDipilih(value) {
        this._itemDipilih = value;
    }
    set db(value) {
        this._db = value;
    }
}
export class ItemView extends BaseComponent {
    constructor() {
        super();
        this._onClick = null;
        this.tblEl = null;
        this._category = null;
        this._template = `<div class='cat-item'><button class=''></button></div>`;
        this.build();
    }
    destroy() {
        this.detach();
        this._onClick = null;
        this.tblEl.onclick = null;
        this._elHtml = null;
        this.tblEl = null;
        this._category = null;
    }
    select() {
        this._elHtml.classList.add('selected');
    }
    deselect() {
        this._elHtml.classList.remove('selected');
    }
    onBuild() {
        this.tblEl = this.getEl('button');
        this.tblEl.onclick = () => {
            this._onClick(this);
        };
    }
    get onClick() {
        return this._onClick;
    }
    set onClick(value) {
        this._onClick = value;
    }
    get label() {
        return this.tblEl.innerText;
    }
    set label(value) {
        this.tblEl.innerText = value;
    }
    get category() {
        return this._category;
    }
    set category(value) {
        this._category = value;
    }
}
