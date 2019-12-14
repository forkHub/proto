import { BaseComponent } from "./BaseComponent.js";

export class Bar extends BaseComponent {
	// private _persen: number = null;
	private _onClick: Function = null;
	private tahapEl: HTMLDivElement = null;
	private tombolEl: HTMLButtonElement = null;

	public get onClick(): Function {
		return this._onClick;
	}
	public set onClick(value: Function) {
		this._onClick = value;
	}

	public set persen(value: number) {
		this.tahapEl.style.width = value + '%';
	}

	constructor() {
		super();
		this._template = `
			<div class='bar'>
				<button class='tutup'>X</button>
				<div class='bar'>
					<div class='tahap'></div>
				</div>
			</bar>
		`;
		this.build();
		this.tombolEl = this.getEl('button.tutup') as HTMLButtonElement;
		this.tahapEl = this.getEl('div.bar div.tahap') as HTMLDivElement;

		this.tombolEl.onclick = () => {
			this._onClick();
		}
	}
}