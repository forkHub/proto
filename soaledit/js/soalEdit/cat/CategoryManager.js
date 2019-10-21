import { Input } from '../Input.js';
import { CatDB } from './CatDB.js';
import { ListView } from './ListView.js';
import { PanelTombol } from './PanelTombol.js';
export class Category {
    constructor() {
        this._modalCont = null;
        this._kiriEl = null;
        this._kananEl = null;
        this._onLihatSoalClick = null;
        this._db = null;
        this.listView = null;
        this.panel = null;
        this.editNamaView = null;
        this._catDipilih = null;
        this.listView = new ListView();
        this._db = new CatDB();
        this.editNamaViewBuat();
        this.panel = new PanelTombol();
    }
    init() {
        this.listView.kiriEl = this._kiriEl;
        this.listView.db = this._db;
        this.listView.itemClick = (view) => {
            this.listItemViewClick(view);
        };
        this.initPanelTombol();
    }
    initPanelTombol() {
        this.panel.kananEl = this._kananEl;
        this.panel.init();
        this.panel.render();
        this.panel.editNamaTombol.onClick = () => {
            this.editNamaTombolClick();
        };
        this.panel.hapusTombol.onClick = () => {
            this._db.hapus(this._catDipilih);
            this._catDipilih = null;
            this.listView.listRefresh();
            this.panel.hapusTombol.detach();
            this.panel.editNamaTombol.detach();
        };
        this.panel.catBuatTombol.onClick = () => {
            this._db.insert(this._db.default());
            this.listView.listRefresh();
        };
        this.panel.lihatSoalTombol.onClick = () => {
            this.lihatSoalClick();
        };
        this.panel.editNamaTombol.onClick = () => {
            this.editNamaTombolClick();
        };
    }
    // initEditNamaTombol(): void {
    // 	this.editNamaTombol = new Tombol();
    // 	this.editNamaTombol.label = 'edit nama kategori';
    // 	this.editNamaTombol.render(this._kananEl);
    // 	this.editNamaTombol.hide();
    // 	this.editNamaTombol.onClick = () => {
    // 		this.editNamaTombolClick();
    // 	}
    // 	this._listTombol.push(this.editNamaTombol);
    // }
    // initHapusTombol(): void {
    // 	this.hapusTombol = new Tombol();
    // 	this.hapusTombol.label = 'hapus';
    // 	this.hapusTombol.render(this._kananEl);
    // 	this.hapusTombol.hide();
    // 	this.hapusTombol.onClick = () => {
    // 		this._db.hapus(this._catDipilih);
    // 	}
    // 	this._listTombol.push(this.hapusTombol);
    // }
    // initCatBuatTombol(): void {
    // 	let catBuatTombol: Tombol;
    // 	catBuatTombol = new Tombol();
    // 	catBuatTombol.label = 'buat kategori baru';
    // 	catBuatTombol.render(this._kananEl);
    // 	catBuatTombol.onClick = () => {
    // 		this.listCategory.push(this.db.buatCategory('cat ' + this.listCategory.length));
    // 		this.list.listRefresh();
    // 	}
    // 	this._listTombol.push(catBuatTombol);
    // }
    // initLihatSoalTombol(): void {
    // 	this.lihatSoalTombol = new Tombol();
    // 	this.lihatSoalTombol.label = 'lihat soal';
    // 	this.lihatSoalTombol.render(this._kananEl);
    // 	this.lihatSoalTombol.onClick = () => {
    // 		this.lihatSoalClick();
    // 	}
    // 	this._listTombol.push(this.lihatSoalTombol);
    // }
    lihatSoalClick() {
        console.log('lihat soal click');
        console.log(this.catDipilih);
        this.listView.listViewClear();
        this.panel.tombolClear();
        this._onLihatSoalClick(this.catDipilih);
    }
    editNamaTombolClick() {
        console.log('cat edit nama tombol click ');
        this._modalCont.show();
        this._modalCont.elHtml.innerHTML = '';
        this.editNamaView.render(this._modalCont.elHtml);
    }
    editNamaViewBuat() {
        this.editNamaView = new Input();
        this.editNamaView.label = 'Nama Category: ';
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
        //TODO: finish
        // console.log(nama);
        return nama != null;
    }
    listItemViewClick(view) {
        this.listView.listDeselectAll();
        view.select();
        this._catDipilih = view.category;
        this.listView.itemDipilih = view;
        this.panel.editNamaTombol.attach(this._kananEl);
        this.panel.hapusTombol.attach(this._kananEl);
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
    // public get listCatListView(): Array<CatListItemView> {
    // 	return this._listCatListView;
    // }
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
}
/*
hapus(cat: ICategory): void {
    let item: ICategory;
    let itemView: CatListItemView;
    let totalDelete: number = 0;

    console.group('hapus category');
    console.log(cat);
    console.log('list length ' + this.listCategory.length);

    //hapus cat
    for (let i: number = this.listCategory.length - 1; i >= 0; i--) {
        item = this.listCategory[i];
        if (item === cat) {
            console.log('hapus pada idx ' + i);
            this.listCategory.splice(i, 1);
            totalDelete++;
        }
    }

    if (totalDelete != 1) throw Error('delete != 1');

    //hapus view
    for (let i: number = this._listCatListView.length - 1; i >= 0; i--) {
        itemView = this._listCatListView[i];
        if (itemView.category === cat) {
            console.log('hapus cat dari list, idx ' + i);
            this._listCatListView.splice(i, 1);
            totalDelete++;
            itemView.detach();
        }
    }

    //update
    this.listViewRefresh();
    this._catDipilih = null;
    this.listItemViewDipilih = null;
    this.hapusTombol.hide();
    this.editNamaTombol.hide();

    if (totalDelete != 2) throw Error('delete != 2');

    console.groupEnd();
}
*/ 
