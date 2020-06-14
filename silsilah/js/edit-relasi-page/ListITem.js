import { BaseComponent } from "../ha/BaseComponent.js";
export class ListItem extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item'>
				<span class='nama'></span>
			</div>
		`;
        this.build();
        this._elHtml.onclick = () => {
            // console.log('item on click');
            this._parent.querySelectorAll('div.dipilih').forEach((item) => {
                item.classList.remove('dipilih');
            });
            this._elHtml.classList.add('dipilih');
            this._onClick();
        };
    }
    get onClick() {
        return this._onClick;
    }
    set onClick(value) {
        this._onClick = value;
    }
    get anggota() {
        return this._anggota;
    }
    set anggota(value) {
        this._anggota = value;
    }
    get namaSpan() {
        return this.getEl('span.nama');
    }
}
