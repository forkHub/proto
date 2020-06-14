import { BaseComponent } from "./ha/BaseComponent.js";
export class Alert extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='alert back'>
				<div class='box'>
					<div class='text'>
					</div>
					<button type='button' class='btn btn-primary ok'>OK</button>
				</div>
			</div>
		`;
        this.build();
    }
    get text() {
        return this.getEl('div.box div.text');
    }
    get okTbl() {
        return this.getEl('button.ok');
    }
}
