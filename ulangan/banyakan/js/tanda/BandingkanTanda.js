import { BaseComponent } from "../BaseComponent.js";
import { Acak } from "../Acak.js";
import { FeedbackEnum } from "../Feedback.js";
import { Game } from "../Game.js";
export class BandingkanTanda extends BaseComponent {
    constructor() {
        super();
        this.kdTbl = null;
        this.sdTbl = null;
        this.ldTbl = null;
        this.angkaAcak = null;
        this.kiriEl = null;
        this.tengahEl = null;
        this.kananEl = null;
        this.angkas = [];
        this.jawaban = '';
        this.soalIdx = 0;
        this._nilai = 0;
        this._template = `
		<div class='banyakan-tanda'>
			<div class='bar-cont'></div>
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
        this.kdTbl = this.getEl('div.jawaban button.kiri');
        this.sdTbl = this.getEl('div.jawaban button.tengah');
        this.ldTbl = this.getEl('div.jawaban button.kanan');
        this.kiriEl = this.getEl('div.soal div.angka.kiri');
        this.tengahEl = this.getEl('div.soal div.tanda');
        this.kananEl = this.getEl('div.soal div.angka.kanan');
        this.angkaAcak = new Acak(10);
        this._feedback = Game.inst.feedback;
        this.selesai = Game.inst.selesai;
    }
    init() {
        this.kdTbl.onclick = () => {
            this.kdClick();
        };
        this.sdTbl.onclick = () => {
            this.sdClick();
        };
        this.ldTbl.onclick = () => {
            this.ldClick();
        };
        this.mulai();
    }
    mulai() {
        this.restart();
    }
    restart() {
        this.angkas[0] = this.angkaAcak.get();
        this.angkas[1] = this.angkaAcak.get();
        this.kiriEl.innerHTML = this.angkas[0] + '';
        this.kananEl.innerHTML = this.angkas[1] + '';
        this.tengahEl.innerHTML = '';
    }
    feedbackClick() {
        // console.log('feed back click');
        this._feedback.detach();
        this.soalIdx++;
        // this.bar.persen = (this.soalIdx / 10) * 100;
        if (this.soalIdx >= 10) {
            // console.log('feedback click ' + this.soalidx + '/nilai ' + this._nilai);
            this.selesai.attach();
            this.selesai.onClick = () => {
                this.selesai.detach();
                this.mulai();
            };
            this.selesai.onMenuClick = () => {
                this.detach();
                // this.selesai.detach();
                Game.inst.menu.attach(Game.inst.cont);
            };
            this.selesai.nilai = this._nilai;
        }
        else {
            this.restart();
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
    userJawab(jawab) {
        this.jawaban = jawab;
        this.tengahEl.innerHTML = this.jawaban;
        if (this.check()) {
            this._nilai++;
            this.feedbackBenarShow();
        }
        else {
            this.feedbackSalahShow();
        }
    }
    kdClick() {
        this.jawaban = '<';
        this.tengahEl.innerHTML = this.jawaban;
        if (this.check()) {
            this._nilai++;
            this.feedbackBenarShow();
        }
        else {
            this.feedbackSalahShow();
        }
    }
    sdClick() {
        this.jawaban = '=';
        this.tengahEl.innerHTML = this.jawaban;
        if (this.check()) {
            this._nilai++;
            this.feedbackBenarShow();
        }
        else {
            this.feedbackSalahShow();
        }
    }
    ldClick() {
        this.jawaban = '>';
        this.tengahEl.innerHTML = this.jawaban;
        if (this.check()) {
            this._nilai++;
            this.feedbackBenarShow();
        }
        else {
            this.feedbackSalahShow();
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
}
