import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
import { Selesai } from "../Selesai.js";
import { Template } from "../Template.js";
import { Feedback, FeedbackEnum } from "../Feedback.js";
// import { Page } from "./Page.js";
import { Game } from "../../Game.js";
import { BaseComponent } from "../BaseComponent.js";

export class Banyakan extends BaseComponent {

	private angka1: Angka = new Angka();
	private angka2: Angka = new Angka();
	private angka3: Angka = new Angka();
	private acak: Acak = new Acak(10);
	private soalidx: number = 0;
	private _cont: HTMLDivElement;

	private _templateManager: Template = null;
	private selesai: Selesai = null;
	private _nilai: number = 0;
	private _feedback: Feedback = null;
	private _angkaSaja: boolean = false;
	private _jmlSoal: number = 2;

	constructor() {
		super();

		this._template =
			`<div class='banyakan'>
				<h1 class='perintah'>Mana Yang Lebih Banyak?</h1>
				<div class='cont'></div>
			</div>`;

		this.build();

		this._cont = this.getEl('div.cont') as HTMLDivElement;
	}


	init(): void {
		this._templateManager = new Template();

		this.acak.max = 10;
		this.acak.acak();

		console.log('init');

		this.selesai = Game.inst.selesai;
		this._feedback = Game.inst.feedback;

		this.angkaInit();

		this.resetSoal();
	}

	angkaInit(): void {
		this.angka1.view = this._templateManager.angka1;
		this._cont.appendChild(this.angka1.view);

		this.angka2.view = this._templateManager.angka2;
		this._cont.appendChild(this.angka2.view);

		this.angka1.view.onclick = () => {
			this.angka1Click();
		}

		this.angka2.view.onclick = () => {
			this.angka2Click();
		}

		this.angka3Init();
	}

	angka3Init(): void {
		// if (this._jmlSoal != 3) return;

		this.angka3.view = this._templateManager.angka3;
		this.angka3.angka = -1;

		this.angka3.view.onclick = () => {
			this.angka3Click();
		}
	}

	palingBesar(n: number): boolean {
		if (this.angka1.angka != n && this.angka1.angka < n) return false;
		if (this.angka2.angka != n && this.angka2.angka < n) return false;
		if (this.angka3.angka != n && this.angka3.angka < n) return false;

		return true;
	}

	angka1Click(): void {
		if ((this.angka1.angka > this.angka2.angka) && (this.angka1.angka > this.angka3.angka)) {
			this._nilai++;
			this.feedbackBenarShow();
		}
		else {
			this.feedbackSalahShow();
		}
	}

	angka2Click(): void {
		if (this.angka2.angka > this.angka1.angka && (this.angka2.angka > this.angka3.angka)) {
			this._nilai++;
			this.feedbackBenarShow();
		}
		else {
			this.feedbackSalahShow();
		}
	}

	angka3Click(): void {
		if (this.angka3.angka > this.angka1.angka && (this.angka3.angka > this.angka2.angka)) {
			this._nilai++;
			this.feedbackBenarShow();
		}
		else {
			this.feedbackSalahShow();
		}
	}


	feedbackClick(): void {
		// console.log('feed back click');
		this._feedback.detach();
		this.soalidx++;

		if (this.soalidx >= 10) {
			// console.log('feedback click ' + this.soalidx + '/nilai ' + this._nilai);
			this.selesai.attach();
			this.selesai.onClick = () => {
				this.selesai.detach();
				this.mulaiLagi();
			}
			this.selesai.onMenuClick = () => {
				this.detach();
				// this.selesai.detach();
				Game.inst.menu.attach(Game.inst.cont);
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

	ambilAngka(n: number, n2: number): number {
		while (true) {
			let res: number = this.acak.get();
			res++;

			if ((res != n) && (res != n2)) return res;
		}
	}

	mulaiLagi(): void {
		this.resetSoal();
		this._nilai = 0;
		this.soalidx = 0;
	}

	resetSoal(): void {
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
	}

	public get angkaSaja(): boolean {
		return this._angkaSaja;
	}
	public set angkaSaja(value: boolean) {
		this._angkaSaja = value;
	}

	public get jmlSoal(): number {
		return this._jmlSoal;
	}
	public set jmlSoal(value: number) {
		this._jmlSoal = value;

		if (this.angka3.view.parentElement) {
			this.angka3.view.parentElement.removeChild(this.angka3.view);
		}

		if (this._jmlSoal == 3) {
			this._cont.appendChild(this.angka3.view);
		}
	}
}