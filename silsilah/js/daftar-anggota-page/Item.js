import { BaseComponent } from "../ha/BaseComponent.js";
export class Item extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='list-item card'>
				<div class='card-body'>
					<p class='nama'></p>
					<div class='group-tbl sembunyi'>
						<button type="button" class='btn btn-primary edit'>edit</button>
						<button type="button" class='btn btn-secondary silsilah'>silsilah</button>
						<button type="button" class='btn btn-danger hapus'>hapus</button>
					</div>
				</div>
			</div>
		`;
        this.build();
    }
    get groupTbl() {
        return this.getEl('div.group-tbl');
    }
    get namaP() {
        return this.getEl('p.nama');
    }
    get editTbl() {
        return this.getEl('button.edit');
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
    get silsilahTbl() {
        return this.getEl('button.silsilah');
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
}
