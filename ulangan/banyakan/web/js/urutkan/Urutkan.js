import { Angka, AngkaEnum } from "./Angka.js";
import { Acak } from "../Acak.js";
import { BaseSoal } from "../BaseSoal.js";
export class Urutkan extends BaseSoal {
    constructor() {
        super();
        this.angkas = [];
        this.acak = new Acak(10);
        this.max = 10;
        // protected jmlKotak: number = 3;	//TODO: angka lebih banyak
        this._flJarak = Jarak.JARAK_ACAK; //TODO: jarak 1 atau acak
        this._flArah = Arah.KECIL2BESAR; //TODO: arah ke besar atau ke kecil
        this.angkaSumberEl = null;
        this.angkaTargetEl = null;
        this._elHtml = document.body.querySelector('div.cont div.urutkan');
        this._cont = document.body.querySelector('div.cont');
        this.jmlKotak = 3;
    }
    init() {
        console.log('init');
        super.init();
        this.bar.attach(this._cont.querySelector('div.bar-cont'));
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
    debugAngka() {
        let ar = [];
        for (let i = 0; i < this.angkas.length; i++) {
            ar.push(this.angkas[i].angka);
        }
        console.log('debug angka ' + JSON.stringify(ar));
    }
    buatAngka() {
        let angka = 0;
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
            this.angkas[i].tempat = AngkaEnum.SUMBER;
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
        // this.render();
    }
    checkAdaAngkaDiSumber(angka) {
        return (this.angkaSumberEl.contains(angka.elHtml));
    }
    //TODO: test
    check() {
        let angkas = [];
        for (let i = 0; i < this.angkas.length; i++) {
            let angka;
            if (this.angkaTargetEl.contains(angka.elHtml)) {
                console.log('check failed, target tidak lengkap');
                console.log('angka tidak ada:');
                console.log(angka);
                console.log('angkatargetel:');
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
        for (let i = 0; i < this.angkaTargetEl.childElementCount; i++) {
            for (let j = 0; j < this.angkas.length; j++) {
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
        for (let i = 0; i < angkas.length; i++) {
            if (angkas[i] == 0)
                throw new Error(JSON.stringify(angkas));
            if (isNaN(angkas[i]))
                throw new Error(JSON.stringify(angkas));
        }
        //check urutan
        for (let i = 0; i < angkas.length - 1; i++) {
            if (angkas[i] < angkas[i + 1])
                return false;
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
    getAngka(el) {
        let ar = [];
        el.querySelectorAll('button.angka').forEach((item) => {
            ar.push(parseInt(item.innerHTML));
        });
        return ar;
    }
    urut(ar) {
        for (let i = 0; i < ar.length - 1; i++) {
            if (ar[i] >= ar[i + 1])
                return false;
        }
        return true;
    }
    check2() {
        let target = [];
        target = this.getAngka(this.angkaTargetEl);
        if (target.length < this.jmlKotak)
            return false;
        return this.urut(target);
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
        let angkas = [];
        angkas = this.getAngka(this.angkaTargetEl);
        if (angkas.length >= this.jmlKotak) {
            this.soalIdx++;
            this.bar.persen2(this.soalIdx, this.jmlSoal);
            if (this.check2()) {
                //feedback benar
                this.nilai++;
                this.feedbackBenarShow(this._cont);
            }
            else {
                //feedback salah
                this.feedbackSalahShow(this._cont);
            }
        }
        else {
            //belum selesai
        }
    }
    mulai() {
        super.mulai();
        this.soalIdx = 0;
        this.nilai = 0;
        this.bar.persen2(this.soalIdx, this.jmlSoal);
        this.reset();
    }
    get flArah() {
        return this._flArah;
    }
    get flJarak() {
        return this._flJarak;
    }
}
var Jarak;
(function (Jarak) {
    Jarak[Jarak["JARAK_SATU"] = 0] = "JARAK_SATU";
    Jarak[Jarak["JARAK_ACAK"] = 1] = "JARAK_ACAK";
})(Jarak || (Jarak = {}));
var Arah;
(function (Arah) {
    Arah[Arah["KECIL2BESAR"] = 0] = "KECIL2BESAR";
    Arah[Arah["BESAR2KECIL"] = 1] = "BESAR2KECIL";
})(Arah || (Arah = {}));
