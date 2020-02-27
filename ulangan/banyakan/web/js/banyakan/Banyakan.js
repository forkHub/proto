import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
import { BaseSoal } from "../BaseSoal.js";
//TODO: base soal
export class Banyakan extends BaseSoal {
    constructor() {
        super();
        //TODO: array
        // private angka1: Angka = new Angka();
        // private angka2: Angka = new Angka();
        // private angka3: Angka = new Angka();
        this.acak = new Acak(10);
        this._angkaSaja = false;
        this._jmlAngka = 2;
        this.angkaDiKlik = null;
        this.angkas = [];
        this._template =
            `<div class='banyakan'>
				<div class='bar-cont'></div>
				<h1 class='perintah'>Mana Yang Lebih Banyak?</h1>
				<div class='cont'></div>
				<div class='kirim-cont'>
					<button class='normal kirim'>Kirim</button>
				</div>
			</div>`;
        this.build();
        this._cont = this.getEl('div.cont');
    }
    init() {
        super.init();
        this.acak.max = 10;
        this.acak.acak();
        this.angkaInit();
    }
    angkaInit() {
        // let b2: Banyakan = this;
        for (let i = 0; i < this._jmlAngka; i++) {
            let angka = new Angka();
            angka.attach(this._cont);
            angka.view.onclick = () => {
                this.resetTombol();
                angka.view.classList.add('dipilih');
                this.angkaDiKlik = angka;
            };
            this.angkas.push(angka);
        }
        // this.angka3.view.onclick = () => {
        // 	this.resetTombol();
        // 	this.angka3.view.classList.add('dipilih');
        // 	this.angkaDiKlik = 3;
        // }
        // this.angka1.view.onclick = () => {
        // 	this.resetTombol();
        // 	this.angka1.view.classList.add('dipilih');
        // 	this.angkaDiKlik = 1;
        // }
        // this.angka2.view.onclick = () => {
        // 	this.resetTombol();
        // 	this.angka2.view.classList.add('dipilih');
        // 	this.angkaDiKlik = 2;
        // }
    }
    resetTombol() {
        for (let i = 0; i < this._jmlAngka; i++) {
            let angka = this.angkas[i];
            angka.view.classList.remove('dipilih');
        }
    }
    jawabanBenar() {
        return "<br/>" + this.angkaTerbesar().view.innerHTML;
    }
    angkaTerbesar() {
        let res = this.angkas[0];
        for (let i = 0; i < this.angkas.length; i++) {
            let angka = this.angkas[i];
            if (angka.angka > res.angka) {
                res = angka;
            }
        }
        return res;
    }
    check() {
        if (this.angkaTerbesar() == this.angkaDiKlik) {
            return true;
        }
        return false;
        // for (let i: number = 0; i < this.angkas.length; i++) {
        // 	let angka: Angka = this.angkas[i];
        // 	if (this.angkaTerbesar() == angka) return true;
        // }
        // if (1 == this.angkaDiKlik) {
        // 	if ((this.angka1.angka > this.angka2.angka) && (this.angka1.angka > this.angka3.angka)) {
        // 		return true;
        // 	}
        // }
        // else if (2 == this.angkaDiKlik) {
        // 	if (this.angka2.angka > this.angka1.angka && (this.angka2.angka > this.angka3.angka)) {
        // 		return true;
        // 	}
        // }
        // else if (3 == this.angkaDiKlik) {
        // 	if (this.angka3.angka > this.angka1.angka && (this.angka3.angka > this.angka2.angka)) {
        // 		return true;
        // 	}
        // }
        // else {
        // 	throw new Error();
        // }
        // return false;
    }
    // ambilAngka(n: number, n2: number): number {
    // 	while (true) {
    // 		let res: number = this.acak.get();
    // 		res++;
    // 		if ((res != n) && (res != n2)) return res;
    // 	}
    // }
    checkAngkaUnik(angkaCheck) {
        for (let i = 0; i < this._jmlAngka; i++) {
            let angka = this.angkas[i];
            if (angkaCheck == angka.angka)
                return false;
        }
        return true;
    }
    // setAngka(angka: Angka): void {
    // 	while (true) {
    // 		angka.angka = this.acak.get() + 1;
    // 		if (this.checkAngkaUnik(angka)) return;
    // 	}
    // }
    buatAngkaUnik() {
        let hasil = 0;
        while (true) {
            hasil = this.acak.get() + 1;
            if (this.checkAngkaUnik(hasil))
                return hasil;
        }
    }
    resetAngka() {
        for (let i = 0; i < this._jmlAngka; i++) {
            let angka = this.angkas[i];
            angka.angka = -1;
        }
    }
    reset() {
        super.reset();
        this.acak.acak();
        this.resetAngka();
        for (let i = 0; i < this._jmlAngka; i++) {
            let angka = this.angkas[i];
            angka.angka = this.buatAngkaUnik();
            angka.tulis(this._angkaSaja);
        }
        this.angkaDiKlik = null;
        // this.angka1.angka = this.ambilAngka(-1, 1);
        // this.angka2.angka = this.ambilAngka(this.angka1.angka, 1);
        // if (this._jmlAngka == 3) {
        // 	this.angka3.angka = this.ambilAngka(this.angka1.angka, this.angka2.angka);
        // }
        // else {
        // 	this.angka3.angka = -1;
        // }
        // this.angka1.tulis(this._angkaSaja);
        // this.angka2.tulis(this._angkaSaja);
        // this.angka3.tulis(this._angkaSaja);
    }
    get angkaSaja() {
        return this._angkaSaja;
    }
    set angkaSaja(value) {
        this._angkaSaja = value;
    }
    get jmlAngka() {
        return this._jmlAngka;
    }
    set jmlAngka(value) {
        this._jmlAngka = value;
        // if (this.angka3.view.parentElement) {
        // 	this.angka3.view.parentElement.removeChild(this.angka3.view);
        // }
        // if (this._jmlAngka == 3) {
        // 	this._cont.appendChild(this.angka3.view);
        // }
    }
}
