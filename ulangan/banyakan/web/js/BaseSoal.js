import { BaseComponent } from "./BaseComponent.js";
import { Bar } from "./Bar.js";
import { Feedback, FeedbackEnum } from "./Feedback.js";
import { Selesai } from "./Selesai.js";
export class BaseSoal extends BaseComponent {
    constructor() {
        super();
        this.jmlSoal = 10;
        this.bar = null;
        this._feedback = null;
        this.selesai = null;
        this.soalIdx = 0;
        this.nilai = 0;
        this.onSelesai = null;
        this.query = [];
        this.selesai = new Selesai();
        this._feedback = new Feedback();
        this.getUrl();
        console.log('query');
        console.log(this.query);
        this.bar = new Bar();
    }
    getUrl() {
        let url = window.location.search.slice(1);
        let kv = [];
        let kv2 = [];
        console.log('url ' + url);
        if (url && url.length > 0) {
            kv = url.split('&');
            console.log('kv');
            console.log(kv);
            if (kv && kv.length > 0) {
                for (let i = 0; i < kv.length; i++) {
                    kv2 = kv[i].split('=');
                    console.log('kv[i]');
                    console.log(kv[i]);
                    console.log('kv2');
                    console.log(kv2);
                    console.log('');
                    if (2 == kv2.length) {
                        this.query.push(new Query(kv2[0], kv2[1]));
                    }
                }
            }
        }
    }
    init() {
        this.bar.onClick = () => {
            window.location.href = './index.html';
        };
        this.selesai.init();
        this.selesai.onMulaiClick = () => {
            this.mulai();
        };
        this.selesai.onMenuClick = () => {
            window.location.href = './index.html';
        };
        this._feedback.init();
    }
    reset() {
    }
    mulai() {
    }
    check() {
        return true;
    }
    userJawab() {
    }
    feedbackClick(cont) {
        console.log('feedback click');
        this._feedback.detach();
        if (this.soalIdx >= this.jmlSoal) {
            this.selesai.attach(cont);
            this.selesai.nilai = this.nilai;
        }
        else {
            this.reset();
        }
    }
    feedbackSalahShow(cont) {
        this._feedback.attach(cont);
        this._feedback.label = "Jawaban Salah";
        this._feedback.type = FeedbackEnum.SALAH;
        this._feedback.onClick = () => {
            this.feedbackClick(cont);
        };
    }
    feedbackBenarShow(cont) {
        this._feedback.attach(cont);
        this._feedback.label = 'Jawaban Benar';
        this._feedback.type = FeedbackEnum.BENAR;
        this._feedback.onClick = () => {
            this.feedbackClick(cont);
        };
    }
}
export class Query {
    constructor(key, value) {
        this._key = '';
        this._value = '';
        this._key = key;
        this._value = value;
    }
    get key() {
        return this._key;
    }
    get value() {
        return this._value;
    }
}
