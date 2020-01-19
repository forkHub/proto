// import { BaseComponent } from "../BaseComponent.js";
// import { Feedback, FeedbackEnum } from "../Feedback.js";
// import { Selesai } from "../Selesai.js";
// import { IBaseSoal, BaseSoal } from "../BaseSoal.js";
// import { Bar } from "../Bar.js";
import { Game } from "../Game.js";
import { Acak } from "../Acak.js";
import { BaseSoal } from "../BaseSoal.js";
export class BandingkanTanda extends BaseSoal {
    constructor() {
        super();
        this._kdTbl = null;
        this._sdTbl = null;
        this._ldTbl = null;
        this.kiriEl = null;
        this.tengahEl = null;
        this.kananEl = null;
        this.angkaAcak = null;
        this.angkas = [];
        this.jawaban = '';
        this._template = `
			<div class='banyakan-tanda'>
				<div class='bar-cont'></div>
				<p class='judul'>Pilih Tanda Yang Sesuai</judul>
				<br/>
				<br/>
				<div class='soal'>
					<div class='angka kiri'>

					</div>
					<div class='tanda'>

					</div>
					<div class='angka kanan'>

					</div>
				</div>
				<div class='jawaban'>
					<button class='kiri'>&lt</button>
					<button class='tengah'>=</button>
					<button class='kanan'>&gt</button>
				</div>
			</div>		
			`;
        this.build();
        this._kdTbl = this.getEl('div.jawaban button.kiri');
        this._sdTbl = this.getEl('div.jawaban button.tengah');
        this._ldTbl = this.getEl('div.jawaban button.kanan');
        this.kiriEl = this.getEl('div.soal div.angka.kiri');
        this.tengahEl = this.getEl('div.soal div.tanda');
        this.kananEl = this.getEl('div.soal div.angka.kanan');
        this.angkaAcak = new Acak(10);
        this._feedback = Game.inst.feedback;
        this.selesai = Game.inst.selesai;
        this.bar.attach(this.getEl("div.banyakan-tanda div.bar-cont"));
    }
    init() {
        this._cont = Game.inst.cont;
        this._kdTbl.onclick = () => {
            this.kdClick();
        };
        this._sdTbl.onclick = () => {
            this.sdClick();
        };
        this._ldTbl.onclick = () => {
            this.ldClick();
        };
        this.mulai();
    }
    mulai() {
        this.reset();
        this.soalIdx = 0;
    }
    reset() {
        this.angkas[0] = this.angkaAcak.get();
        this.angkas[1] = this.angkaAcak.get();
        this.kiriEl.innerHTML = this.angkas[0] + '';
        this.kananEl.innerHTML = this.angkas[1] + '';
        this.tengahEl.innerHTML = '';
    }
    feedbackClick() {
        this._feedback.detach();
        this.soalIdx++;
        if (this.soalIdx >= 10) {
            this.selesai.attach(Game.inst.cont);
            this.selesai.onMulaiClick = () => {
                this.selesai.detach();
                this.mulai();
            };
            this.selesai.onMenuClick = () => {
                this.detach();
                Game.inst.menu.attach(Game.inst.cont);
            };
            this.selesai.nilai = this.nilai;
        }
        else {
            this.reset();
        }
    }
    // feedbackSalahShow(): void {
    // super.feedbackSalahShow(this.cont)
    // this._feedback.attach(Game.inst.cont);
    // this._feedback.label = "Jawaban Salah";
    // this._feedback.type = FeedbackEnum.SALAH;
    // this._feedback.onClick = () => {
    // 	this.feedbackClick();
    // }
    // }
    // feedbackBenarShow(): void {
    // 	this._feedback.attach(Game.inst.cont);
    // this._feedback.label = 'Jawaban Benar';
    // this._feedback.type = FeedbackEnum.BENAR;
    // this._feedback.onClick = () => {
    // 	this.feedbackClick();
    // }
    // }
    // userJawab(jawab: string): void {
    // 	this.jawaban = jawab;
    // 	this.tengahEl.innerHTML = this.jawaban;
    // 	if (this.check()) {
    // 		this._nilai++;
    // 		this.feedbackBenarShow();
    // 	}
    // 	else {
    // 		this.feedbackSalahShow();
    // 	}
    // }
    kdClick() {
        this.jawaban = '<';
        this.tengahEl.innerHTML = this.jawaban;
        this.bar.persen2(this.soalIdx, 10);
        if (this.check()) {
            this.nilai++;
            this.feedbackBenarShow(this._cont);
        }
        else {
            this.feedbackSalahShow(this._cont);
        }
    }
    sdClick() {
        this.jawaban = '=';
        this.tengahEl.innerHTML = this.jawaban;
        if (this.check()) {
            this.nilai++;
            this.feedbackBenarShow(this._cont);
        }
        else {
            this.feedbackSalahShow(this._cont);
        }
    }
    ldClick() {
        this.jawaban = '>';
        this.tengahEl.innerHTML = this.jawaban;
        if (this.check()) {
            this.nilai++;
            this.feedbackBenarShow(this._cont);
        }
        else {
            this.feedbackSalahShow(this._cont);
        }
    }
    check() {
        console.log('check soal');
        console.log('jawaban ' + this.jawaban);
        console.log('angka 1 ' + this.angkas[0]);
        console.log('angka 2 ' + this.angkas[1]);
        if (this.angkas[0] > this.angkas[1]) {
            if (this.jawaban != '>')
                return false;
        }
        if (this.angkas[0] == this.angkas[1]) {
            if (this.jawaban != '=')
                return false;
        }
        if (this.angkas[0] < this.angkas[1]) {
            if (this.jawaban != '<')
                return false;
        }
        return true;
    }
    get kdTbl() {
        return this._kdTbl;
    }
    get sdTbl() {
        return this._sdTbl;
    }
    get ldTbl() {
        return this._ldTbl;
    }
}
