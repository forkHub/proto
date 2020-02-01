import { BaseSoal } from "../BaseSoal.js";
import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
export class BilanganGanjil extends BaseSoal {
    constructor() {
        super();
        this.angkaAr = [];
        this.batasAtas = 10;
        this.batasBawah = 5;
        this.acak = null;
        this.jawabCont = null;
        this.angkaCont = null;
        this.batasSpan = null;
        this.kirimTbl = null;
        this._template = `
			<div class='bilangan ganjil'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Sebutkan bilangan ganjil kurang dari <span class='batas'>10</span></p c>
				<div class='jawab-cont'>
				</div>
				<hr/>
				<div class='angka-cont'>
				</div>
				<button class='normal'>Kirim</button>
			</div>
		`;
        this.build();
        this.angkaCont = this.getEl('div.angka-cont');
        this.jawabCont = this.getEl('div.jawab-cont');
        this.batasSpan = this.getEl('p.judul-soal span.batas');
        this.kirimTbl = this.getEl('button.normal');
        this.kirimTbl.onclick = () => {
            this.kirimOnClick();
        };
        this.acak = new Acak(this.batasAtas - this.batasBawah);
        for (let i = 0; i <= 10; i++) {
            let angka = new Angka();
            angka.angka = i;
            angka.attach(this.angkaCont);
            angka.angkaClick = () => {
                this.angkaClick(angka);
            };
            this.angkaAr.push(angka);
        }
    }
    angkaAda(angkaP) {
        for (let i = 0; i < this.angkaAr.length; i++) {
            let angka;
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
    jmlJawaban() {
        let hsl = 0;
        console.log('jumlah jawaban');
        for (let i = 0; i < this.batasAtas; i++) {
            if (i % 2) {
                hsl++;
                console.log('hasil ' + hsl + '/angka ' + i);
            }
        }
        return hsl;
    }
    check() {
        let jml = 0;
        for (let i = 0; i < this.angkaAr.length; i++) {
            let angka = this.angkaAr[i];
            if (angka.elHtml.parentElement == this.jawabCont) {
                jml++;
            }
        }
        if (jml != this.jmlJawaban()) {
            console.log("jml " + jml + '/batas atas ' + this.batasAtas);
            return false;
        }
        console.log("check, batas atas: " + this.batasAtas);
        for (let i = 0; i < this.batasAtas; i++) {
            if (1 == (i % 2)) {
                let ada = this.angkaAda(i);
                if (false == ada) {
                    return false;
                }
            }
        }
        return true;
    }
    kirimOnClick() {
        this.userJawab();
    }
    angkaClick(angka) {
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
    reset() {
        super.reset();
        for (let i = 0; i < this.angkaAr.length; i++) {
            this.angkaAr[i].attach(this.angkaCont);
        }
        this.batasAtas = this.acak.get() + this.batasBawah;
        this.batasSpan.innerText = this.batasAtas + '';
    }
}
