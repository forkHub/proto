import { BaseComponent } from "./ha/BaseComponent.js";
export class ModalContainer extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='modal-cont'>

			</div>
		`;
    }
    show() {
        this.elHtml.style.visibility = 'visible';
    }
    hide() {
        this.elHtml.style.visibility = 'hidden';
    }
}
