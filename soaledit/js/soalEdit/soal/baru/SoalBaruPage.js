import { Form } from "./Form.js";
import { Tombol } from "../../Tombol.js";
export class SoalBaruPage {
    constructor() {
        this.form = null;
        this.saveClick = null;
        this.simpanTbl = null;
        this.cancelTbl = null;
        this.backupSoal = null;
        this.soalAsli = null;
        this._kiriEl = null;
        this._kananEl = null;
        this._db = null;
        this.simpanTbl = new Tombol();
        this.cancelTbl = new Tombol();
        this.form = new Form();
    }
    init() {
        this.backupSoal = this._db.createDefault();
        this.simpanTbl.label = 'Simpan';
        this.simpanTbl.build();
        this.simpanTbl.onClick = () => {
            this.saveClick();
        };
        this.cancelTbl.label = 'Batal';
        this.cancelTbl.build();
        this.cancelTbl.onClick = () => {
            this.restoreDataSoal();
            this.saveClick();
        };
    }
    clear() {
        this.simpanTbl.detach();
        this.cancelTbl.detach();
        this.form.detach();
    }
    restoreDataSoal() {
        this.soalAsli.soal = this.backupSoal.soal;
        this.soalAsli.jawaban[0] = this.backupSoal.jawaban[0];
        this.soalAsli.jawaban[1] = this.backupSoal.jawaban[1];
        this.soalAsli.jawaban[2] = this.backupSoal.jawaban[2];
        this.soalAsli.jawaban[3] = this.backupSoal.jawaban[3];
        this.soalAsli.jawaban[4] = this.backupSoal.jawaban[4];
    }
    cloneDataSoal(data) {
        console.log(data);
        this.backupSoal.soal = data.soal;
        this.backupSoal.jawaban[0] = data.jawaban[0];
        this.backupSoal.jawaban[1] = data.jawaban[1];
        this.backupSoal.jawaban[2] = data.jawaban[2];
        this.backupSoal.jawaban[3] = data.jawaban[3];
    }
    render(data) {
        console.log('soal baru page');
        console.log(data);
        this.cloneDataSoal(data);
        this.soalAsli = data;
        this.form.soal = data;
        this.form.attach(this._kiriEl);
        this.simpanTbl.attach(this._kananEl);
        this.cancelTbl.attach(this._kananEl);
    }
    set kiriEl(value) {
        this._kiriEl = value;
    }
    set kananEl(value) {
        this._kananEl = value;
    }
    set db(value) {
        this._db = value;
    }
}
