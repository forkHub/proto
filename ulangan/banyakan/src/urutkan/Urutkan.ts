import { Angka, AngkaEnum } from "./Angka.js";
import { Acak } from "../Acak.js";
import { BaseSoal } from "../BaseSoal.js";

export class Urutkan extends BaseSoal {

	private angkas: Array<Angka> = [];
	private acak: Acak = new Acak(10);
	private max: number = 10;
	// protected jmlKotak: number = 3;	//TODO: angka lebih banyak

	private _flJarak: Jarak = Jarak.JARAK_ACAK;	//TODO: jarak 1 atau acak

	private _flArah: Arah = Arah.KECIL2BESAR;	//TODO: arah ke besar atau ke kecil

	private angkaSumberEl: HTMLDivElement = null;
	private angkaTargetEl: HTMLDivElement = null;

	constructor() {
		super();
		this._elHtml = document.body.querySelector('div.cont div.urutkan') as HTMLDivElement;
		this.cont = document.body.querySelector('div.cont') as HTMLDivElement;
		this.jmlKotak = 3;
	}

	init(): void {
		console.log('init');
		super.init();

		this.bar.attach(this.cont.querySelector('div.bar-cont') as HTMLDivElement);

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
		// console.log('buat angka');
		// this.debugAngka();

		while (true) {
			angka = this.acak.get();
			if (!this.checkDouble(angka)) {
				// console.log('hasil ' + angka);
				// this.debugAngka();
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
			this.angkas[i].tempat = AngkaEnum.SUMBER;
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

		// this.render();
	}

	checkAdaAngkaDiSumber(angka: Angka): boolean {
		return (this.angkaSumberEl.contains(angka.elHtml));
	}

	//TODO: test
	check(): boolean {
		let angkas: Array<number> = [];

		for (let i: number = 0; i < this.angkas.length; i++) {
			let angka: Angka;
			if (this.angkaTargetEl.contains(angka.elHtml)) {
				console.log('check failed, target tidak lengkap');
				console.log('angka tidak ada:');
				console.log(angka);
				console.log('angkatargetel:')
				console.log(this.angkaTargetEl);
				return false;
			}
		}

		if (this.angkaTargetEl.childElementCount != this.jmlKotak) {
			console.log('check gagal, jumlah child element != ' + this.jmlKotak);
			console.log('this.angkatargetEl:');
			console.log(this.angkaTargetEl);
			throw new Error();
		}

		for (let i: number = 0; i < this.angkaTargetEl.childElementCount; i++) {
			for (let j: number = 0; j < this.angkas.length; j++) {
				if (this.angkaTargetEl.children[i] == this.angkas[j].elHtml) {
					angkas.push(this.angkas[j].angka);
				}
			}
			// angkas.push(parseInt(this.angkaTargetEl.children[i].innerHTML));
		}

		if (angkas.length != this.jmlKotak) {
			console.log(angkas);
			throw new Error('jumlah angka tidak cocok');
		}

		//check angka
		for (let i: number = 0; i < angkas.length; i++) {
			if (angkas[i] == 0) throw new Error(JSON.stringify(angkas));
			if (isNaN(angkas[i])) throw new Error(JSON.stringify(angkas));
		}

		//check urutan
		for (let i: number = 0; i < angkas.length - 1; i++) {
			if (angkas[i] < angkas[i + 1]) return false;
		}

		return true;
	}

	// render(): void {
	// 	for (let i: number = 0; i < this.angkas.length; i++) {
	// 		let angka: Angka = this.angkas[i];

	// 		if (angka.tempat == AngkaEnum.SUMBER) {
	// 			angka.attach(this.angkaSumberEl);
	// 		}
	// 		else if (angka.tempat == AngkaEnum.TARGET) {
	// 			angka.attach(this.angkaTargetEl);
	// 		}
	// 		else {
	// 			throw new Error();
	// 		}
	// 	}
	// }

	getAngka(el: HTMLDivElement): Array<number> {
		let ar: Array<number> = [];

		el.querySelectorAll('button.angka').forEach((item: Element) => {
			ar.push(parseInt(item.innerHTML));
		});

		return ar;
	}

	urut(ar: Array<number>): boolean {
		for (let i: number = 0; i < ar.length - 1; i++) {
			if (ar[i] >= ar[i + 1]) return false;
		}
		return true;
	}

	check2(): boolean {
		let target: Array<number> = [];

		target = this.getAngka(this.angkaTargetEl);
		if (target.length < this.jmlKotak) return false;

		return this.urut(target);
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

		let angkas: Array<number> = [];
		angkas = this.getAngka(this.angkaTargetEl);
		if (angkas.length >= this.jmlKotak) {
			this.soalIdx++;
			this.bar.persen2(this.soalIdx, this.jmlSoal);

			if (this.check2()) {
				//feedback benar
				this.nilai++;
				this.feedbackBenarShow(this.cont);
			}
			else {
				//feedback salah
				this.feedbackSalahShow(this.cont)
			}
		}
		else {
			//belum selesai
		}
	}

	mulai(): void {
		super.mulai();
		this.soalIdx = 0;
		this.nilai = 0;
		this.bar.persen2(this.soalIdx, this.jmlSoal);
		this.reset();
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