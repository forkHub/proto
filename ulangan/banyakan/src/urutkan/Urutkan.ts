import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
import { BaseSoal } from "../BaseSoal.js";

export class Urutkan extends BaseSoal {

	protected angkas: Array<Angka> = [];
	protected acak: Acak = new Acak(10);
	protected max: number = 10;

	protected _flJarak: Jarak = Jarak.JARAK_ACAK;	//TODO: jarak 1 atau acak
	protected _flArah: Arah = Arah.KECIL2BESAR;	//TODO: arah ke besar atau ke kecil

	protected angkaSumberEl: HTMLDivElement = null;
	protected angkaTargetEl: HTMLDivElement = null;

	constructor() {
		super();
		this._template = `
			<div class='urutkan'>
				<div class='bar-cont'></div>

				<p class='judul-soal'>Urutkan dari yang terkecil</p c>
				<div class='target'></div>
				<div class='sumber'></div>
				<div class='kirim-cont'>
					<button class='normal kirim'>Kirim</button>
				</div>
			</div>`;

		this.build();
		this.jmlKotak = 3;
	}

	init(): void {
		console.log('init');
		super.init();

		// this.bar.attach(this.getEl('div.bar-cont') as HTMLDivElement);

		this.acak.max = this.max;

		this.angkaSumberEl = this.getEl('div.sumber') as HTMLDivElement;
		this.angkaTargetEl = this.getEl('div.target') as HTMLDivElement;

		for (let i: number = 0; i < this.jmlKotak; i++) {
			let angkaN: number = this.buatAngka();
			let angka: Angka = new Angka(angkaN);
			angka.angkaClick = (angkaP: Angka) => {
				console.log('angka click');
				this.angkaClick(angkaP);
			};
			this.angkas.push(angka);
		}
	}

	debugAngka(): void {
		let ar: Array<number> = [];
		for (let i: number = 0; i < this.angkas.length; i++) {
			ar.push(this.angkas[i].angka);
		}
		console.log('debug angka ' + JSON.stringify(ar));
	}

	buatAngka(): number {
		let angka: number = 0;

		while (true) {
			angka = this.acak.get();
			if (!this.checkDouble(angka)) {
				return angka;
			}
		}
	}

	checkDouble(angka: number): boolean {
		for (let i: number = 0; i < this.angkas.length; i++) {
			if (this.angkas[i].angka === angka) {
				return true;
			}
		}

		return false;
	}

	resetAngka(): void {
		console.log('reset angka');
		for (let i: number = 0; i < this.angkas.length; i++) {
			// this.angkas[i].tempat = AngkaEnum.SUMBER;
			this.angkas[i].angka = -1;
			this.angkas[i].attach(this.angkaSumberEl);
		}

		for (let i: number = 0; i < this.angkas.length; i++) {
			this.angkas[i].angka = this.buatAngka();
		}

	}

	reset(): void {
		console.log('reset');
		console.log('soal idx ' + this.soalIdx);
		super.reset();
		this.resetAngka();
	}

	getAngka(el: HTMLDivElement): Array<number> {
		let ar: Array<number> = [];

		el.querySelectorAll('button.angka').forEach((item: Element) => {
			ar.push(parseInt(item.innerHTML));
		});

		return ar;
	}

	checkUrut(ar: Array<number>): boolean {
		for (let i: number = 0; i < ar.length - 1; i++) {
			if (ar[i] >= ar[i + 1]) return false;
		}
		return true;
	}

	check(): boolean {
		let target: Array<number> = [];

		target = this.getAngka(this.angkaTargetEl);
		if (target.length < this.jmlKotak) return false;

		return this.checkUrut(target);
	}

	angkaClick(angka: Angka): void {
		if (this.angkaSumberEl.contains(angka.elHtml)) {
			angka.attach(this.angkaTargetEl);
		} else if (this.angkaTargetEl.contains(angka.elHtml)) {
			angka.attach(this.angkaSumberEl);
		}
		else {
			console.log(this.angkaSumberEl);
			console.log(this.angkaTargetEl);
			throw new Error();
		}

		// let angkas: Array<number> = [];
		// angkas = this.getAngka(this.angkaTargetEl);
		// if (angkas.length >= this.jmlKotak) {
		// 	this.soalIdx++;
		// 	this.bar.persen2(this.soalIdx, this.jmlSoal);

		// 	if (this.check()) {
		// 		this._nilai++;
		// 		this.feedbackBenarShow(this._cont);
		// 	}
		// 	else {
		// 		this.feedbackSalahShow(this._cont)
		// 	}
		// }
	}

	public get flArah(): Arah {
		return this._flArah;
	}
	public get flJarak(): Jarak {
		return this._flJarak;
	}
}

enum Jarak {
	JARAK_SATU,
	JARAK_ACAK
}

enum Arah {
	KECIL2BESAR,
	BESAR2KECIL
}