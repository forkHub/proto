import { BaseComponent } from "../BaseComponent";

export class Urutkan extends BaseComponent {
	constructor() {
		super();
		this._template = `
			<div class='urutkan'>
				<div class='terima'></div>
				<div class='asal'></div>
			</div>
		`;
	}

}