import { BaseComponent } from "../../ha/BaseComponent.js";
import { SoalEdit } from "../../SoalEdit.js";
import { DataKosong } from "../../DataKosong.js";
export class ListSoal {
    constructor(cont) {
        this._listItemView = [];
        this.cont = null;
        this._itemAktif = null;
        this.cont = cont;
        this.dataKosong = new DataKosong();
    }
    init() {
    }
    attach() {
    }
    update() {
        let i;
        let listSoal = SoalEdit.inst.category.catDipilih.soal;
        let kiri = SoalEdit.inst.kiriEl;
        this.clearView();
        for (i = 0; i < listSoal.length; i++) {
            this.add(listSoal[i]);
        }
        if (listSoal.length == 0) {
            this.dataKosong.attach(kiri);
        }
        this._itemAktif = null;
    }
    clearView() {
        while (this._listItemView.length > 0) {
            let item = this._listItemView.pop();
            item.destroy();
        }
        this.dataKosong.detach();
    }
    deselectAll() {
        for (let i = 0; i < this._listItemView.length; i++) {
            let item = this._listItemView[i];
            item.deselect();
        }
    }
    add(soal) {
        let item = new ItemView(soal, this.cont);
        item.elHtml.onclick = () => {
            this.selectItem(item);
        };
        this._listItemView.push(item);
        this.dataKosong.detach();
    }
    selectItem(item) {
        // let hapusSoalTombol:Tombol = SoalEdit.inst.soal.daftar.hapus;
        // let editSoaltombol:Tombol;
        let daftar = SoalEdit.inst.soal.daftar;
        console.log('soal selected');
        this.deselectAll();
        item.select();
        this._itemAktif = item;
        daftar.onSoalSelected();
        //this._itemSelected();
    }
    get itemAktif() {
        return this._itemAktif;
    }
    // public set itemSelected(value: Function) {
    // 	this._itemSelected = value;
    // }
    get listItemView() {
        return this._listItemView;
    }
}
export class ItemView extends BaseComponent {
    constructor(soal, cont) {
        super();
        this._template =
            `<div class='daftar-soal'>
				<button class='item'>
					<span class='label'>label</span>
				</button>
			</div>`;
        this.build();
        this.labelEl = this.getEl('span.label');
        this.labelEl.innerHTML = soal.soal;
        this._soal = soal;
        this.attach(cont);
    }
    select() {
        this._elHtml.classList.add('selected');
    }
    deselect() {
        this._elHtml.classList.remove('selected');
    }
    get soal() {
        return this._soal;
    }
    set soal(value) {
        this._soal = value;
    }
    update() {
        this.label = this._soal.soal;
    }
    destroy() {
        this.detach();
        this._elHtml.onclick = null;
    }
    set label(str) {
        if (this.labelEl) {
            this.labelEl.innerText = str;
        }
    }
    get label() {
        return this.labelEl ? this.labelEl.innerText : '';
    }
}
