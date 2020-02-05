import { BaseSoal } from "../BaseSoal.js";
import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
export class Pola extends BaseSoal {
    // private kirimTbl: HTMLButtonElement = null;
    constructor() {
        super();
        this.angkaAr = [];
        this.angkaCont = null;
        this._jmlAngka = 4;
        this._batasAtas = 20;
        this._jarak = 2;
        this._isiDiAwal = false;
        this._isiDiTengah = false;
        this.acak = null;
        this.acakPos = null;
        this._template = `
			<div class='pola'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Isilah angka yang kosong</p>
				<hr/>
				<div class='angka-cont'>
				</div>
				<hr/> 
				<button class='normal kirim'>Kirim</button>
			</div>
		`;
        this.build();
        // this.judulP = this.getEl('p.judul-soal') as HTMLParagraphElement;
        this.angkaCont = this.getEl('div.angka-cont');
        this.acak = new Acak(this._batasAtas);
        this.acakPos = new Acak(4);
    }
    check() {
        for (let i = 0; i < this.angkaAr.length; i++) {
            let angka = this.angkaAr[i];
            if (parseInt(angka.value) != angka.angka) {
                return false;
            }
        }
        return true;
    }
    init() {
        super.init();
        for (let i = 0; i < this._jmlAngka; i++) {
            let angka = new Angka();
            angka.attach(this.angkaCont);
            this.angkaAr.push(angka);
            if (this._isiDiAwal) {
                if (0 == i) {
                    angka.readonly = false;
                }
                else {
                    angka.readonly = true;
                }
            }
            else {
                if ((this._jmlAngka - 1) == i) {
                    angka.readonly = false;
                }
                else {
                    angka.readonly = true;
                }
            }
        }
        this.acak.max = this._batasAtas;
    }
    setFocus() {
        if (this._isiDiTengah) {
            for (let i = 0; i < this.angkaAr.length; i++) {
                let angka = this.angkaAr[i];
                angka.readonly = true;
                angka.value = angka.angka + '';
            }
            let posAngkaKosong = this.acakPos.get();
            this.angkaAr[posAngkaKosong].readonly = false;
            this.angkaAr[posAngkaKosong].elHtml.focus();
            this.angkaAr[posAngkaKosong].value = '';
        }
        else {
            if (this._isiDiAwal) {
                let angka;
                angka = this.angkaAr[0];
                angka.elHtml.focus();
                angka.value = '';
            }
            else {
                let angka;
                angka = this.angkaAr[this._jmlAngka - 1];
                angka.elHtml.focus();
                angka.value = '';
            }
        }
    }
    siapinAngka() {
        let ok = false;
        while (!ok) {
            let awal = this.acak.get();
            ok = true;
            for (let i = 0; i < this._jmlAngka; i++) {
                let angka;
                angka = this.angkaAr[i];
                angka.angka = awal + (this._jarak * i);
                if (angka.angka >= this._batasAtas)
                    ok = false;
            }
        }
    }
    reset() {
        super.reset();
        this.siapinAngka();
        this.setFocus();
    }
    get jmlAngka() {
        return this._jmlAngka;
    }
    set jmlAngka(value) {
        this._jmlAngka = value;
    }
    get jarak() {
        return this._jarak;
    }
    set jarak(value) {
        this._jarak = value;
    }
    get isiDiAwal() {
        return this._isiDiAwal;
    }
    set isiDiAwal(value) {
        this._isiDiAwal = value;
    }
    get isiDiTengah() {
        return this._isiDiTengah;
    }
    set isiDiTengah(value) {
        this._isiDiTengah = value;
    }
}
