"use strict";
var ha;
(function (ha) {
    var core;
    (function (core) {
        class BaseComponent {
            constructor() {
                this._template = '';
                this._elHtml = document.createElement('div');
            }
            onRender() {
            }
            show(el) {
                if (!el) {
                    el = this._elHtml;
                }
                el.style.display = 'block';
            }
            hide(el) {
                if (!el) {
                    el = this._elHtml;
                }
                el.style.display = 'none';
            }
            getEl(query) {
                let el;
                el = this._elHtml.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(this._elHtml);
                    console.log(query);
                    throw new Error('query not found ');
                }
            }
            render(parent) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                parent.appendChild(el);
                this.onRender();
            }
            get template() {
                return this._template;
            }
            get elHtml() {
                return this._elHtml;
            }
            set elHtml(value) {
                this._elHtml = value;
            }
        }
        core.BaseComponent = BaseComponent;
    })(core = ha.core || (ha.core = {}));
})(ha || (ha = {}));
