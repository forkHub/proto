import { BaseComponent } from "../BaseComponent.js";
export class Page extends BaseComponent {
    constructor() {
        super();
        this._cont = null;
        this._template =
            `<div class='banyakan'>
				<h1 class='perintah'>Mana Yang Lebih Banyak?</h1>
				<div class='cont'></div>
			</div>`;
        this.build();
        this._cont = this.getEl('div.cont');
    }
    get cont() {
        return this._cont;
    }
}
