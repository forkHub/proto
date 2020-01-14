import { BaseSoal } from "../BaseSoal.js";
import { Acak } from "../Acak.js";
export class JumlahPilih extends BaseSoal {
    // private jawabans: Array<number> = [];
    constructor() {
        super();
        this.jawab1Tbl = null;
        this.jawab2Tbl = null;
        this.jawab3Tbl = null;
        this.tblAr = [];
        this.angkaSoal = 0;
        this.acakAngkaSoal = null;
        this._template = `
			<div class='jumlah'>
				<div class='soal'></div>
				<div class='jawaban'>
					<button class='jawab satu'></button>
					<button class='jawab dua'></button>
					<button class='jawab tiga'></button>
				</div>
			</div>
		`;
        this.build();
        //TODO: hapus diganti generic ke tblAr
        this.jawab1Tbl = this.getEl('button.jawab.satu');
        this.jawab2Tbl = this.getEl('button.jawab.dua');
        this.jawab3Tbl = this.getEl('button.jawab.tiga');
        this.tblAr = [];
        this.setTombol(this.jawab1Tbl);
        this.setTombol(this.jawab2Tbl);
        this.setTombol(this.jawab3Tbl);
        this.jawab1Tbl.onclick = (e) => {
            e.stopPropagation();
            this.tombolClick(0);
        };
        this.jawab2Tbl.onclick = () => {
            this.tombolClick(1);
        };
        this.jawab3Tbl.onclick = () => {
            this.tombolClick(2);
        };
        this.acakAngkaSoal = new Acak(this.angkaMax);
    }
    setTombol(tblView) {
        let tbl = new Tombol();
        tbl.view = tblView;
        this.tblAr.push(tbl);
    }
    tombolClick(idx) {
        if (idx == this.angkaSoal) {
            this.feedbackBenarShow(this.cont);
        }
        else {
            this.feedbackSalahShow(this.cont);
        }
    }
    debug() {
        console.log(this.jawab1Tbl);
        console.log(this.jawab2Tbl);
        console.log(this.jawab3Tbl);
    }
    init() {
    }
    reset() {
        super.reset();
        let geser = 0;
        //TODO: test edge case
        this.angkaSoal = this.acakAngkaSoal.get() + 1;
        if (this.angkaSoal <= 1)
            geser = 1;
        if (this.angkaSoal >= this.angkaMax - 1)
            geser = -1;
        //default
        for (let i = 0; i < 3; i++) {
            this.tblAr[i].angka = this.angkaSoal - (i + 1) + geser;
            this.tblAr[i].tulis();
        }
    }
}
class Tombol {
    constructor() {
        this._angka = 0;
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
}
