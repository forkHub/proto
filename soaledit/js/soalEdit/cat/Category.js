import { Input } from '../Input.js';
import { CatDB } from './CatDB.js';
import { ListView } from './ListView.js';
import { PanelTombol } from './PanelTombol.js';
import { SoalEdit } from '../SoalEdit.js';
export class Category {
    constructor() {
        this._modalCont = null;
        this._kiriEl = null;
        this._kananEl = null;
        this._onLihatSoalClick = null;
        this._db = null;
        this._listView = null;
        this._panel = null;
        this.editNamaView = null;
        this._catDipilih = null;
        this._listView = new ListView();
        this._db = new CatDB();
        this.editNamaViewBuat();
        this._panel = new PanelTombol();
    }
    init() {
        this.listView.kiriEl = this._kiriEl;
        this.listView.db = this._db;
        this.listView.itemClick = (view) => {
            this.categorySelected(view);
        };
        this.initPanelTombol();
    }
    attach() {
        this._panel.attach();
        this._listView.attach();
        this._listView.refresh();
    }
    detach() {
        this._panel.detach();
        this._listView.detach();
    }
    initPanelTombol() {
        this._panel.kananEl = this._kananEl;
        this._panel.init();
        this._panel.editNamaTombol.onClick = () => {
            this.editNamaTombolClick();
        };
        this._panel.hapusTombol.onClick = () => {
            this.hapusClick();
        };
        this._panel.catBuatTombol.onClick = () => {
            this.catBuatClick();
        };
        this._panel.lihatSoalTombol.onClick = () => {
            this.lihatSoalClick();
        };
        this._panel.editNamaTombol.onClick = () => {
            this.editNamaTombolClick();
        };
    }
    hapusClick() {
        this._db.hapus(this._catDipilih);
        this._catDipilih = null;
        this.listView.refresh();
        this._panel.hapusTombol.detach();
        this._panel.editNamaTombol.detach();
        this._panel.lihatSoalTombol.detach();
    }
    catBuatClick() {
        this._db.insert(this._db.default());
        this.listView.refresh();
    }
    lihatSoalClick() {
        let soal = SoalEdit.inst.soal;
        console.group('lihat soal click');
        console.log('cat dipilih');
        console.log(this.catDipilih);
        this.detach();
        // soal.db.list = this.catDipilih.soal;
        soal.daftar.attach();
        console.groupEnd();
    }
    editNamaTombolClick() {
        console.log('cat edit nama tombol click ');
        this._modalCont.show();
        this._modalCont.elHtml.innerHTML = '';
        this.editNamaView.attach(this._modalCont.elHtml);
        this.editNamaView.nama = this._catDipilih.label;
    }
    editNamaViewBuat() {
        this.editNamaView = new Input();
        this.editNamaView.build();
        this.editNamaView.label = 'Nama Kategori: ';
        this.editNamaView.onClick = (nama) => {
            this.editNamaViewClick(nama);
            this._modalCont.hide();
        };
    }
    editNamaViewClick(nama) {
        console.log('cat edit nama view click ' + nama);
        if (this.validasiNama(nama)) {
            this.catDipilih.label = nama;
            this.listView.itemDipilih.label = nama;
        }
        else {
            //TODO: dialog
        }
    }
    validasiNama(nama) {
        return nama != null;
    }
    categorySelected(view) {
        this.listView.deselectAll();
        view.select();
        this._catDipilih = view.category;
        this.listView.itemDipilih = view;
        this._panel.editNamaTombol.attach(this._kananEl);
        this._panel.hapusTombol.attach(this._kananEl);
        this._panel.lihatSoalTombol.attach(this._kananEl);
        this._panel.simpanTombol.attach(this._kananEl);
        this._panel.loadTombol.attach(this._kananEl);
    }
    set modalCont(value) {
        this._modalCont = value;
    }
    set kiriEl(value) {
        this._kiriEl = value;
    }
    set kananEl(value) {
        this._kananEl = value;
    }
    get onLihatSoalClick() {
        return this._onLihatSoalClick;
    }
    set onLihatSoalClick(value) {
        this._onLihatSoalClick = value;
    }
    get catDipilih() {
        return this._catDipilih;
    }
    get db() {
        return this._db;
    }
    get listView() {
        return this._listView;
    }
    get panel() {
        return this._panel;
    }
}
