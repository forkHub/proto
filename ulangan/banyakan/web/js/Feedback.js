import { BaseComponent } from "./BaseComponent.js";
export class Feedback extends BaseComponent {
    constructor() {
        super();
        this.labelP = null;
        this.button = null;
        this._template = `
			<div class='feedback'>
				<div class='cont'>
					<p class='feedback'>Jawaban kamu benar</p>
					<P class='jawaban'></p>
					<button class='normal'>soal berikutnya</button>
				</div>
			</div>
		`;
        this.build();
        this.button = this.getEl('button');
        this.labelP = this.getEl('p.feedback');
    }
    onAttach() {
        this.button.focus();
    }
    init() {
    }
    get jawapP() {
        return this.getEl('p.jawaban');
    }
    get label() {
        return this.labelP.innerHTML;
    }
    set label(value) {
        this.labelP.innerHTML = value;
    }
    set onClick(value) {
        this._onClick = value;
        this.button.onclick = () => {
            this.button.blur();
            this.detach();
            this._onClick();
        };
    }
    set type(value) {
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
export var FeedbackEnum;
(function (FeedbackEnum) {
    FeedbackEnum[FeedbackEnum["BENAR"] = 0] = "BENAR";
    FeedbackEnum[FeedbackEnum["SALAH"] = 1] = "SALAH";
})(FeedbackEnum || (FeedbackEnum = {}));
