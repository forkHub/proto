import { BaseComponent } from "./BaseComponent.js";

export class TombolMenu extends BaseComponent {
	private labelP: HTMLParagraphElement = null;
	private descP: HTMLParagraphElement = null;
	private _idx: number = 0;

	constructor() {
		super();
		this._template = `<button class='normal menu'>
							<p class='label'></p>
							<p class='description'></p>
						</button>`;
		this.build();

		this.labelP = this.getEl('p.label') as HTMLParagraphElement;
		this.descP = this.getEl('p.description') as HTMLParagraphElement;

	}

	public set onClick(value: Function) {
		this._elHtml.onclick = (e: MouseEvent) => {
			value(e);
		}
	}

	public set label(value: string) {
		this.labelP.innerHTML = value;
	}

	public set desc(value: string) {
		this.descP.innerHTML = value;
	}

	public get idx(): number {
		return this._idx;
	}

	public set idx(value: number) {
		this._idx = value;
	}

}