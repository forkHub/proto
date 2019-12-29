export class BaseComponent {
    constructor() {
        this._template = '';
        this._elHtml = document.createElement('div');
    }
    onRender() {
    }
    onBuild() {
    }
    onAttach() {
    }
    onDetach() {
    }
    onShow() {
    }
    onHide() {
    }
    attach(parent) {
        parent.appendChild(this._elHtml);
        this._parent = parent;
        this.onAttach();
    }
    detach() {
        if (this._elHtml.parentElement) {
            this._elHtml.parentElement.removeChild(this._elHtml);
        }
        this.onDetach();
    }
    show(el) {
        if (!el) {
            el = this._elHtml;
        }
        el.style.display = 'block';
        this.onShow();
    }
    hide(el) {
        if (!el) {
            el = this._elHtml;
        }
        el.style.display = 'none';
        this.onHide();
    }
    build() {
        let div = document.createElement('div');
        let el;
        div.innerHTML = this._template;
        el = div.firstElementChild;
        if (el == null) {
            console.log(this._template);
            throw new Error('failed to build el');
        }
        this._elHtml = el;
        this.onBuild();
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
        this.build();
        this.attach(parent);
        this._parent = parent;
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
