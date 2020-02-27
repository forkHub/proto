import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
import { BaseSoal } from "../BaseSoal.js";
export class Urutkan extends BaseSoal {
    constructor() {
        super();
        this.angkas = [];
        this.acak = new Acak(10);
        this.max = 10;
        this._flJarak = Jarak.JARAK_ACAK; //TODO: jarak 1 atau acak
        this._flArah = Arah.KECIL2BESAR; //TODO: arah ke besar atau ke kecil
        this.angkaSumberEl = null;
        this.angkaTargetEl = null;
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
    init() {
        console.log('init');
        super.init();
        this.acak.max = this.max;
        this.angkaSumberEl = this.getEl('div.sumber');
        this.angkaTargetEl = this.getEl('div.target');
        for (let i = 0; i < this.jmlKotak; i++) {
            let angkaN = this.buatAngka();
            let angka = new Angka(angkaN);
            angka.angkaClick = (angkaP) => {
                console.log('angka click');
                this.angkaClick(angkaP);
            };
            this.angkas.push(angka);
        }
    }
    jawabanBenar() {
        let angkaAr = [];
        for (let i = 0; i < this.angkas.length; i++) {
            angkaAr.push(this.angkas[i].angka);
        }
        if (Arah.KECIL2BESAR == this._flArah) {
            for (let i = 0; i < angkaAr.length; i++) {
                for (let j = i + 1; j < angkaAr.length; j++) {
                    if (angkaAr[i] > angkaAr[j]) {
                        let n = angkaAr[i];
                        angkaAr[i] = angkaAr[j];
                        angkaAr[j] = n;
                    }
                }
            }
        }
        else if (Arah.BESAR2KECIL == this._flArah) {
            for (let i = 0; i < angkaAr.length; i++) {
                for (let j = i + 1; j < angkaAr.length; j++) {
                    if (angkaAr[i] < angkaAr[j]) {
                        let n = angkaAr[i];
                        angkaAr[i] = angkaAr[j];
                        angkaAr[j] = n;
                    }
                }
            }
        }
        let hsl = '';
        for (let i = 0; i < angkaAr.length; i++) {
            hsl += angkaAr[i];
            if (i != angkaAr.length - 1) {
                hsl += ',';
            }
        }
        return hsl;
    }
    debugAngka() {
        let ar = [];
        for (let i = 0; i < this.angkas.length; i++) {
            ar.push(this.angkas[i].angka);
        }
        console.log('debug angka ' + JSON.stringify(ar));
    }
    buatAngka() {
        let angka = 0;
        while (true) {
            angka = this.acak.get();
            if (!this.checkDouble(angka)) {
                return angka;
            }
        }
    }
    checkDouble(angka) {
        for (let i = 0; i < this.angkas.length; i++) {
            if (this.angkas[i].angka === angka) {
                return true;
            }
        }
        return false;
    }
    resetAngka() {
        console.log('reset angka');
        for (let i = 0; i < this.angkas.length; i++) {
            this.angkas[i].angka = -1;
            this.angkas[i].attach(this.angkaSumberEl);
        }
        for (let i = 0; i < this.angkas.length; i++) {
            this.angkas[i].angka = this.buatAngka();
        }
    }
    reset() {
        console.log('reset');
        console.log('soal idx ' + this.soalIdx);
        super.reset();
        this.resetAngka();
    }
    getAngka(el) {
        let ar = [];
        el.querySelectorAll('button.angka').forEach((item) => {
            ar.push(parseInt(item.innerHTML));
        });
        return ar;
    }
    checkUrut(ar) {
        for (let i = 0; i < ar.length - 1; i++) {
            if (ar[i] >= ar[i + 1])
                return false;
        }
        return true;
    }
    checkUrutBesarKecil(ar) {
        for (let i = 0; i < ar.length - 1; i++) {
            if (ar[i] <= ar[i + 1])
                return false;
        }
        return true;
    }
    check() {
        let target = [];
        target = this.getAngka(this.angkaTargetEl);
        if (target.length < this.jmlKotak)
            return false;
        if (this._flArah == Arah.KECIL2BESAR) {
            return this.checkUrut(target);
        }
        else if (Arah.BESAR2KECIL == this._flArah) {
            return this.checkUrutBesarKecil(target);
        }
        else {
            throw new Error();
        }
    }
    angkaClick(angka) {
        if (this.angkaSumberEl.contains(angka.elHtml)) {
            angka.attach(this.angkaTargetEl);
        }
        else if (this.angkaTargetEl.contains(angka.elHtml)) {
            angka.attach(this.angkaSumberEl);
        }
        else {
            console.log(this.angkaSumberEl);
            console.log(this.angkaTargetEl);
            throw new Error();
        }
    }
    get flArah() {
        return this._flArah;
    }
    set flArah(value) {
        this._flArah = value;
    }
    get flJarak() {
        return this._flJarak;
    }
    get judul() {
        return this.getEl('p.judul-soal');
    }
}
export var Jarak;
(function (Jarak) {
    Jarak[Jarak["JARAK_SATU"] = 0] = "JARAK_SATU";
    Jarak[Jarak["JARAK_ACAK"] = 1] = "JARAK_ACAK";
})(Jarak || (Jarak = {}));
export var Arah;
(function (Arah) {
    Arah[Arah["KECIL2BESAR"] = 0] = "KECIL2BESAR";
    Arah[Arah["BESAR2KECIL"] = 1] = "BESAR2KECIL";
})(Arah || (Arah = {}));
