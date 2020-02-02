export class BaseComponent {
	protected _template: string = '';
	protected _elHtml: HTMLElement = document.createElement('div');
	protected _parent: HTMLElement;

	onRender(): void {

	}

	onBuild(): void {

	}

	onAttach(): void {

	}

	onDetach(): void {

	}

	onShow(): void {

	}

	onHide(): void {

	}

	attach(parent: HTMLElement): void {
		parent.appendChild(this._elHtml);
		this._parent = parent;
		this.onAttach();
	}

	detach(): void {
		if (this._elHtml.parentElement) {
			this._elHtml.parentElement.removeChild(this._elHtml);
		}
		this.onDetach();
	}

	show(el?: HTMLElement): void {
		if (!el) {
			el = this._elHtml;
		}

		el.style.display = 'block';
		this.onShow();
	}

	hide(el?: HTMLElement): void {
		if (!el) {
			el = this._elHtml;
		}

		el.style.display = 'none';
		this.onHide();
	}


	build(): void {
		let div: HTMLElement = document.createElement('div');
		let el: HTMLElement;

		div.innerHTML = this._template;

		el = div.firstElementChild as HTMLElement;

		if (el == null) {
			console.log(this._template);
			throw new Error('failed to build el');
		}

		this._elHtml = el;

		this.onBuild();
	}

	getEl2(query: string, idx: number = 0): HTMLElement {
		let el: NodeListOf<HTMLElement>;

		el = this._elHtml.querySelectorAll(query);

		if (el) {
			return el[idx];
		} else {
			console.log(this._elHtml);
			console.log(query);
			throw new Error('query not found ');
		}

	}

	getEl(query: string): HTMLElement {
		let el: HTMLElement;

		el = this._elHtml.querySelector(query);

		if (el) {
			return el
		} else {
			console.log(this._elHtml);
			console.log(query);
			throw new Error('query not found ');
		}
	}

	render(parent: HTMLElement): void {
		this.build();
		this.attach(parent);
		this._parent = parent;
		this.onRender();
	}

	public get template() {
		return this._template;
	}

	public set template(str: string) {
		this._template = str;
	}

	public get elHtml(): HTMLElement {
		return this._elHtml;
	}
	public set elHtml(value: HTMLElement) {
		this._elHtml = value;
	}

}
