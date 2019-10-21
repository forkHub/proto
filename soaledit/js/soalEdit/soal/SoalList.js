import { BaseComponent } from "../../ha/BaseComponent.js";
export class List {
    constructor(cont, onClick) {
        this.listItemView = [];
        this.cont = null;
        this.itemOnClick = null;
        this.cont = cont;
        this.itemOnClick = onClick;
    }
    //TODO: kalau belum ada soal sama sekali tampilkan belum ada soal.
    redraw(list) {
        let i;
        this.clearView();
        for (i = 0; i < list.length; i++) {
            this.add(list[i]);
        }
    }
    // clearSoalData(): void {
    // 	while (this.listSoal.length > 0) {
    // 		this.listSoal.pop();
    // 	}
    // }
    clearView() {
        while (this.listItemView.length > 0) {
            let item = this.listItemView.pop();
            item.destroy();
        }
    }
    add(soal) {
        let item = new ItemView(soal, this.cont);
        item.elHtml.onclick = () => {
            this.itemOnClick(item);
        };
        this.listItemView.push(item);
    }
}
export class ItemView extends BaseComponent {
    constructor(soal, cont) {
        super();
        this._template =
            `<button class='item'>
				<span class='label'>label</span>
			</button>`;
        this.build();
        this.labelEl = this.getEl('span.label');
        this.labelEl.innerHTML = soal.soal;
        this._soal = soal;
        this.attach(cont);
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
