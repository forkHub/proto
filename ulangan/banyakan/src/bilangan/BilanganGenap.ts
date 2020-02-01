import { BaseSoal } from "../BaseSoal.js";
import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";

export class BilanganGenap extends BaseSoal {
	private angkaAr: Array<Angka> = [];
	private batasAtas: number = 10;
	private batasBawah: number = 5;
	private acak: Acak = null;

	private jawabCont: HTMLDivElement = null;
	private angkaCont: HTMLDivElement = null;
	private batasSpan: HTMLSpanElement = null;
	private kirimTbl: HTMLButtonElement = null;

	constructor() {
		super();

		this._template = `
			<div class='bilangan ganjil'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Sebutkan bilangan genap kurang dari <span class='batas'>10</span></p>
				<div class='jawab-cont'></div>
				<hr/>
				<div class='angka-cont'></div>
				<button class='normal'>Kirim</button>
			</div>
		`;
		this.build();

		this.angkaCont = this.getEl('div.angka-cont') as HTMLDivElement;
		this.jawabCont = this.getEl('div.jawab-cont') as HTMLDivElement;
		this.batasSpan = this.getEl('p.judul-soal span.batas') as HTMLSpanElement;
		this.kirimTbl = this.getEl('button.normal') as HTMLButtonElement;

		this.kirimTbl.onclick = () => {
			this.kirimOnClick();
		}

		this.acak = new Acak(this.batasAtas - this.batasBawah);

		for (let i: number = 0; i <= 10; i++) {
			let angka: Angka = new Angka();
			angka.angka = i;
			angka.attach(this.angkaCont);
			angka.angkaClick = () => {
				this.angkaClick(angka);
			}
			this.angkaAr.push(angka);
		}
	}

	angkaAda(angkaP: number): boolean {
		for (let i: number = 0; i < this.angkaAr.length; i++) {
			let angka: Angka;
			angka = this.angkaAr[i];
			if (angka.elHtml.parentElement == this.jawabCont) {
				if (angka.angka == angkaP) {
					console.log('angka ada ' + angkaP + '/true');
					return true;
				}
			}
		}

		return false;
	}

	jmlJawaban(): number {
		let hsl: number = 0;

		// console.log('jumlah jawaban');

		for (let i: number = 0; i < this.batasAtas; i++) {
			if ((i % 2) == 0) {
				hsl++;
				// console.log('hasil ' + hsl + '/angka ' + i);
			}
		}
		return hsl;
	}

	check(): boolean {
		let jml: number = 0;
		for (let i: number = 0; i < this.angkaAr.length; i++) {
			let angka: Angka = this.angkaAr[i];
			if (angka.elHtml.parentElement == this.jawabCont) {
				jml++;
			}
		}

		if (jml != this.jmlJawaban()) {
			// console.log("jml " + jml + '/batas atas ' + this.batasAtas);
			return false;
		}

		console.log("check, batas atas: " + this.batasAtas);
		for (let i: number = 0; i < this.batasAtas; i++) {
			if (0 == (i % 2)) {
				let ada: boolean = this.angkaAda(i);
				if (false == ada) {
					return false;
				}
			}
		}

		return true;
	}

	kirimOnClick(): void {
		this.userJawab();
	}

	angkaClick(angka: Angka): void {
		if (angka.elHtml.parentElement == this.jawabCont) {
			angka.attach(this.angkaCont);
		}
		else if (angka.elHtml.parentElement == this.angkaCont) {
			angka.attach(this.jawabCont);
		}
		else {
			throw new Error('');
		}
	}

	reset(): void {
		super.reset();
		for (let i: number = 0; i < this.angkaAr.length; i++) {
			this.angkaAr[i].attach(this.angkaCont);
		}

		this.batasAtas = this.acak.get() + this.batasBawah;
		this.batasSpan.innerText = this.batasAtas + '';
	}
}