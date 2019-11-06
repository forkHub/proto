"use strict";
var ha;
(function (ha) {
    var comm;
    (function (comm) {
        class Edit extends ha.core.BaseComponent {
            constructor() {
                super();
                this._data = new Data();
                this._data.comp = this;
                this._template = `
                <div class='ha-edit'>
                    <input type='text' class='input'/><br/>
                    <div class='btn-container'>
                        <button class='save'>save</button>
                        <button class='cancel'>cancel</button>
                    </div>
                </div>
            `;
            }
            get data() {
                return this._data;
            }
            onRender() {
                this._data.buttonSaveEl = this.getEl('button.save');
                this._data.buttonCancelEl = this.getEl('button.cancel');
                this._data.buttonContEl = this.getEl('div.btn-container');
                this._data.inputEl = this.getEl('input.input');
                this._elHtml.style.backgroundColor = 'white';
                this._elHtml.addEventListener('mouseenter', () => {
                    console.log('mouse over');
                    this.show(this._data.buttonContEl);
                });
                this._elHtml.addEventListener('mouseleave', () => {
                    console.log('mouse leave');
                    this.hide(this._data.buttonContEl);
                });
                this._data.buttonSaveEl.addEventListener('click', () => {
                    this._data.onSave(this._data.inputEl.value);
                    this.hide(this._data.buttonContEl);
                });
                this.data.buttonCancelEl.addEventListener('click', () => {
                    this.hide(this._data.buttonContEl);
                });
                this._data.inputEl.addEventListener('focus', () => {
                    this.show(this._data.buttonContEl);
                });
                this.hide(this._data.buttonContEl);
            }
        }
        comm.Edit = Edit;
        class Data {
            get comp() {
                return this._comp;
            }
            set comp(value) {
                this._comp = value;
            }
            get dirty() {
                return this._dirty;
            }
            set dirty(value) {
                this._dirty = value;
            }
            get buttonContEl() {
                return this._buttonContEl;
            }
            set buttonContEl(value) {
                this._buttonContEl = value;
            }
            get onSave() {
                return this._onSave;
            }
            set onSave(value) {
                this._onSave = value;
            }
            get inputEl() {
                return this._inputEl;
            }
            set inputEl(value) {
                this._inputEl = value;
            }
            get buttonCancelEl() {
                return this._buttonCancelEl;
            }
            set buttonCancelEl(value) {
                this._buttonCancelEl = value;
            }
            get buttonSaveEl() {
                return this._buttonSaveEl;
            }
            set buttonSaveEl(value) {
                this._buttonSaveEl = value;
            }
        }
    })(comm = ha.comm || (ha.comm = {}));
})(ha || (ha = {}));
