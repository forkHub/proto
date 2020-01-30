import { BaseSoal } from "../BaseSoal.js";
import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
import { Game } from "../Game.js";

export class Bilangan extends BaseSoal {
	private angkaAr: Array<Angka> = [];
	private batasAtas: number = 10;
	private batasBawah: number = 5;
	private acakBatasAtas: Acak = null;

	private jawabCont: HTMLDivElement = null;
	private angkaCont: HTMLDivElement = null;
	private batasSpan: HTMLSpanElement = null;
	private kirimTbl: HTMLButtonElement = null;

	constructor() {
		super();

		this._template = `
			<div class='cont'>
				<div class='bar-cont'></div>

				<p class='judul-soal'>Sebutkan bilangan cacah kurang dari <span class='batas'>10</span></p c>
				<div class='jawab-cont'>
				</div>
				<hr/>
				<div class='angka-cont'>
				</div>
				<button class='normal'>Kirim</button>
			</div>
		`;
		this.build();

		this.angkaCont = this.getEl('div.angka-cont') as HTMLDivElement;
		this.jawabCont = this.getEl('div.jawab-cont') as HTMLDivElement;
		this.batasSpan = this.getEl('p.judul-soal span.batas') as HTMLSpanElement;
		this.kirimTbl = this.getEl('button.normal') as HTMLButtonElement;

		this.kirimTbl.onclick = () => {
			this.kirimClick();
		}

		this.acakBatasAtas = new Acak(this.batasAtas - this.batasBawah);

		console.log(this.angkaCont);
		console.log(this.jawabCont);
	}



	angkaAda(angkaP: number): boolean {
		for (let i: number = 0; i < this.angkaAr.length; i++) {
			let angka: Angka;
			angka = this.angkaAr[i];
			if (angka.elHtml.parentElement == this.jawabCont) {
				if (angka.angka == angkaP) {
					return true;
				}
			}
		}

		return false;
	}


	check(): boolean {
		//check jumlah
		let jml: number = 0;
		for (let i: number = 0; i < this.angkaAr.length; i++) {
			let angka: Angka = this.angkaAr[i];
			if (angka.elHtml.parentElement == this.jawabCont) {
				jml++;
			}
		}

		if (jml != (this.batasAtas)) {
			console.log("jml " + jml + '/batas atas ' + this.batasAtas);
			return false;
		}

		console.log("check, batas atas: " + this.batasAtas);
		for (let i: number = 0; i < this.batasAtas; i++) {
			let ada: boolean = this.angkaAda(i);
			// console.log("angka ada " + i + '/hasil ' + ada);
			if (false == ada) {
				return false;
			}
			else {

			}
		}

		return true;
	}

	//TODO: refactor ke base soal
	userJawab(): void {
		super.userJawab();

		if (this.check()) {
			this.nilai++;
			this.feedbackBenarShow(Game.inst.cont);
		}
		else {
			this.feedbackSalahShow(Game.inst.cont);
		}
	}

	kirimClick(): void {
		this.userJawab();
	}

	init(): void {
		super.init();

		for (let i: number = 0; i <= 20; i++) {
			let angka: Angka = new Angka();
			angka.angka = i;
			angka.attach(this.angkaCont);
			angka.angkaClick = () => {
				this.angkaClick(angka);
			}
			this.angkaAr.push(angka);
		}
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

	mulai(): void {
		super.mulai();
		this.reset();
	}

	reset(): void {
		super.reset();
		for (let i: number = 0; i < this.angkaAr.length; i++) {
			this.angkaAr[i].attach(this.angkaCont);
		}

		this.batasAtas = this.acakBatasAtas.get() + this.batasBawah;
		this.batasSpan.innerText = this.batasAtas + '';
		console.log('reset');
	}
}