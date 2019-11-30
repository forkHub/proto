import { BaseComponent } from "../BaseComponent.js";

export class Page extends BaseComponent {
	private _cont: HTMLDivElement = null;

	constructor() {
		super();
		this._template =
			`<div class='banyakan'>
				<h1 class='perintah'>Mana Yang Lebih Banyak?</h1>
				<div class='cont'></div>
			</div>`;
		this.build();
		this._cont = this.getEl('div.cont') as HTMLDivElement;
	}

	public get cont(): HTMLDivElement {
		return this._cont;
	}
}