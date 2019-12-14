import { BaseComponent } from "./BaseComponent.js";

export class TombolMenu extends BaseComponent {
	constructor() {
		super();
		this._template = `<button class='normal menu'></button>`;
		this.build();
	}

	public set onClick(value: Function) {
		this._elHtml.onclick = (e: MouseEvent) => {
			value(e);
		}
	}

	public set label(value: string) {
		this._elHtml.innerHTML = value;
	}

}