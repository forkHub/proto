import { BaseComponent } from "../../comp/BaseComponent.js";
export class Input extends BaseComponent {
    constructor(label, value, f) {
        super();
        this._template = `
            <div>
                <label>${label}</label><br/>
                <input type="number" value="${value}">
            </div>
        `;
        this.build();
        this.input.oninput = (e) => {
            e.stopPropagation();
            e.preventDefault();
            f();
        };
    }
    get input() {
        return this.getEl('input');
    }
}
export class Label extends BaseComponent {
    constructor(label) {
        super();
        this._template = `
            <div>
                <label>${label}</label>
            </div>
        `;
        this.build();
    }
    get label() {
        return this.getEl('label');
    }
}
export class Pemisah extends BaseComponent {
    constructor() {
        super();
        this._template = `
            <div>
                <hr/>
            </div>
        `;
        this.build();
    }
    get hr() {
        return this.getEl('hr');
    }
}
