import { Akun } from "./Akun.js";
import { BaseComponent2 } from "./BaseComponent2.js";
import { Dom } from "./Dom.js";
export class ListView {
    constructor() {
        this._list = [];
        this.db = null;
        this._cont = null;
    }
    init() {
        this.db = Akun.inst.db;
    }
    refresh() {
        this.clear();
        for (let i = 0; i < this.db.list.length; i++) {
            let journal = this.db.list[i];
            let item = new Item(journal);
            // item.journal = this.db.list[i];
            item.attach(this._cont);
            this._list.push(item);
        }
    }
    update() {
        // console.log('list update');
        // console.log('len ' + this._list.length);
        for (let i = 0; i < this._list.length; i++) {
            let item;
            item = this._list[i];
            item.update();
            // console.log(item);
        }
    }
    clear() {
        while (this._list.length > 0) {
            let item;
            item = this._list.pop();
            item.destroy();
        }
    }
    set cont(value) {
        this._cont = value;
    }
    get itemAktif() {
        return this._itemAktif;
    }
    set itemAktif(value) {
        this._itemAktif = value;
    }
    get list() {
        return this._list;
    }
}
class Item extends BaseComponent2 {
    constructor(journal) {
        super();
        this.desc = null;
        this.jml = null;
        this.tgl = null;
        this._el = document.querySelector('template').content.querySelector('div.daftar').cloneNode(true);
        // console.log(this._el);
        this.desc = Dom.getEl(this._el, "div.desc");
        this.jml = Dom.getEl(this._el, 'div.jml');
        this.tombolCont = Dom.getEl(this._el, 'div.cont');
        this.editTbl = this.getEl('button.edit');
        this.hapusTbl = this.getEl('button.hapus');
        this.tgl = this.getEl('p.tgl');
        this.editTbl.onclick = (event) => {
            event.stopPropagation();
            this.editClick();
            ;
        };
        this.hapusTbl.onclick = (event) => {
            event.stopPropagation();
            this.hapusClick();
        };
        this._journal = journal;
        this.update();
        this._el.onclick = this.onClick.bind(this);
    }
    editClick() {
        let edit = Akun.inst.edit;
        // event.stopPropagation();
        edit.edit(this._journal);
        this.hideTombol();
    }
    hapusClick() {
        // event.stopPropagation();
        let db = Akun.inst.db;
        let list = Akun.inst.listView;
        db.delete(this._journal);
        list.refresh();
        Akun.inst.simpan();
    }
    hideTombol() {
        this.tombolCont.style.display = 'none';
    }
    onClick() {
        let display = this.tombolCont.style.display;
        if (display == 'none' || display == '') {
            this.tombolCont.style.display = 'block';
        }
        else if (this.tombolCont.style.display == 'block') {
            this.hideTombol();
        }
        else {
            // console.log(this.tombolCont.style.display);
            // console.log(this.tombolCont.style);
            throw new Error(this.tombolCont.style.display);
        }
        Akun.inst.listView.itemAktif = this;
    }
    update() {
        // console.log('update');
        // console.log(this._journal);
        this.desc.innerText = this._journal.desc;
        this.jml.innerText = (this._journal.jumlah) + '';
        this.tgl.innerText = this._journal.getDateStr();
    }
}
