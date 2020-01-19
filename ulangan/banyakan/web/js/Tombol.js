import { BaseComponent } from "./BaseComponent.js";
export class TombolMenu extends BaseComponent {
    constructor() {
        super();
        this.labelP = null;
        this.descP = null;
        this._idx = 0;
        this._template = `<button class='normal menu'>
							<p class='label'></p>
							<p class='description'></p>
						</button>`;
        this.build();
        this.labelP = this.getEl('p.label');
        this.descP = this.getEl('p.description');
    }
    set onClick(value) {
        this._elHtml.onclick = (e) => {
            value(e);
        };
    }
    set label(value) {
        this.labelP.innerHTML = value;
    }
    set desc(value) {
        this.descP.innerHTML = value;
    }
    get idx() {
        return this._idx;
    }
    set idx(value) {
        this._idx = value;
    }
}
