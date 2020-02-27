import { BaseSoal } from "../BaseSoal.js";
import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
//TODO: disatukan ke base bilangan
export class Bilangan extends BaseSoal {
    constructor() {
        super();
        this.angkaAr = [];
        this.batasAtas = 10;
        this.batasBawah = 5;
        this.acak = null;
        this.jawabCont = null;
        this.angkaCont = null;
        this.batasSpan = null;
        this._template = `
			<div class='bilangan cacah'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Sebutkan bilangan cacah kurang dari <span class='batas'>10</span></p>
				<div class='jawab-cont'>
				</div>
				<hr/>
				<div class='angka-cont'>
				</div>
				<div class='kirim-cont'>
					<button class='normal kirim'>Kirim</button>
				</div>
			</div>
		`;
        this.build();
        this.angkaCont = this.getEl('div.angka-cont');
        this.jawabCont = this.getEl('div.jawab-cont');
        this.batasSpan = this.getEl('p.judul-soal span.batas');
        this.acak = new Acak(this.batasAtas - this.batasBawah);
    }
    jawabanBenar() {
        let hsl = [];
        let hasilStr = '';
        hsl = this.angkaAr.slice(0, this.batasAtas);
        for (let i = 0; i < hsl.length; i++) {
            hasilStr += hsl[i].angka + ', ';
        }
        hasilStr = hasilStr.slice(0, hasilStr.length - 2);
        return hasilStr;
    }
    angkaAdaDiJawabanCont(angkaP) {
        for (let i = 0; i < this.angkaAr.length; i++) {
            let angka;
            angka = this.angkaAr[i];
            if (angka.elHtml.parentElement == this.jawabCont) {
                if (angka.angka == angkaP) {
                    return true;
                }
            }
        }
        return false;
    }
    check() {
        //check jumlah
        let jml = 0;
        for (let i = 0; i < this.angkaAr.length; i++) {
            let angka = this.angkaAr[i];
            if (angka.elHtml.parentElement == this.jawabCont) {
                jml++;
            }
        }
        if (jml != (this.batasAtas)) {
            console.log("jml " + jml + '/batas atas ' + this.batasAtas);
            return false;
        }
        console.log("check, batas atas: " + this.batasAtas);
        for (let i = 0; i < this.batasAtas; i++) {
            let ada = this.angkaAdaDiJawabanCont(i);
            if (false == ada) {
                return false;
            }
        }
        return true;
    }
    // userJawab(): void {
    // 	super.userJawab();
    // }
    // kirimOnClick(): void {
    // 	this.userJawab();
    // }
    init() {
        super.init();
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
