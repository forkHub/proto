import { BaseComponent } from "./BaseComponent.js";
// import { Banyakan } from "./banyakan/Banyakan.js";
import { Game } from "../Game.js";
export class Feedback extends BaseComponent {
    constructor() {
        super();
        this.labelP = null;
        this.button = null;
        this._elHtml = Game.inst.template.feedback;
        this.button = this.getEl('button');
        this.labelP = this.getEl('p.feedback');
    }
    tampil() {
        this.attach(Game.inst.cont);
    }
    init() {
    }
    get label() {
        return this.labelP.innerHTML;
    }
    set label(value) {
        this.labelP.innerHTML = value;
    }
    set onClick(value) {
        this._onClick = value;
        console.log('feedbacak set on click ');
        this.button.onclick = () => {
            console.log('feedback on click');
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
