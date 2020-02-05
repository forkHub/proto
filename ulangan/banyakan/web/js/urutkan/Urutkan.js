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
        // this.bar.attach(this.getEl('div.bar-cont') as HTMLDivElement);
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
            // this.angkas[i].tempat = AngkaEnum.SUMBER;
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
    check() {
        let target = [];
        target = this.getAngka(this.angkaTargetEl);
        if (target.length < this.jmlKotak)
            return false;
        return this.checkUrut(target);
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
