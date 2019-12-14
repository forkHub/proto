import { BaseComponent } from "./BaseComponent.js";
export class TombolMenu extends BaseComponent {
    constructor() {
        super();
        this._template = `<button class='normal menu'></button>`;
        this.build();
    }
    set onClick(value) {
        this._elHtml.onclick = (e) => {
            value(e);
        };
    }
    set label(value) {
        this._elHtml.innerHTML = value;
    }
}
