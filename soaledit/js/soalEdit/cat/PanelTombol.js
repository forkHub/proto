import { Tombol } from "../Tombol.js";
import { Simpan } from "../tombol/Simpan.js";
// import { SoalEdit } from "../SoalEdit.js";
import { Load } from "../tombol/Load.js";
export class PanelTombol {
    constructor() {
        this._editNamaTombol = null;
        this._hapusTombol = null;
        this._lihatSoalTombol = null;
        this._catBuatTombol = null;
        this._simpanTombol = null;
        this._loadTombol = null;
        this._kananEl = null;
    }
    init() {
        this.initEditNamaTombol();
        this.initCatBuatTombol();
        this.initHapusTombol();
        this.initLihatSoalTombol();
        this._simpanTombol = new Simpan();
        this._loadTombol = new Load();
    }
    attach() {
        this._catBuatTombol.attach(this._kananEl);
        this._simpanTombol.attach(this._kananEl);
        this._loadTombol.attach(this._kananEl);
    }
    detach() {
        this._catBuatTombol.detach();
        this._editNamaTombol.detach();
        this._hapusTombol.detach();
        this._lihatSoalTombol.detach();
        this._simpanTombol.detach();
        this._loadTombol.detach();
    }
    initEditNamaTombol() {
        this._editNamaTombol = new Tombol();
        this._editNamaTombol.label = 'Edit nama kategori';
        this._editNamaTombol.build();
    }
    initHapusTombol() {
        this._hapusTombol = new Tombol();
        this._hapusTombol.label = 'Hapus';
        this._hapusTombol.build();
    }
    tombolClear() {
        this._catBuatTombol.detach();
        this._editNamaTombol.detach();
        this._hapusTombol.detach();
        this._lihatSoalTombol.detach();
    }
    initCatBuatTombol() {
        this._catBuatTombol = new Tombol();
        this._catBuatTombol.label = 'Buat kategori baru';
        this._catBuatTombol.build();
    }
    initLihatSoalTombol() {
        this._lihatSoalTombol = new Tombol();
        this._lihatSoalTombol.label = 'Lihat soal';
        this._lihatSoalTombol.build();
    }
    get editNamaTombol() {
        return this._editNamaTombol;
    }
    get hapusTombol() {
        return this._hapusTombol;
    }
    get lihatSoalTombol() {
        return this._lihatSoalTombol;
    }
    set kananEl(value) {
        this._kananEl = value;
    }
    get catBuatTombol() {
        return this._catBuatTombol;
    }
    get simpanTombol() {
        return this._simpanTombol;
    }
    get loadTombol() {
        return this._loadTombol;
    }
}
