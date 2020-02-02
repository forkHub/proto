import { BaseSoal } from "../BaseSoal.js";
import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";

export class Pola extends BaseSoal {
	private angkaAr: Array<Angka> = [];
	private angkaCont: HTMLDivElement = null;
	private _jmlAngka: number = 4;
	private _batasAtas: number = 20;
	private _jarak: number = 2;
	private _isiDiAwal: boolean = false;
	private _isiDiTengah: boolean = false;
	private acak: Acak = null;
	private acakPos: Acak = null;
	private kirimTbl: HTMLButtonElement = null;

	constructor() {
		super();
		this._template = `
			<div class='pola'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Isilah angka yang kosong</p>
				<hr/>
				<div class='angka-cont'>
				</div>
				<hr/> 
				<button class='normal kirim'>Kirim</button>
			</div>
		`;
		this.build();
		// this.judulP = this.getEl('p.judul-soal') as HTMLParagraphElement;
		this.angkaCont = this.getEl('div.angka-cont') as HTMLDivElement;
		this.acak = new Acak(this._batasAtas);
		this.acakPos = new Acak(2);
		this.kirimTbl = this.getEl('button.normal.kirim') as HTMLButtonElement;
		this.kirimTbl.onclick = () => {
			this.kirimClick();
		}
	}

	check(): boolean {
		for (let i: number = 0; i < this.angkaAr.length; i++) {
			let angka: Angka = this.angkaAr[i];
			if (parseInt(angka.value) != angka.angka) {
				return false;
			}
		}

		return true;
	}

	kirimClick(): void {
		this.userJawab();
	}

	init(): void {
		super.init();
		for (let i: number = 0; i < this._jmlAngka; i++) {
			let angka: Angka = new Angka();
			angka.attach(this.angkaCont);
			this.angkaAr.push(angka);

			if (this._isiDiAwal) {
				if (0 == i) {
					angka.readonly = false;
				}
				else {
					angka.readonly = true;
				}
			}
			else {
				if ((this._jmlAngka - 1) == i) {
					angka.readonly = false;
				}
				else {
					angka.readonly = true;
				}
			}
		}

		this.acak.max = this._batasAtas;
	}

	setFocus(): void {
		if (this._isiDiTengah) {

			for (let i: number = 0; i < this.angkaAr.length; i++) {
				let angka: Angka = this.angkaAr[i];
				angka.readonly = true;
				angka.value = angka.angka + '';
			}

			let posAngkaKosong: number = this.acakPos.get() + 1;
			this.angkaAr[posAngkaKosong].readonly = false;
			this.angkaAr[posAngkaKosong].elHtml.focus();
			this.angkaAr[posAngkaKosong].value = '';
		}
		else {
			if (this._isiDiAwal) {
				let angka: Angka;
				angka = this.angkaAr[0];
				angka.elHtml.focus();
				angka.value = '';
			}
			else {
				let angka: Angka;
				angka = this.angkaAr[this._jmlAngka - 1];
				angka.elHtml.focus();
				angka.value = '';
			}

		}
	}

	siapinAngka(): void {
		let ok: boolean = false
		while (!ok) {
			let awal: number = this.acak.get();
			ok = true;
			for (let i: number = 0; i < this._jmlAngka; i++) {
				let angka: Angka;
				angka = this.angkaAr[i];
				angka.angka = awal + (this._jarak * i);
				if (angka.angka >= this._batasAtas) ok = false;
			}
		}
	}

	reset(): void {
		super.reset();
		this.siapinAngka();
		this.setFocus();
	}

	public get jmlAngka(): number {
		return this._jmlAngka;
	}
	public set jmlAngka(value: number) {
		this._jmlAngka = value;
	}
	public get jarak(): number {
		return this._jarak;
	}
	public set jarak(value: number) {
		this._jarak = value;
	}
	public get isiDiAwal(): boolean {
		return this._isiDiAwal;
	}
	public set isiDiAwal(value: boolean) {
		this._isiDiAwal = value;
	}
	public get isiDiTengah(): boolean {
		return this._isiDiTengah;
	}
	public set isiDiTengah(value: boolean) {
		this._isiDiTengah = value;
	}

}