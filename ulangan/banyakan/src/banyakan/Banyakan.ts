import { Angka } from "./Angka.js";
import { Dom } from "../Dom.js";
import { Acak } from "../Acak.js";
import { Selesai } from "../Selesai.js";
import { Template } from "../Template.js";
import { Feedback, FeedbackEnum } from "../Feedback.js";
import { Page } from "./Page.js";

export class Banyakan {
	private static _inst: Banyakan = null;

	private angka1: Angka = new Angka();
	private angka2: Angka = new Angka();
	private acak: Acak = new Acak(10);
	private soalidx: number = 1;
	private _template: Template = null;
	private _cont: HTMLDivElement = null;
	private selesai: Selesai = null;
	private _nilai: number = 0;
	private _feedback: Feedback = null;
	private _pageCont: Page = null;

	constructor() {
		Banyakan._inst = this;

		window.onload = () => {
			this.init();
		}

		this._pageCont = new Page();
	}


	init(): void {
		this._template = new Template();

		this.acak.max = 10;
		this.acak.acak();

		console.log('init');

		this._cont = Dom.getEl(document.body, 'div.cont') as HTMLDivElement;

		this.selesai = new Selesai();
		this.selesai.init();
		this.feedbackInit();

		this.angkaInit();

		this.resetSoal();
		this._pageCont.attach(this._cont);
	}

	angkaInit(): void {
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
		}

		this.angka2.view.onclick = () => {
			if (this.angka2.angka > this.angka1.angka) {
				this._nilai++;
				this.feedbackBenarShow();
			}
			else {
				this.feedbackSalahShow();
			}
		}
	}

	feedbackInit(): void {
		this._feedback = new Feedback();
		this._feedback.onClick = () => {
			this.feedbackClick();
		}
		this._feedback.init();
	}

	feedbackClick(): void {
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

	feedbackSalahShow(): void {
		this.feedbackHide();
		this._feedback.attach(this._cont);
		this._feedback.label = "Jawaban Salah";
		this._feedback.type = FeedbackEnum.SALAH;
	}

	feedbackBenarShow(): void {
		this.feedbackHide();
		this._feedback.attach(this._cont);
		this._feedback.label = 'Jawaban Benar';
		this._feedback.type = FeedbackEnum.BENAR;
	}

	ambilAngka(n: number): number {
		while (true) {
			let res: number = this.acak.get();
			if ((res + 1) != n) return res + 1;
		}
	}

	mulaiLagi(): void {
		this.resetSoal();
		this._nilai = 0;
		this.soalidx = 0;
	}

	resetSoal(): void {
		this.acak.acak();
		this.angka1.angka = this.ambilAngka(-1);
		this.angka2.angka = this.ambilAngka(this.angka1.angka);

		this.angka1.tulis();
		this.angka2.tulis();
		// this._nilai = 0;
	}

	feedbackHide(): void {
		// console.log('feedback hide');
		// this.feedbackBenar.style.display = 'none';
		// this.feedbackSalah.style.display = 'none';
		this._feedback.detach();
	}

	// constructor() {
	// }

	public static get inst(): Banyakan {
		return Banyakan._inst;
	}

	public get template(): Template {
		return this._template;
	}

	public get nilai(): number {
		return this._nilai;
	}

	public get feedback(): Feedback {
		return this._feedback;
	}


}

new Banyakan();