import { EditSoalPage } from "./edit/EditSoalPage.js";
import { DaftarSoalPage } from "./daftar/DaftarSoalPage.js";
import { SoalDB } from "./SoalDb.js";
export class Soal {
    constructor(kiri, kanan) {
        this.kananEl = kanan;
        this.kiriEl = kiri;
        this._edit = new EditSoalPage();
        this._daftar = new DaftarSoalPage(kanan, kiri);
        this._db = new SoalDB();
    }
    init() {
        this._edit.kananEl = this.kananEl;
        this._edit.kiriEl = this.kiriEl;
        this._edit.init();
        this._daftar.init();
    }
    onEditSoal(soal) {
        console.log('on edit soal');
        console.log(soal);
        this._edit.editSoal();
    }
    get daftar() {
        return this._daftar;
    }
    get edit() {
        return this._edit;
    }
    get db() {
        return this._db;
    }
}
