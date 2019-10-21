import { BaseComponent } from '../../ha/BaseComponent.js';
export class CatListItemView extends BaseComponent {
    constructor() {
        super();
        this._onClick = null;
        this._label = '';
        this.tblEl = null;
        this._category = null;
        this._template = `<div class='cat-view'><button class=''></button></div>`;
    }
    destroy() {
        this.detach();
        this._onClick = null;
        this.tblEl.onclick = null;
        this._elHtml = null;
        this.tblEl = null;
        this._category = null;
        this._label = null;
    }
    select() {
        this._elHtml.classList.add('selected');
    }
    deselect() {
        this._elHtml.classList.remove('selected');
    }
    onRender() {
        this.tblEl = this.getEl('button');
        this.tblEl.innerText = this._label;
        this.tblEl.onclick = () => {
            this._onClick(this);
        };
        // console.log('cat list item view on render, tbl ' + this.tblEl);
    }
    get onClick() {
        return this._onClick;
    }
    set onClick(value) {
        this._onClick = value;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
        // console.log('cat list item view set label, label ' + value + '/tbl el ' + this.tblEl);
        if (this.tblEl) {
            // console.log('tbl el updated ' + value)
            this.tblEl.innerText = value;
        }
    }
    get category() {
        return this._category;
    }
    set category(value) {
        this._category = value;
    }
}
