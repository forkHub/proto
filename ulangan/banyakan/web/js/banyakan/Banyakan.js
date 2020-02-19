import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
import { BaseSoal } from "../BaseSoal.js";
//TODO: base soal
export class Banyakan extends BaseSoal {
    constructor() {
        super();
        //TODO: array
        this.angka1 = new Angka();
        this.angka2 = new Angka();
        this.angka3 = new Angka();
        this.acak = new Acak(10);
        this._angkaSaja = false;
        this._jmlAngka = 2;
        this.angkaDiKlik = 0;
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
        let b2 = this;
        this.angka1 = new Angka();
        this.angka1.attach(this._cont);
        this.angka2 = new Angka();
        this.angka2.attach(this._cont);
        this.angka3 = new Angka();
        this.angka3.attach(this._cont);
        function resetTombol() {
            b2.angka1.view.classList.remove('dipilih');
            b2.angka2.view.classList.remove('dipilih');
            b2.angka3.view.classList.remove('dipilih');
        }
        this.angka3.view.onclick = () => {
            resetTombol();
            this.angka3.view.classList.add('dipilih');
            this.angkaDiKlik = 3;
        };
        this.angka1.view.onclick = () => {
            resetTombol();
            this.angka1.view.classList.add('dipilih');
            this.angkaDiKlik = 1;
        };
        this.angka2.view.onclick = () => {
            resetTombol();
            this.angka2.view.classList.add('dipilih');
            this.angkaDiKlik = 2;
        };
    }
    check() {
        if (1 == this.angkaDiKlik) {
            if ((this.angka1.angka > this.angka2.angka) && (this.angka1.angka > this.angka3.angka)) {
                return true;
            }
        }
        else if (2 == this.angkaDiKlik) {
            if (this.angka2.angka > this.angka1.angka && (this.angka2.angka > this.angka3.angka)) {
                return true;
            }
        }
        else if (3 == this.angkaDiKlik) {
            if (this.angka3.angka > this.angka1.angka && (this.angka3.angka > this.angka2.angka)) {
                return true;
            }
        }
        else {
            throw new Error();
        }
        return false;
    }
    ambilAngka(n, n2) {
        while (true) {
            let res = this.acak.get();
            res++;
            if ((res != n) && (res != n2))
                return res;
        }
    }
    reset() {
        super.reset();
        this.acak.acak();
        this.angka1.angka = this.ambilAngka(-1, 1);
        this.angka2.angka = this.ambilAngka(this.angka1.angka, 1);
        if (this._jmlAngka == 3) {
            this.angka3.angka = this.ambilAngka(this.angka1.angka, this.angka2.angka);
        }
        else {
            this.angka3.angka = -1;
        }
        this.angka1.tulis(this._angkaSaja);
        this.angka2.tulis(this._angkaSaja);
        this.angka3.tulis(this._angkaSaja);
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
        if (this.angka3.view.parentElement) {
            this.angka3.view.parentElement.removeChild(this.angka3.view);
        }
        if (this._jmlAngka == 3) {
            this._cont.appendChild(this.angka3.view);
        }
    }
}
