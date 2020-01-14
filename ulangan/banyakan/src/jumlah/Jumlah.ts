import { BaseSoal } from "../BaseSoal.js";
import { Acak } from "../Acak.js";

export class JumlahPilih extends BaseSoal {
	private jawab1Tbl: HTMLButtonElement = null;
	private jawab2Tbl: HTMLButtonElement = null;
	private jawab3Tbl: HTMLButtonElement = null;
	private tblAr: Array<Tombol> = [];

	private angkaSoal: number = 0;
	private acakAngkaSoal: Acak = null;
	// private jawabans: Array<number> = [];

	constructor() {
		super();

		this._template = `
			<div class='jumlah'>
				<div class='soal'></div>
				<div class='jawaban'>
					<button class='jawab satu'></button>
					<button class='jawab dua'></button>
					<button class='jawab tiga'></button>
				</div>
			</div>
		`;
		this.build();

		//TODO: hapus diganti generic ke tblAr
		this.jawab1Tbl = this.getEl('button.jawab.satu') as HTMLButtonElement;
		this.jawab2Tbl = this.getEl('button.jawab.dua') as HTMLButtonElement;
		this.jawab3Tbl = this.getEl('button.jawab.tiga') as HTMLButtonElement;

		this.tblAr = [];
		this.setTombol(this.jawab1Tbl);
		this.setTombol(this.jawab2Tbl);
		this.setTombol(this.jawab3Tbl);

		this.jawab1Tbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			this.tombolClick(0);
		}
		this.jawab2Tbl.onclick = () => {
			this.tombolClick(1);
		}
		this.jawab3Tbl.onclick = () => {
			this.tombolClick(2);
		}

		this.acakAngkaSoal = new Acak(this.angkaMax);
	}

	setTombol(tblView: HTMLButtonElement): void {
		let tbl: Tombol = new Tombol();
		tbl.view = tblView;
		this.tblAr.push(tbl);
	}

	tombolClick(idx: number): void {
		if (idx == this.angkaSoal) {
			this.feedbackBenarShow(this.cont);
		}
		else {
			this.feedbackSalahShow(this.cont);
		}
	}

	debug(): void {
		console.log(this.jawab1Tbl);
		console.log(this.jawab2Tbl);
		console.log(this.jawab3Tbl);
	}

	init(): void {

	}

	reset() {
		super.reset();

		let geser: number = 0;

		//TODO: test edge case
		this.angkaSoal = this.acakAngkaSoal.get() + 1;
		if (this.angkaSoal <= 1) geser = 1;
		if (this.angkaSoal >= this.angkaMax - 1) geser = -1;

		//default
		for (let i: number = 0; i < 3; i++) {
			this.tblAr[i].angka = this.angkaSoal - (i + 1) + geser;
			this.tblAr[i].tulis();
		}

	}
}

class Tombol {

	private _angka: number = 0;
	public get angka(): number {
		return this._angka;
	}
	public set angka(value: number) {
		this._angka = value;
	}
	private _view: HTMLButtonElement;
	public get view(): HTMLButtonElement {
		return this._view;
	}
	public set view(value: HTMLButtonElement) {
		this._view = value;
	}

	tulis(): void {
		this._view.innerText = this._angka + '';
	}
}