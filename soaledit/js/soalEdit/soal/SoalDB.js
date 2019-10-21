import { SoalEdit } from "../SoalEdit.js";
//TODO: remove diganti direct reference ke categoryDB
export class SoalDB {
    constructor() {
    }
    hapus(soal) {
        let i;
        let ketemu = false;
        let list = SoalEdit.inst.category.catDipilih.soal;
        for (i = list.length; i >= 0; i--) {
            if (list[i] == soal) {
                list.splice(i, 1);
                console.log('hapus');
                ketemu = true;
            }
        }
        if (!ketemu) {
            console.group('soal not found');
            console.log('soal:');
            console.log(soal);
            console.log('list:');
            console.log(list);
            console.groupEnd();
            throw new Error('');
        }
    }
    createDefault() {
        return {
            soal: 'teks soal',
            jawaban: ["jawaban a", "jawaban b", "jawaban c", "jawaban d"],
            jawabanBenar: 1,
            score: 100
        };
    }
    edit(soal, soal2) {
        let i;
        this.editTeks(soal, soal2.soal);
        this.editScore(soal, soal2.score);
        for (i = 0; i < soal2.jawaban.length; i++) {
            this.editJawaban(soal, i, soal2.jawaban[i]);
        }
    }
    editTeks(soal, teks) {
        soal.soal = teks;
    }
    editScore(soal, score) {
        soal.score = score;
    }
    editJawaban(soal, idx, teks) {
        soal.jawaban[idx] = teks;
    }
    insert(soal) {
        let list = SoalEdit.inst.category.catDipilih.soal;
        list.push(soal);
    }
    // public get list(): Array<IDataSoal> {
    // 	return this._list;
    // }
    // public set list(value: Array<IDataSoal>) {
    // 	this._list = value;
    // }
    get cat() {
        return this._cat;
    }
    set cat(value) {
        this._cat = value;
        // this._list = this._cat.soal;
    }
}
