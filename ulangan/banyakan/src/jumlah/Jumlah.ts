import { BaseSoal } from "../BaseSoal.js";
import { Acak } from "../Acak.js";
import { iconBuah } from "../Buah.js";
// import { Game } from "../Game.js";

export class JumlahPilih extends BaseSoal {

	private tblAr: Array<Tombol> = [];
	private soalKotak: HTMLDivElement = null;
	private jawabCont: HTMLDivElement = null;

	private angkaSoal: number = 0;
	private acakAngkaSoal: Acak = null;

	constructor() {
		super();

		this._template = `
			<div class='jumlah-benda'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Berapa Jumlahnya</p> 
				<div class='soal'>
					<div class='soal1'></div>
					<div class='soal2'/></div>
				</div>
				<div class='jawaban'>
					<button class='jawab satu putih'></button>
					<button class='jawab dua putih'></button>
					<button class='jawab tiga putih'></button>
				</div>
			</div>
		`;
		this.build();

		this.bar.attach(this.getEl('div.bar-cont') as HTMLDivElement);

		this.soalKotak = this.getEl('div.soal div.soal1') as HTMLDivElement;
		this.jawabCont = this.getEl('div.jawaban') as HTMLDivElement;

		this.tblAr = [];
		this.setTombol(this.getEl('button.jawab.satu') as HTMLButtonElement);
		this.setTombol(this.getEl('button.jawab.dua') as HTMLButtonElement);
		this.setTombol(this.getEl('button.jawab.tiga') as HTMLButtonElement);

		this.acakAngkaSoal = new Acak(this.angkaMax);
	}

	init(): void {
		super.init();
	}

	setTombol(tblView: HTMLButtonElement): void {
		let tbl: Tombol = new Tombol();
		tbl.view = tblView;
		this.tblAr.push(tbl);
		tbl.onClick = this.tombolClick.bind(this);
	}

	tombolClick(idx: Tombol): void {
		console.log('tombol click ' + idx.angka + '/' + this.angkaSoal);
		this.soalIdx++;
		this.bar.persen2(this.soalIdx, this.jmlSoal);

		if (idx.angka == this.angkaSoal) {
			this.nilai++;
			this.feedbackBenarShow(this._cont);
		}
		else {
			this.feedbackSalahShow(this._cont);
		}
	}

	debug(): void { }

	// init(): void {
	// 	super.init();
	// }

	mulai(): void {
		console.log('Jumlah: mulai');
		super.mulai();
	}

	reset() {
		console.log('Jumlah: reset');
		super.reset();

		this.angkaSoal = this.acakAngkaSoal.get() + 1;

		this.tblAr[0].angka = this.angkaSoal;
		this.tblAr[1].angka = this.acakAngkaSoal.get2([this.tblAr[0].angka]);
		this.tblAr[2].angka = this.acakAngkaSoal.get2([this.tblAr[0].angka, this.tblAr[1].angka]);

		this.tblAr[0].tulis();
		this.tblAr[1].tulis();
		this.tblAr[2].tulis();

		for (let i: number = 0; i < 1000; i++) {
			this.acakSoal();
		}

		for (let i: number = 0; i < 3; i++) {
			this.tblAr[i].view.parentElement.removeChild(this.tblAr[i].view);
		}

		for (let i: number = 0; i < 3; i++) {
			this.jawabCont.appendChild(this.tblAr[i].view);
		}


		let str: string = '';
		let iconIdx: number = Math.floor(Math.random() * iconBuah.length);
		for (let i: number = 0; i < this.angkaSoal; i++) {
			str += iconBuah[iconIdx];
		}
		this.soalKotak.innerHTML = str;
	}

	acakSoal(): void {
		let a: number = Math.floor(Math.random() * 3);
		let b: number = Math.floor(Math.random() * 3);

		if (a == b) return;

		let angka: Tombol = new Tombol();
		angka = this.tblAr[a];
		this.tblAr[a] = this.tblAr[b];
		this.tblAr[b] = angka;
	}
}

class Tombol {

	private _angka: number = 0;
	private _view: HTMLButtonElement;

	public set onClick(value: Function) {
		this._view.onclick = () => {
			value(this);
		}
	}

	public get angka(): number {
		return this._angka;
	}
	public set angka(value: number) {
		this._angka = value;
	}
	public get view(): HTMLButtonElement {
		return this._view;
	}
	public set view(value: HTMLButtonElement) {
		this._view = value;
	}

	tulis(): void {
		this._view.innerText = this._angka + '';
	}

	copy(angka2: Tombol): void {
		angka2.angka = this._angka;
		angka2.view = this._view;
	}

	copyFrom(angka: Tombol): void {
		this._angka = angka.angka;
		this._view = angka.view;
	}

}