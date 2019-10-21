import { BaseComponent } from './ha/BaseComponent.js';
export class Input extends BaseComponent {
    constructor() {
        super();
        this.labelEl = null;
        this.inputEl = null;
        this.tombolEl = null;
        this.validasiEl = null;
        this._onClick = null;
        this._template = `
			<div class='input-umum'>
				<p class="label"></p>
				<input type='text' required></input>
				<p class="validasi"></p>
				<button>Ok</button>
			</div>
		`;
        this.build();
    }
    validateNama() {
        if (this.inputEl.value.length == 0) {
            this.validasiEl.innerText = "Nama tidak boleh kosong";
            this.validasiEl.style.display = "block";
            return false;
        }
        this.validasiEl.style.display = "none";
        return true;
    }
    onBuild() {
        this.labelEl = this.getEl('p.label');
        this.inputEl = this.getEl('input');
        this.tombolEl = this.getEl('button');
        this.validasiEl = this.getEl("p.validasi");
        this.tombolEl.onclick = () => {
            console.log('tombol click, nama ' + this.nama);
            if (this.validateNama()) {
                this._onClick(this.nama);
            }
        };
    }
    update() {
        if (this.labelEl)
            this.labelEl.innerText = this.label;
        if (this.inputEl)
            this.inputEl.value = this.nama;
    }
    set onClick(value) {
        this._onClick = value;
    }
    get label() {
        return this.labelEl.innerText;
    }
    set label(value) {
        this.labelEl.innerText = value;
    }
    get nama() {
        return this.inputEl.value;
    }
    set nama(value) {
        // this._nama = value;
        this.inputEl.value = value;
        this.update();
    }
}
