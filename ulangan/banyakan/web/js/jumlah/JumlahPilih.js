import { BaseSoal } from "../BaseSoal.js";
import { Acak } from "../Acak.js";
import { iconBuah } from "../Buah.js";
export class JumlahPilih extends BaseSoal {
    constructor() {
        super();
        this.tblAr = [];
        this.soalKotak = null;
        this.jawabCont = null;
        this.angkaJawaban = 0;
        this.angkaDipilih = 0;
        this.acakAngkaSoal = null;
        this._template = `
			<div class='jumlah-pilih'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Berapa Jumlahnya</p> 
				<div class='soal'>
					<div class='soal1'></div>
					<div class='soal2'/></div>
				</div>
				<div class='jawaban'>
					<button class='jawab satu putih'></button>
					<button class='jawab dua putih'></button>
					<button class='jawab tiga putih'></button>
				</div>
				<div class='kirim-cont'>
					<button class='kirim normal'>Kirim</button>
				</div>
			</div>
		`;
        this.build();
        this.soalKotak = this.getEl('div.soal div.soal1');
        this.jawabCont = this.getEl('div.jawaban');
        this.tblAr = [];
        this.setTombol(this.getEl('button.jawab.satu'));
        this.setTombol(this.getEl('button.jawab.dua'));
        this.setTombol(this.getEl('button.jawab.tiga'));
        this.acakAngkaSoal = new Acak(this.angkaMax);
    }
    setTombol(tblView) {
        let tbl = new Tombol();
        tbl.view = tblView;
        this.tblAr.push(tbl);
        tbl.onClick = () => {
            this.tombolClick(tbl);
        };
    }
    check() {
        if (this.angkaDipilih == this.angkaJawaban)
            return true;
        return false;
        // this.soalIdx++;
        // this.bar.persen2(this.soalIdx, this.jmlSoal);
        // if (idx.angka == this.angkaSoal) {
        // 	this._nilai++;
        // 	this.feedbackBenarShow(this._cont);
        // }
        // else {
        // 	this.feedbackSalahShow(this._cont);
        // }
    }
    tombolClick(tombol) {
        console.log('tombol click ' + tombol.angka + '/' + this.angkaJawaban);
        this.angkaDipilih = tombol.angka;
    }
    debug() { }
    reset() {
        console.log('Jumlah: reset');
        super.reset();
        this.angkaJawaban = this.acakAngkaSoal.get() + 1;
        this.tblAr[0].angka = this.angkaJawaban;
        this.tblAr[1].angka = this.acakAngkaSoal.get2([this.tblAr[0].angka]);
        this.tblAr[2].angka = this.acakAngkaSoal.get2([this.tblAr[0].angka, this.tblAr[1].angka]);
        this.tblAr[0].tulis();
        this.tblAr[1].tulis();
        this.tblAr[2].tulis();
        for (let i = 0; i < 1000; i++) {
            this.acakSoal();
        }
        for (let i = 0; i < 3; i++) {
            this.tblAr[i].view.parentElement.removeChild(this.tblAr[i].view);
        }
        for (let i = 0; i < 3; i++) {
            this.jawabCont.appendChild(this.tblAr[i].view);
        }
        let str = '';
        let iconIdx = Math.floor(Math.random() * iconBuah.length);
        for (let i = 0; i < this.angkaJawaban; i++) {
            str += iconBuah[iconIdx];
        }
        this.soalKotak.innerHTML = str;
    }
    acakSoal() {
        let a = Math.floor(Math.random() * 3);
        let b = Math.floor(Math.random() * 3);
        if (a == b)
            return;
        let angka = new Tombol();
        angka = this.tblAr[a];
        this.tblAr[a] = this.tblAr[b];
        this.tblAr[b] = angka;
    }
}
class Tombol {
    constructor() {
        this._angka = 0;
    }
    set onClick(value) {
        this._view.onclick = () => {
            value(this);
        };
    }
    get angka() {
        return this._angka;
    }
    set angka(value) {
        this._angka = value;
    }
    get view() {
        return this._view;
    }
    set view(value) {
        this._view = value;
    }
    tulis() {
        this._view.innerText = this._angka + '';
    }
    copy(angka2) {
        angka2.angka = this._angka;
        angka2.view = this._view;
    }
    copyFrom(angka) {
        this._angka = angka.angka;
        this._view = angka.view;
    }
}
