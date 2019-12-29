import { BaseComponent } from "./BaseComponent.js";
export class Bar extends BaseComponent {
    constructor() {
        super();
        // private _persen: number = null;
        this._onClick = null;
        this.tahapEl = null;
        this.tombolEl = null;
        this._template = `
			<div class='bar'>
				<button class='tutup'>X</button>
				<div class='bar'>
					<div class='tahap'></div>
				</div>
			</bar>
		`;
        this.build();
        this.tombolEl = this.getEl('button.tutup');
        this.tahapEl = this.getEl('div.bar div.tahap');
        this.tombolEl.onclick = () => {
            this._onClick();
        };
    }
    get onClick() {
        return this._onClick;
    }
    set onClick(value) {
        this._onClick = value;
    }
    set persen(value) {
        this.tahapEl.style.width = value + '%';
    }
    persen2(value, max) {
        this.persen = Math.floor((value / max) * 100);
    }
}
