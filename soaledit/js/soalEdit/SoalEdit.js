import { ModalContainer } from './ModalContainer.js';
import { Category } from './cat/Category.js';
import { Dom } from './Dom.js';
import { Soal } from './soal/Soal.js';
import { Dialog } from './Dialog.js';
import { Test } from './Test.js';
export class SoalEdit {
    constructor() {
        this._kananEl = null;
        this._kiriEl = null;
        this.modalCont = null;
        this._category = null;
        this._soal = null;
        this._statusEdit = false;
        this._dialog = null;
        SoalEdit._inst = this;
        this._kananEl = Dom.getEl(document.body, 'div.cont div.kanan');
        this._kiriEl = Dom.getEl(document.body, 'div.cont div.kiri');
        this.modalCont = new ModalContainer();
        this.modalCont.render(document.body);
        this.modalCont.hide();
        this._soal = new Soal(this._kiriEl, this._kananEl);
        this._category = new Category();
        this._dialog = new Dialog();
        this._test = new Test();
        this.init();
        this.debugSoal();
    }
    simpan() {
        //TODO:
        let str;
        str = JSON.stringify(this._category.db.listCategory);
        console.log(str);
        if (window.localStorage) {
            window.localStorage.setItem("cc_soal", str);
            this.statusEdit = false;
        }
    }
    refresh() {
        this._kiriEl.innerHTML = '';
        this._kananEl.innerHTML = '';
        this.init();
    }
    load() {
        //TODO:
        let str;
        if (window.localStorage) {
            str = window.localStorage.getItem("cc_soal");
            if (str) {
                let soal;
                this.refresh();
                soal = JSON.parse(str);
                this._category.db.hapusSemuaCat();
                for (let i = 0; i < soal.length; i++) {
                    this._category.db.insert(soal[i]);
                    console.log('data');
                    console.log(soal[i]);
                }
                this._category.listView.refresh();
                this.statusEdit = false;
            }
            else {
            }
        }
        else {
            console.log('local storage not found');
        }
    }
    init() {
        this.initCategory();
        this.initSoal();
        this._category.attach();
        this.statusEdit = false;
        this.test.init();
    }
    initSoal() {
        this.soal.init();
    }
    initCategory() {
        this._category.modalCont = this.modalCont;
        this._category.kiriEl = this._kiriEl;
        this._category.kananEl = this._kananEl;
        this._category.init();
    }
    debugSoal() {
        // this.test.testDialog();
    }
    get category() {
        return this._category;
    }
    get soal() {
        return this._soal;
    }
    static get inst() {
        return SoalEdit._inst;
    }
    get kiriEl() {
        return this._kiriEl;
    }
    get statusEdit() {
        return this._statusEdit;
    }
    set statusEdit(value) {
        this._statusEdit = value;
    }
    get test() {
        return this._test;
    }
    get dialog() {
        return this._dialog;
    }
}
window.onload = () => {
    new SoalEdit();
};
