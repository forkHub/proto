import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
import { Selesai } from "../Selesai.js";
import { Template } from "../Template.js";
import { Feedback, FeedbackEnum } from "../Feedback.js";
import { Page } from "./Page.js";
import { Game } from "../../Game.js";

export class Banyakan {

	private angka1: Angka = new Angka();
	private angka2: Angka = new Angka();
	private acak: Acak = new Acak(10);
	private soalidx: number = 0;

	private _template: Template = null;
	private selesai: Selesai = null;
	private _nilai: number = 0;
	private _feedback: Feedback = null;
	private _pageCont: Page = null;
	private _angkaSaja: boolean = false;

	constructor() {
		// Banyakan._inst = this;

		// window.onload = () => {
		// 	this.init();
		// }

		this._pageCont = new Page();
	}


	init(): void {
		this._template = new Template();

		this.acak.max = 10;
		this.acak.acak();

		console.log('init');

		this.selesai = Game.inst.selesai;
		this._feedback = Game.inst.feedback;

		this.angkaInit();

		this.resetSoal();
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

	feedbackClick(): void {
		console.log('feed back click');
		this._feedback.detach();
		this.soalidx++;

		if (this.soalidx >= 10) {
			console.log('feedback click ' + this.soalidx + '/nilai ' + this._nilai);
			this.selesai.attach();
			this.selesai.onClick = () => {
				this.selesai.detach();
				this.mulaiLagi();
			}
			this.selesai.nilai = this._nilai;
		}
		else {
			this.resetSoal();
		}
	}

	feedbackSalahShow(): void {
		this._feedback.attach(Game.inst.cont);
		this._feedback.label = "Jawaban Salah";
		this._feedback.type = FeedbackEnum.SALAH;
		this._feedback.onClick = () => {
			this.feedbackClick();
		}
	}

	feedbackBenarShow(): void {
		this._feedback.attach(Game.inst.cont);
		this._feedback.label = 'Jawaban Benar';
		this._feedback.type = FeedbackEnum.BENAR;
		this._feedback.onClick = () => {
			this.feedbackClick();
		}
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
	}

	public get angkaSaja(): boolean {
		return this._angkaSaja;
	}
	public set angkaSaja(value: boolean) {
		this._angkaSaja = value;
	}
	public get pageCont(): Page {
		return this._pageCont;
	}

}