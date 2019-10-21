import { Tombol } from "../Tombol";
export class PanelTombol {
    constructor() {
        this._editNamaTombol = null;
        this._hapusTombol = null;
        this._lihatSoalTombol = null;
    }
    init() {
        this.initEditNamaTombol();
        this.initCatBuatTombol();
        this.initHapusTombol();
        this.initLihatSoalTombol();
    }
    initEditNamaTombol() {
        this._editNamaTombol = new Tombol();
        this._editNamaTombol.label = 'edit nama kategori';
        this._editNamaTombol.render(this._kananEl);
        this._editNamaTombol.hide();
    }
    initHapusTombol() {
        this._hapusTombol = new Tombol();
        this._hapusTombol.label = 'hapus';
        this._hapusTombol.render(this._kananEl);
        this._hapusTombol.hide();
    }
    tombolClear() {
        this._catBuatTombol.detach();
        this._editNamaTombol.detach();
        this._hapusTombol.detach();
        this._lihatSoalTombol.detach();
    }
    initCatBuatTombol() {
        this._catBuatTombol = new Tombol();
        this._catBuatTombol.label = 'buat kategori baru';
        this._catBuatTombol.render(this._kananEl);
        // this._listTombol.push(catBuatTombol);
    }
    initLihatSoalTombol() {
        this._lihatSoalTombol = new Tombol();
        this._lihatSoalTombol.label = 'lihat soal';
        this._lihatSoalTombol.render(this._kananEl);
        // this._listTombol.push(this._lihatSoalTombol);
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
}
