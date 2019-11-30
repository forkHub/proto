import { Angka } from "./Angka.js";
import { Dom } from "../Dom.js";
import { Acak } from "../Acak.js";
import { Selesai } from "../Selesai.js";
import { Template } from "../Template.js";
import { Feedback, FeedbackEnum } from "../Feedback.js";
import { Page } from "./Page.js";
export class Banyakan {
    constructor() {
        this.angka1 = new Angka();
        this.angka2 = new Angka();
        this.acak = new Acak(10);
        this.soalidx = 1;
        this._template = null;
        this._cont = null;
        this.selesai = null;
        this._nilai = 0;
        this._feedback = null;
        this._pageCont = null;
        Banyakan._inst = this;
        window.onload = () => {
            this.init();
        };
        this._pageCont = new Page();
    }
    init() {
        this._template = new Template();
        this.acak.max = 10;
        this.acak.acak();
        console.log('init');
        this._cont = Dom.getEl(document.body, 'div.cont');
        this.selesai = new Selesai();
        this.selesai.init();
        this.feedbackInit();
        this.angkaInit();
        this.resetSoal();
        this._pageCont.attach(this._cont);
    }
    angkaInit() {
        this.angka1.view = this._template.angka1;
        this._pageCont.cont.appendChild(this.angka1.view);
        this.angka2.view = this._template.angka2;
        this._pageCont.cont.appendChild(this.angka2.view);
        this.angka1.view.onclick = () => {
            if (this.angka1.angka > this.angka2.angka) {
                this._nilai++;
                this.feedbackBenarShow();
            }
            else {
                this.feedbackSalahShow();
            }
        };
        this.angka2.view.onclick = () => {
            if (this.angka2.angka > this.angka1.angka) {
                this._nilai++;
                this.feedbackBenarShow();
            }
            else {
                this.feedbackSalahShow();
            }
        };
    }
    feedbackInit() {
        this._feedback = new Feedback();
        this._feedback.onClick = () => {
            this.feedbackClick();
        };
        this._feedback.init();
    }
    feedbackClick() {
        console.log('feed back click');
        this.feedbackHide();
        this.soalidx++;
        if (this.soalidx >= 11) {
            console.log('feedback click ' + this.soalidx + '/nilai ' + this.nilai);
            this.selesai.tampil(this._cont);
        }
        else {
            this.resetSoal();
        }
    }
    feedbackSalahShow() {
        this.feedbackHide();
        this._feedback.attach(this._cont);
        this._feedback.label = "Jawaban Salah";
        this._feedback.type = FeedbackEnum.SALAH;
    }
    feedbackBenarShow() {
        this.feedbackHide();
        this._feedback.attach(this._cont);
        this._feedback.label = 'Jawaban Benar';
        this._feedback.type = FeedbackEnum.BENAR;
    }
    ambilAngka(n) {
        while (true) {
            let res = this.acak.get();
            if ((res + 1) != n)
                return res + 1;
        }
    }
    mulaiLagi() {
        this.resetSoal();
        this._nilai = 0;
    }
    resetSoal() {
        this.acak.acak();
        this.angka1.angka = this.ambilAngka(-1);
        this.angka2.angka = this.ambilAngka(this.angka1.angka);
        this.angka1.tulis();
        this.angka2.tulis();
        // this._nilai = 0;
    }
    feedbackHide() {
        // console.log('feedback hide');
        // this.feedbackBenar.style.display = 'none';
        // this.feedbackSalah.style.display = 'none';
        this._feedback.detach();
    }
    // constructor() {
    // }
    static get inst() {
        return Banyakan._inst;
    }
    get template() {
        return this._template;
    }
    get nilai() {
        return this._nilai;
    }
    get feedback() {
        return this._feedback;
    }
}
Banyakan._inst = null;
new Banyakan();
