import { Form } from "./Form.js";
import { Tombol } from "../../Tombol.js";
import { SoalEdit } from "../../SoalEdit.js";
export class EditSoalPage {
    constructor() {
        this.form = null;
        this.simpanTbl = null;
        this.cancelTbl = null;
        this._kiriEl = null;
        this._kananEl = null;
        this.simpanTbl = new Tombol();
        this.cancelTbl = new Tombol();
        this.form = new Form();
    }
    init() {
        this.form.init();
        this.simpanTbl.label = 'Simpan';
        this.simpanTbl.build();
        this.simpanTbl.onClick = () => {
            this.saveClick();
        };
        this.cancelTbl.label = 'Batal';
        this.cancelTbl.build();
        this.cancelTbl.onClick = () => {
            this.cancelClick();
        };
        this.daftarSoalPage = SoalEdit.inst.soal.daftar;
    }
    cancelClick() {
        this.form.revert();
        this.clear();
        this.daftarSoalPage.attach();
    }
    saveClick() {
        this.clear();
        this.daftarSoalPage.attach();
    }
    clear() {
        this.simpanTbl.detach();
        this.cancelTbl.detach();
        this.form.detach();
    }
    editSoal() {
        console.log('soal edit page render');
        this.form.attach(this._kiriEl);
        this.form.mulai();
        this.simpanTbl.attach(this._kananEl);
        this.cancelTbl.attach(this._kananEl);
    }
    set kiriEl(value) {
        this._kiriEl = value;
    }
    set kananEl(value) {
        this._kananEl = value;
    }
}
