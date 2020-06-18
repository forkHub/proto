import { BaseComponent } from "../ha/BaseComponent.js";
import { ListItem } from "./ListITem.js";
export class List extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='list'>
				<p>Pilih Anggota:</p>
				<div class='list-cont'>
				</div>
				<br/>
				<button class='ok'>ok</button>
			</div>
		`;
        this.build();
    }
    get itemDipilih() {
        return this._itemDipilih;
    }
    destroy() {
        // this._itemDipilih = null;
        // this._elHtml.innerText = '';
        // this._elHtml = null;
    }
    render(list) {
        list.forEach((itemRef) => {
            let item = new ListItem();
            item.namaSpan.innerHTML = itemRef.nama;
            item.anggota = itemRef;
            item.onClick = () => {
                this._itemDipilih = item;
                // console.log('item selected');
                // console.log(item.anggota);
                // console.log(this._itemDipilih);
            };
            item.attach(this.cont);
        });
    }
    get okTbl() {
        return this.getEl('button.ok');
    }
    get cont() {
        return this.getEl('div.list-cont');
    }
}
