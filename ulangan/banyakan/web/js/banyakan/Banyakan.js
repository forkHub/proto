import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
import { Template } from "../Template.js";
import { FeedbackEnum } from "../Feedback.js";
import { Game } from "../Game.js";
import { BaseComponent } from "../BaseComponent.js";
import { Bar } from "../Bar.js";
export class Banyakan extends BaseComponent {
    constructor() {
        super();
        this.angka1 = new Angka();
        this.angka2 = new Angka();
        this.angka3 = new Angka();
        this.acak = new Acak(10);
        this.soalidx = 0;
        this.bar = null;
        this._templateManager = null;
        this.selesai = null;
        this._nilai = 0;
        this._feedback = null;
        this._angkaSaja = false;
        this._jmlSoal = 2;
        this._template =
            `<div class='banyakan'>
				<div class='bar-cont'></div>
				<h1 class='perintah'>Mana Yang Lebih Banyak?</h1>
				<div class='cont'></div>
			</div>`;
        this.build();
        this._cont = this.getEl('div.cont');
        this.bar = new Bar();
        this.bar.attach(this.getEl('div.bar-cont'));
    }
    init() {
        this._templateManager = new Template();
        this.bar.onClick = () => {
            this.detach();
            Game.inst.menu.attach(Game.inst.cont);
        };
        this.acak.max = 10;
        this.acak.acak();
        console.log('init');
        this.selesai = Game.inst.selesai;
        this._feedback = Game.inst.feedback;
        this.angkaInit();
        this.resetSoal();
    }
    angkaInit() {
        this.angka1.view = this._templateManager.angka1;
        this._cont.appendChild(this.angka1.view);
        this.angka2.view = this._templateManager.angka2;
        this._cont.appendChild(this.angka2.view);
        this.angka1.view.onclick = () => {
            this.angka1Click();
        };
        this.angka2.view.onclick = () => {
            this.angka2Click();
        };
        this.angka3Init();
    }
    angka3Init() {
        // if (this._jmlSoal != 3) return;
        this.angka3.view = this._templateManager.angka3;
        this.angka3.angka = -1;
        this.angka3.view.onclick = () => {
            this.angka3Click();
        };
    }
    palingBesar(n) {
        if (this.angka1.angka != n && this.angka1.angka < n)
            return false;
        if (this.angka2.angka != n && this.angka2.angka < n)
            return false;
        if (this.angka3.angka != n && this.angka3.angka < n)
            return false;
        return true;
    }
    angka1Click() {
        if ((this.angka1.angka > this.angka2.angka) && (this.angka1.angka > this.angka3.angka)) {
            this._nilai++;
            this.feedbackBenarShow();
        }
        else {
            this.feedbackSalahShow();
        }
    }
    angka2Click() {
        if (this.angka2.angka > this.angka1.angka && (this.angka2.angka > this.angka3.angka)) {
            this._nilai++;
            this.feedbackBenarShow();
        }
        else {
            this.feedbackSalahShow();
        }
    }
    angka3Click() {
        if (this.angka3.angka > this.angka1.angka && (this.angka3.angka > this.angka2.angka)) {
            this._nilai++;
            this.feedbackBenarShow();
        }
        else {
            this.feedbackSalahShow();
        }
    }
    feedbackClick() {
        // console.log('feed back click');
        this._feedback.detach();
        this.soalidx++;
        this.bar.persen = (this.soalidx / 10) * 100;
        if (this.soalidx >= 10) {
            // console.log('feedback click ' + this.soalidx + '/nilai ' + this._nilai);
            this.selesai.attach(Game.inst.cont);
            this.selesai.onMulaiClick = () => {
                this.selesai.detach();
                this.mulaiLagi();
            };
            this.selesai.onMenuClick = () => {
                this.detach();
                // this.selesai.detach();
                Game.inst.menu.attach(Game.inst.cont);
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
    ambilAngka(n, n2) {
        while (true) {
            let res = this.acak.get();
            res++;
            if ((res != n) && (res != n2))
                return res;
        }
    }
    mulaiLagi() {
        this.resetSoal();
        this._nilai = 0;
        this.soalidx = 0;
        this.bar.persen = 0;
    }
    resetSoal() {
        this.acak.acak();
        this.angka1.angka = this.ambilAngka(-1, 1);
        this.angka2.angka = this.ambilAngka(this.angka1.angka, 1);
        if (this._jmlSoal == 3) {
            this.angka3.angka = this.ambilAngka(this.angka1.angka, this.angka2.angka);
        }
        else {
            this.angka3.angka = -1;
        }
        this.angka1.tulis(this._angkaSaja);
        this.angka2.tulis(this._angkaSaja);
        this.angka3.tulis(this._angkaSaja);
        // this.bar.persen = 0;
    }
    get angkaSaja() {
        return this._angkaSaja;
    }
    set angkaSaja(value) {
        this._angkaSaja = value;
    }
    get jmlSoal() {
        return this._jmlSoal;
    }
    set jmlSoal(value) {
        this._jmlSoal = value;
        if (this.angka3.view.parentElement) {
            this.angka3.view.parentElement.removeChild(this.angka3.view);
        }
        if (this._jmlSoal == 3) {
            this._cont.appendChild(this.angka3.view);
        }
    }
}