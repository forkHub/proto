import { BaseSoal } from "../BaseSoal.js";
import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";

export class Penjumlahan extends BaseSoal {
	static readonly J_AWAL: number = 0;
	static readonly J_TENGAH: number = 1;
	static readonly J_AKHIR: number = 2;

	private angkas: Array<Angka> = [];
	private acak: Acak = null;
	private kirimTbl: HTMLButtonElement = null;
	private _posisiJawaban: number = Penjumlahan.J_AKHIR;
	private _batasAtas: number = 10;
	private _batasBawah: number = 0;
	private _acakPos: boolean = false;
	private acakPos2: Acak = null;
	private judulP: HTMLParagraphElement = null;
	private operatorSpan: HTMLSpanElement = null;
	private _pengurangan: boolean = false;

	constructor() {
		super();
		this._template = `
			<div class='penjumlahan'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Berapa Jumlahnya</p>
				<hr/>
				<div class='soal-cont'>
					<input class='angka satu'>
					<span class='operator'>+</span>
					<input class='angka dua'>
					<span>=</span>
					<input class='angka tiga'>
				</div>
				<hr/> 
				<button class='normal kirim'>Kirim</button>
			</div>
		`;
		this.build();

		for (let i: number = 0; i < 3; i++) {
			let angka: Angka;
			let input: HTMLElement;
			input = this.getEl2('input.angka', i);
			angka = new Angka(input);
			angka.input.type = 'text';
			this.angkas.push(angka);
		}

		this.kirimTbl = this.getEl('button.kirim') as HTMLButtonElement;
		this.kirimTbl.onclick = () => {
			this.kirimOnClick();
		}
		this.judulP = this.getEl('p.judul-soal') as HTMLParagraphElement;
		this.operatorSpan = this.getEl('span.operator') as HTMLSpanElement;

		this.acak = new Acak(10);
		this.acakPos2 = new Acak(3);
	}

	check(): boolean {
		for (let i: number = 0; i < 3; i++) {
			let angka: Angka;
			angka = this.angkas[i];
			if (parseInt(angka.value) != angka.angka) {
				return false;
			}
		}
		return true;
	}

	kirimOnClick(): void {
		this.userJawab();
	}

	validate(): boolean {
		if (this._pengurangan) return this.validate2();

		if (this.angkas[2].angka <= this._batasAtas) {
			if (this.angkas[2].angka >= this._batasBawah) {
				return true;
			}
		}
		return false;
	}

	validate2(): boolean {
		if (this.angkas[0].angka < this.batasBawah) return false;
		if (this.angkas[1].angka < this.batasBawah) return false;

		if (this.angkas[0].angka < this.angkas[1].angka) {
			let angka: number = this.angkas[0].angka;

			this.angkas[0].angka = this.angkas[1].angka;
			this.angkas[1].angka = angka;

			// return true;
		}

		this.angkas[2].angka = this.angkas[0].angka - this.angkas[1].angka;

		return true;
	}

	setJawaban(): void {
		this.angkas[2].angka = this.angkas[0].angka + this.angkas[1].angka;
	}

	setAngka(): void {
		while (true) {
			for (let i: number = 0; i < 2; i++) {
				let angka: Angka = this.angkas[i];
				angka.angka = this.acak.get();
				angka.input.type = 'text';
				angka.readonly = true;
			}
			this.setJawaban();
			if (this.validate()) return;
		}
	}

	setPosisiJawaban(): void {
		let angka: Angka;

		if (this._acakPos) {
			this._posisiJawaban = this.acakPos2.get();
		}

		angka = this.angkas[this._posisiJawaban];
		angka.input.type = 'number';
		angka.readonly = false;
		angka.value = '';
		angka.elHtml.focus();
	}

	reset(): void {
		super.reset();
		this.acak.max = this._batasAtas;
		this.setAngka();
		this.setPosisiJawaban();
		if (this._posisiJawaban != 2) {
			this.judulP.innerHTML = 'Isikan kotak yang kosong';
		}
		else {
			this.judulP.innerHTML = 'Berapa Jumlahnya';
		}

		this.operatorSpan.innerText = "+";
		if (this._pengurangan) {
			this.operatorSpan.innerText = "-";
		}
	}

	public get posisiJawaban(): number {
		return this._posisiJawaban;
	}
	public set posisiJawaban(value: number) {
		this._posisiJawaban = value;
	}
	public get batasBawah(): number {
		return this._batasBawah;
	}
	public set batasBawah(value: number) {
		this._batasBawah = value;
	}
	public get acakPos(): boolean {
		return this._acakPos;
	}
	public set acakPos(value: boolean) {
		this._acakPos = value;
	}
	public get batasAtas(): number {
		return this._batasAtas;
	}
	public set batasAtas(value: number) {
		this._batasAtas = value;
	}
	public get pengurangan(): boolean {
		return this._pengurangan;
	}
	public set pengurangan(value: boolean) {
		this._pengurangan = value;
	}

}