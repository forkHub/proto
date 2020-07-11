"use strict";
class BaseComponent {
    constructor() {
        this._template = '';
        this._elHtml = document.createElement('div');
    }
    onRender() {
    }
    onAttach() {
    }
    onBuild() {
    }
    onDetach() {
    }
    mulai(...params) {
        params;
    }
    selesai() {
    }
    destroy() {
    }
    attach(parent) {
        parent.appendChild(this._elHtml);
        this._parent = parent;
        this.onAttach();
    }
    detach() {
        if (this._elHtml.parentElement) {
            this._elHtml.parentElement.removeChild(this._elHtml);
            this.onDetach();
            return true;
        }
        this.onDetach();
        return false;
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
        let div = document.createElement('div');
        let el;
        div.innerHTML = this._template;
        el = div.firstElementChild;
        this._elHtml = el;
        if (!this._elHtml)
            throw new Error('');
        this.onBuild();
    }
    getTemplate(query) {
        let template = document.body.querySelector('template').content;
        return template.querySelector(query).cloneNode(true);
    }
    // render(parent: HTMLElement): void {
    // 	let div: HTMLElement = document.createElement('div');
    // 	let el: HTMLElement;
    // 	div.innerHTML = this._template;
    // 	el = div.firstElementChild as HTMLElement;
    // 	this._elHtml = el;
    // 	if (parent) {
    // 		parent.appendChild(el);
    // 		this._parent = parent;
    // 	}
    // 	this.onRender();
    // }
    // public get template() {
    // 	return this._template;
    // }
    // public set template(str: string) {
    // 	this._template = str; 
    // }
    get elHtml() {
        return this._elHtml;
    }
}
