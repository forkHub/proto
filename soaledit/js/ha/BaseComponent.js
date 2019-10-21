export class BaseComponent {
    constructor() {
        this._template = '';
        this._elHtml = document.createElement('div');
    }
    onRender() {
    }
    attach(parent) {
        parent.appendChild(this._elHtml);
        this._parent = parent;
    }
    detach() {
        this._parent.removeChild(this._elHtml);
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
    build() {
        this.render(null);
    }
    render(parent) {
        let div = document.createElement('div');
        let el;
        div.innerHTML = this._template;
        el = div.firstElementChild;
        this._elHtml = el;
        if (parent) {
            parent.appendChild(el);
            this._parent = parent;
        }
        this.onRender();
    }
    get template() {
        return this._template;
    }
    set template(str) {
        this._template = str;
    }
    get elHtml() {
        return this._elHtml;
    }
    set elHtml(value) {
        this._elHtml = value;
    }
}
