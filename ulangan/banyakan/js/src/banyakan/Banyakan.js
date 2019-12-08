import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
import { Template } from "../Template.js";
import { FeedbackEnum } from "../Feedback.js";
import { Page } from "./Page.js";
import { Game } from "../../Game.js";
export class Banyakan {
    constructor() {
        // Banyakan._inst = this;
        this.angka1 = new Angka();
        this.angka2 = new Angka();
        this.acak = new Acak(10);
        this.soalidx = 0;
        this._template = null;
        this.selesai = null;
        this._nilai = 0;
        this._feedback = null;
        this._pageCont = null;
        this._angkaSaja = false;
        // window.onload = () => {
        // 	this.init();
        // }
        this._pageCont = new Page();
    }
    init() {
        this._template = new Template();
        this.acak.max = 10;
        this.acak.acak();
        console.log('init');
        this.selesai = Game.inst.selesai;
        this._feedback = Game.inst.feedback;
        this.angkaInit();
        this.resetSoal();
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
    feedbackClick() {
        console.log('feed back click');
        this._feedback.detach();
        this.soalidx++;
        if (this.soalidx >= 10) {
            console.log('feedback click ' + this.soalidx + '/nilai ' + this._nilai);
            this.selesai.attach();
            this.selesai.onClick = () => {
                this.selesai.detach();
                this.mulaiLagi();
            };
            this.selesai.nilai = this._nilai;
        }
        else {
            this.resetSoal();
        }
    }
    feedbackSalahShow() {
        this._feedback.attach(Game.inst.cont);
        this._feedback.label = "Jawaban Salah";
        this._feedback.type = FeedbackEnum.SALAH;
        this._feedback.onClick = () => {
            this.feedbackClick();
        };
    }
    feedbackBenarShow() {
        this._feedback.attach(Game.inst.cont);
        this._feedback.label = 'Jawaban Benar';
        this._feedback.type = FeedbackEnum.BENAR;
        this._feedback.onClick = () => {
            this.feedbackClick();
        };
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
        this.soalidx = 0;
    }
    resetSoal() {
        this.acak.acak();
        this.angka1.angka = this.ambilAngka(-1);
        this.angka2.angka = this.ambilAngka(this.angka1.angka);
        this.angka1.tulis();
        this.angka2.tulis();
    }
    get angkaSaja() {
        return this._angkaSaja;
    }
    set angkaSaja(value) {
        this._angkaSaja = value;
    }
    get pageCont() {
        return this._pageCont;
    }
}
