import { Angka, AngkaEnum } from "./Angka.js";
import { Acak } from "../Acak.js";
import { BaseSoal } from "../BaseSoal.js";
import { Bar } from "../Bar.js";
export class Urutkan extends BaseSoal {
    constructor() {
        super();
        this.angkas = [];
        this.acak = new Acak(10);
        this.max = 10;
        this.jmlAngka = 3;
        this.cont = null;
        this.angkaSumberEl = null;
        this.angkaTargetEl = null;
        this._elHtml = document.body.querySelector('div.cont');
        this.cont = this._elHtml;
    }
    init() {
        console.log('init');
        super.init();
        this.acak.max = this.max;
        this.bar = new Bar();
        this.angkaSumberEl = this.getEl('div.sumber');
        this.angkaTargetEl = this.getEl('div.target');
        for (let i = 0; i < this.jmlAngka; i++) {
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
        if (this.angkaTargetEl.childElementCount != 3) {
            console.log('check gagal, jumlah child element != 3');
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
        if (angkas.length != this.jmlAngka) {
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
        if (target.length < this.jmlAngka)
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
        if (angkas.length >= 3) {
            this.soalIdx++;
            if (this.check2()) {
                //feedback benar
                this.nilai++;
                this.feedbackBenarShow(this.cont);
            }
            else {
                //feedback salah
                this.feedbackSalahShow(this.cont);
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
}
