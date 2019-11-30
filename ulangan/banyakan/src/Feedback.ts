import { BaseComponent } from "./BaseComponent.js";
import { Banyakan } from "./banyakan/Banyakan.js";

export class Feedback extends BaseComponent {

	private labelP: HTMLParagraphElement = null;
	private button: HTMLButtonElement = null;
	private _onClick: Function;

	constructor() {
		super();
		this._elHtml = Banyakan.inst.template.feedback;
		this.button = this.getEl('button') as HTMLButtonElement;
		this.labelP = this.getEl('p.feedback') as HTMLParagraphElement;
	}


	init(): void {
		this.button.onclick = () => {
			this._onClick();
		}
	}

	public get label(): string {
		return this.labelP.innerHTML;
	}
	public set label(value: string) {
		this.labelP.innerHTML = value;
	}

	public get onClick(): Function {
		return this._onClick;
	}
	public set onClick(value: Function) {
		this._onClick = value;
	}
	public set type(value: number) {
		if (value == FeedbackEnum.BENAR) {
			this.getEl('div.cont').style.backgroundColor = '#b2fa91';
		}
		else if (value == FeedbackEnum.SALAH) {
			this.getEl('div.cont').style.backgroundColor = '#ff9999';
		}
		else {
			throw new Error();
		}
	}


}

export enum FeedbackEnum {
	BENAR,
	SALAH
}