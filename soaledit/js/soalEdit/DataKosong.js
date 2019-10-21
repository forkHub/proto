import { BaseComponent } from "./ha/BaseComponent.js";
export class DataKosong extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div>
				<h1>Belum Ada Data</h1>
				<h3>Silahkan buat data dengan mengklik tombol di sebelah kanan</h3>
			</div>
		`;
        this.build();
    }
}
