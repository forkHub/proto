import { BaseComponent } from "./ha/BaseComponent.js";
export class Dialog extends BaseComponent {
    constructor() {
        super();
        this._contentEl = null;
        this._tutupBtn = null;
        this._okBtn = null;
        this._batalBtn = null;
        this._footerEl = null;
        this._template = `
			<div class='ha-dialog'>
				<div class='box'>
					<div class='header'>
						<button class='tutup'> X </button>
					</div>
					<div class='content'>
					</div>
					<div class='footer'>
						<button class='ok'>Ya</button>
						<button class='batal'>Tidak</button>
					</div>
				</div>
			</div>
		`;
        this.build();
        this._contentEl = this.getEl('div.content');
        this._tutupBtn = this.getEl('button.tutup');
        this._okBtn = this.getEl('button.ok');
        this._batalBtn = this.getEl('button.batal');
        this._footerEl = this.getEl('div.footer');
        this._elHtml.onclick = (e) => {
            e.stopPropagation();
            this.detach();
            console.log('dialog click');
        };
        this._tutupBtn.onclick = (e) => {
            e.stopPropagation();
            this.detach();
        };
    }
    show() {
        document.body.appendChild(this._elHtml);
    }
    hide() {
        this.detach();
    }
    footerClear() {
        while (this._footerEl.childElementCount > 0) {
            this._footerEl.removeChild(this._footerEl.firstChild);
        }
    }
    setAsOK() {
        this.footerClear();
        this._footerEl.appendChild(this._okBtn);
        this._okBtn.innerText = 'OK';
    }
    setAsYN() {
        this.footerClear();
        this._footerEl.appendChild(this._okBtn);
        this._footerEl.appendChild(this._batalBtn);
        this._okBtn.innerText = 'Ya';
        this._batalBtn.innerText = 'Tidak';
    }
    get contentEl() {
        return this._contentEl;
    }
    get tutupBtn() {
        return this._tutupBtn;
    }
    get batalBtn() {
        return this._batalBtn;
    }
    get okBtn() {
        return this._okBtn;
    }
}
