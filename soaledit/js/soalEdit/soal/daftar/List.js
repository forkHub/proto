import { BaseComponent } from "../../ha/BaseComponent.js";
import { SoalEdit } from "../../SoalEdit.js";
export class List {
    constructor(cont) {
        this._list = [];
        this.cont = null;
        this._itemAktif = null;
        this._itemSelected = null;
        this.cont = cont;
    }
    //TODO: kalau belum ada soal sama sekali tampilkan belum ada soal.
    redraw() {
        let i;
        let listSoal;
        listSoal = SoalEdit.inst.soal.db.list;
        this.clearView();
        for (i = 0; i < listSoal.length; i++) {
            this.add(listSoal[i]);
        }
        this._itemAktif = null;
    }
    clearView() {
        // this.deselectAll();
        while (this._list.length > 0) {
            let item = this._list.pop();
            item.destroy();
        }
    }
    deselectAll() {
        for (let i = 0; i < this._list.length; i++) {
            let item = this._list[i];
            item.deselect();
        }
        // this._itemAktif = null;
        // this._itemDeselected();
    }
    add(soal) {
        let item = new ItemView(soal, this.cont);
        item.elHtml.onclick = () => {
            this.selectItem(item);
        };
        this._list.push(item);
    }
    selectItem(item) {
        console.log('soal selected');
        this.deselectAll();
        item.select();
        this._itemAktif = item;
        this._itemSelected();
    }
    get itemAktif() {
        return this._itemAktif;
    }
    set itemSelected(value) {
        this._itemSelected = value;
    }
    get list() {
        return this._list;
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
