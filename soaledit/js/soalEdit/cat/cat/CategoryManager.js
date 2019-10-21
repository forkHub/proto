import { Input } from '../Input.js';
import { CatListItemView } from './CatListItemView.js.js.js';
import { Tombol } from '../Tombol.js';
export class CategoryManager {
    constructor() {
        this._modalCont = null;
        this._kiriEl = null;
        this._kananEl = null;
        this._listTombol = [];
        this.editNamaView = null;
        this.catDipilih = null;
        this.listItemViewDipilih = null;
        this.listCategory = [];
        this._listCatListView = [];
        this.editNamaTombol = null;
        this.hapusTombol = null;
        this.lihatSoalTombol = null;
    }
    init() {
        this.editNamaTombol = new Tombol();
        this.editNamaTombol.label = 'edit nama kategori';
        this.editNamaTombol.render(this._kananEl);
        this.editNamaTombol.hide();
        this.editNamaTombol.onClick = () => {
            this.editNamaTombolClick();
        };
        this._listTombol.push(this.editNamaTombol);
        this.hapusTombol = new Tombol();
        this.hapusTombol.label = 'hapus';
        this.hapusTombol.render(this._kananEl);
        this.hapusTombol.hide();
        this.hapusTombol.onClick = () => {
            this.hapus(this.catDipilih);
        };
        let catBuatTombol;
        catBuatTombol = new Tombol();
        catBuatTombol.label = 'buat kategori baru';
        catBuatTombol.render(this._kananEl);
        catBuatTombol.onClick = () => {
            this.buatDanUpdate('cat ' + this.listCategory.length);
        };
        this._listTombol.push(catBuatTombol);
        this.lihatSoalTombol = new Tombol();
        this.lihatSoalTombol.label = 'lihat soal';
        this.lihatSoalTombol.render(this._kananEl);
        this.lihatSoalTombol.onClick = () => {
            this.lihatSoalClick();
        };
        this.editNamaViewBuat();
    }
    lihatSoalClick() {
        console.log('lihat soal click');
        this.listClear();
        this.tombolClear();
        this._onLihatSoalClick(this.catDipilih);
    }
    tombolClear() {
        for (let i; i < this._listTombol.length; i++) {
            this._listTombol[i].hide();
        }
    }
    listClear() {
        for (let i; i < this._listCatListView.length; i++) {
            this._listCatListView[i].destroy();
        }
    }
    hapus(cat) {
        let item;
        let itemView;
        let totalDelete = 0;
        console.group('hapus category');
        console.log(cat);
        console.log('list length ' + this.listCategory.length);
        //hapus cat
        for (let i = this.listCategory.length - 1; i >= 0; i--) {
            item = this.listCategory[i];
            if (item === cat) {
                console.log('hapus pada idx ' + i);
                this.listCategory.splice(i, 1);
                totalDelete++;
            }
        }
        if (totalDelete != 1)
            throw Error('delete != 1');
        //hapus view
        for (let i = this._listCatListView.length - 1; i >= 0; i--) {
            itemView = this._listCatListView[i];
            if (itemView.category === cat) {
                console.log('hapus cat dari list, idx ' + i);
                this._listCatListView.splice(i, 1);
                totalDelete++;
                itemView.detach();
            }
        }
        //update
        this.listRefresh();
        this.catDipilih = null;
        this.listItemViewDipilih = null;
        this.hapusTombol.hide();
        this.editNamaTombol.hide();
        if (totalDelete != 2)
            throw Error('delete != 2');
        console.groupEnd();
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
            this.listItemViewDipilih.label = nama;
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
    buatCategory(label) {
        return {
            label: label
        };
    }
    listItemViewBuat(cat) {
        let bc;
        bc = new CatListItemView();
        bc.category = cat;
        bc.label = cat.label;
        bc.onClick = (view) => {
            this.listItemViewClick(view);
        };
        return bc;
    }
    listItemViewClick(view) {
        this.listDeselectAll();
        view.select();
        this.catDipilih = view.category;
        this.listItemViewDipilih = view;
        this.editNamaTombol.show();
        this.hapusTombol.show();
    }
    listDeselectAll() {
        for (let i = 0; i < this._listCatListView.length; i++) {
            this._listCatListView[i].deselect();
        }
    }
    hapusSemua() {
        while (this.listCategory.length > 0) {
            this.listCategory.pop();
        }
    }
    listRefresh() {
        let view;
        console.group('list refresh');
        console.log('list cat list view length ' + this._listCatListView.length);
        while (this._listCatListView.length > 0) {
            view = this._listCatListView.pop();
            if (view.elHtml.parentElement)
                view.elHtml.parentElement.removeChild(view.elHtml);
        }
        for (let i = 0; i < this.listCategory.length; i++) {
            view = this.listItemViewBuat(this.listCategory[i]);
            view.render(this._kiriEl);
            this._listCatListView.push(view);
        }
        console.groupEnd();
    }
    buatDanUpdate(label) {
        this.listCategory.push(this.buatCategory(label));
        this.listRefresh();
    }
    debugClickFirstItem() {
        this.listItemViewClick(this._listCatListView[0]);
    }
    set listTombol(value) {
        this._listTombol = value;
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
    get listCatListView() {
        return this._listCatListView;
    }
    get onLihatSoalClick() {
        return this._onLihatSoalClick;
    }
    set onLihatSoalClick(value) {
        this._onLihatSoalClick = value;
    }
}
