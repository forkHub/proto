import { Game } from "../Game.js";
import { Acak } from "../Acak.js";
import { BaseSoal } from "../BaseSoal.js";

export class BandingkanTanda extends BaseSoal {

	private _kdTbl: HTMLButtonElement = null;
	private _sdTbl: HTMLButtonElement = null;
	private _ldTbl: HTMLButtonElement = null;

	private kiriEl: HTMLDivElement = null;
	private tengahEl: HTMLDivElement = null;
	private kananEl: HTMLDivElement = null;

	private angkaAcak: Acak = null;
	private angkas: Array<number> = [];
	private jawaban: string = '';

	constructor() {
		super();
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

		this._kdTbl = this.getEl('div.jawaban button.kiri') as HTMLButtonElement;
		this._sdTbl = this.getEl('div.jawaban button.tengah') as HTMLButtonElement;
		this._ldTbl = this.getEl('div.jawaban button.kanan') as HTMLButtonElement;

		this.kiriEl = this.getEl('div.soal div.angka.kiri') as HTMLDivElement;
		this.tengahEl = this.getEl('div.soal div.tanda') as HTMLDivElement;
		this.kananEl = this.getEl('div.soal div.angka.kanan') as HTMLDivElement;

		this.angkaAcak = new Acak(10);
		this._feedback = Game.inst.feedback;
		this.selesai = Game.inst.selesai;

		this.bar.attach(this.getEl("div.banyakan-tanda div.bar-cont") as HTMLDivElement);
	}

	init(): void {
		super.init();

		this._cont = Game.inst.cont;

		this._kdTbl.onclick = () => {
			this.kdClick();
		}

		this._sdTbl.onclick = () => {
			this.sdClick();
		}

		this._ldTbl.onclick = () => {
			this.ldClick();
		}

		this.mulai();
	}

	// mulai(): void {
	// 	this.reset();
	// 	this.soalIdx = 0;
	// }

	reset(): void {
		super.reset();
		this.angkas[0] = this.angkaAcak.get();
		this.angkas[1] = this.angkaAcak.get();

		this.kiriEl.innerHTML = this.angkas[0] + '';
		this.kananEl.innerHTML = this.angkas[1] + '';
		this.tengahEl.innerHTML = '';
	}

	feedbackClick(): void {
		this._feedback.detach();
		this.soalIdx++;

		if (this.soalIdx >= 10) {
			this.selesai.attach(Game.inst.cont);
			this.selesai.onMulaiClick = () => {
				this.selesai.detach();
				this.mulai();
			}
			this.selesai.onMenuClick = () => {
				this.detach();
				Game.inst.menu.attach(Game.inst.cont);
			}
			this.selesai.nilai = this._nilai;
		}
		else {
			this.reset();
		}
	}

	kdClick(): void {
		this.jawaban = '<';
		this.tengahEl.innerHTML = this.jawaban;
		this.bar.persen2(this.soalIdx, 10);
		if (this.check()) {
			this._nilai++;
			this.feedbackBenarShow(this._cont);
		}
		else {
			this.feedbackSalahShow(this._cont);
		}
	}

	sdClick(): void {
		this.jawaban = '=';
		this.tengahEl.innerHTML = this.jawaban;
		if (this.check()) {
			this._nilai++;
			this.feedbackBenarShow(this._cont);
		}
		else {
			this.feedbackSalahShow(this._cont);
		}
	}

	ldClick(): void {
		this.jawaban = '>';
		this.tengahEl.innerHTML = this.jawaban;
		if (this.check()) {
			this._nilai++;
			this.feedbackBenarShow(this._cont);
		}
		else {
			this.feedbackSalahShow(this._cont);
		}
	}

	check(): boolean {
		console.log('check soal');
		console.log('jawaban ' + this.jawaban);
		console.log('angka 1 ' + this.angkas[0]);
		console.log('angka 2 ' + this.angkas[1]);

		if (this.angkas[0] > this.angkas[1]) {
			if (this.jawaban != '>') return false;
		}

		if (this.angkas[0] == this.angkas[1]) {
			if (this.jawaban != '=') return false;
		}

		if (this.angkas[0] < this.angkas[1]) {
			if (this.jawaban != '<') return false;
		}

		return true;
	}

	public get kdTbl(): HTMLButtonElement {
		return this._kdTbl;
	}
	public get sdTbl(): HTMLButtonElement {
		return this._sdTbl;
	}
	public get ldTbl(): HTMLButtonElement {
		return this._ldTbl;
	}


}