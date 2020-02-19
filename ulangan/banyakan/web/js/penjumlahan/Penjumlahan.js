import { BaseSoal } from "../BaseSoal.js";
import { Angka } from "./Angka.js";
import { Acak } from "../Acak.js";
export class Penjumlahan extends BaseSoal {
    constructor() {
        super();
        this.angkas = [];
        this.acak = null;
        this.acakPos2 = null;
        this._posisiJawaban = Penjumlahan.J_AKHIR;
        this._batasAtas = 10;
        this._batasBawah = 0;
        this._acakPos = false;
        this.judulP = null;
        this.operatorSpan = null;
        this._pengurangan = false;
        this._template = `
			<div class='penjumlahan'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Berapa Jumlahnya</p>
				<hr/>
				<div class='soal-cont'>
					<input class='angka satu'>
					<span class='operator'>+</span>
					<input class='angka dua'>
					<span>=</span>
					<input class='angka tiga'>
				</div>
				<hr/> 
				<button class='normal kirim'>Kirim</button>
			</div>
		`;
        this.build();
        for (let i = 0; i < 3; i++) {
            let angka;
            let input;
            input = this.getEl2('input.angka', i);
            angka = new Angka(input);
            angka.input.type = 'text';
            this.angkas.push(angka);
        }
        // this.kirimTbl = this.getEl('button.kirim') as HTMLButtonElement;
        // this.kirimTbl.onclick = () => {
        // 	this.kirimOnClick();
        // }
        this.judulP = this.getEl('p.judul-soal');
        this.operatorSpan = this.getEl('span.operator');
        this.acak = new Acak(10);
        this.acakPos2 = new Acak(3);
    }
    jawabanBenar() {
        for (let i = 0; i < 3; i++) {
            let angka;
            angka = this.angkas[i];
            if (angka.readonly == false) {
                return "Jawaban benar: " + angka.angka;
            }
        }
        return "";
    }
    check() {
        for (let i = 0; i < 3; i++) {
            let angka;
            angka = this.angkas[i];
            if (parseInt(angka.value) != angka.angka) {
                return false;
            }
        }
        return true;
    }
    validate() {
        if (this._pengurangan)
            return this.validasiPengurangan();
        if (this.angkas[2].angka <= this._batasAtas) {
            if (this.angkas[2].angka >= this._batasBawah) {
                return true;
            }
        }
        return false;
    }
    validasiPengurangan() {
        if (this.angkas[0].angka < this.batasBawah)
            return false;
        if (this.angkas[1].angka < this.batasBawah)
            return false;
        if (this.angkas[0].angka < this.angkas[1].angka) {
            let angka = this.angkas[0].angka;
            this.angkas[0].angka = this.angkas[1].angka;
            this.angkas[1].angka = angka;
            // return true;
        }
        this.angkas[2].angka = this.angkas[0].angka - this.angkas[1].angka;
        return true;
    }
    setJawaban() {
        this.angkas[2].angka = this.angkas[0].angka + this.angkas[1].angka;
    }
    setAngka() {
        for (let i = 0; i < 2; i++) {
            let angka = this.angkas[i];
            angka.angka = angka.acak.get();
            angka.input.type = 'text';
            angka.readonly = true;
        }
        while (true) {
            let angka = this.angkas[1];
            angka.angka = angka.acak.get();
            this.setJawaban();
            if (this.validate())
                return;
        }
    }
    setPosisiJawaban() {
        let angka;
        if (this._acakPos) {
            this._posisiJawaban = this.acakPos2.get();
        }
        angka = this.angkas[this._posisiJawaban];
        angka.input.type = 'number';
        angka.readonly = false;
        angka.value = '';
        angka.elHtml.focus();
    }
    reset() {
        super.reset();
        this.acak.max = this._batasAtas;
        this.angkas[0].acak.max = this._batasAtas;
        this.angkas[1].acak.max = this._batasAtas;
        this.angkas[2].acak.max = this._batasAtas;
        this.setAngka();
        this.setPosisiJawaban();
        if (this._posisiJawaban != 2) {
            this.judulP.innerHTML = 'Isikan kotak yang kosong';
        }
        else {
            this.judulP.innerHTML = 'Berapa Jumlahnya';
        }
        this.operatorSpan.innerText = "+";
        if (this._pengurangan) {
            this.operatorSpan.innerText = "-";
        }
    }
    get posisiJawaban() {
        return this._posisiJawaban;
    }
    set posisiJawaban(value) {
        this._posisiJawaban = value;
    }
    get batasBawah() {
        return this._batasBawah;
    }
    set batasBawah(value) {
        this._batasBawah = value;
    }
    get acakPos() {
        return this._acakPos;
    }
    set acakPos(value) {
        this._acakPos = value;
    }
    get batasAtas() {
        return this._batasAtas;
    }
    set batasAtas(value) {
        this._batasAtas = value;
    }
    get pengurangan() {
        return this._pengurangan;
    }
    set pengurangan(value) {
        this._pengurangan = value;
    }
}
Penjumlahan.J_AWAL = 0;
Penjumlahan.J_TENGAH = 1;
Penjumlahan.J_AKHIR = 2;
