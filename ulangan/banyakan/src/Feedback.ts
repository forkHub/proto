import { BaseComponent } from "./BaseComponent.js";
// import { Banyakan } from "./banyakan/Banyakan.js";
import { Game } from "../Game.js";

export class Feedback extends BaseComponent {

	private labelP: HTMLParagraphElement = null;
	private button: HTMLButtonElement = null;
	private _onClick: Function;

	constructor() {
		super();
		this._elHtml = Game.inst.template.feedback;
		this.button = this.getEl('button') as HTMLButtonElement;
		this.labelP = this.getEl('p.feedback') as HTMLParagraphElement;
	}

	tampil(): void {
		this.attach(Game.inst.cont);
	}


	init(): void {

	}

	public get label(): string {
		return this.labelP.innerHTML;
	}
	public set label(value: string) {
		this.labelP.innerHTML = value;
	}

	public set onClick(value: Function) {
		this._onClick = value;

		// console.log('feedbacak set on click ');

		this.button.onclick = () => {
			// console.log('feedback on click');
			this.detach();
			this._onClick();
		}
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