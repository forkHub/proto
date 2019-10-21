import { BaseComponent } from './ha/BaseComponent.js';
export class Tombol extends BaseComponent {
    constructor() {
        super();
        this._label = '';
        this._onClick = null;
        this._template = `<button class='tombol normal'></button>`;
    }
    onBuild() {
        this.onRender();
    }
    onRender() {
        this._elHtml.onclick = () => {
            this._onClick();
        };
        this._elHtml.innerText = this.label;
    }
    get label() {
        return this._label;
    }
    set label(str) {
        this._label = str;
        if (this._elHtml)
            this._elHtml.innerText = this._label;
    }
    get onClick() {
        return this._onClick;
    }
    set onClick(value) {
        this._onClick = value;
    }
}
