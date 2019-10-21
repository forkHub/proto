import { SoalEdit } from "../SoalEdit.js";
// import { Soal } from "../soal/Soal";
//TODO:
export class CatDB {
    constructor() {
        this._listCategory = [];
    }
    get listCategory() {
        return this._listCategory;
    }
    default() {
        return {
            label: 'Kategori ' + this._listCategory.length,
            soal: []
        };
    }
    defaultSoal() {
        return {
            soal: 'teks soal',
            jawaban: ["jawaban a", "jawaban b", "jawaban c", "jawaban d"],
            jawabanBenar: 1,
            score: 100
        };
    }
    insert(cat) {
        this._listCategory.push(cat);
        SoalEdit.inst.statusEdit = true;
    }
    hapus(cat) {
        let item;
        let totalDelete = 0;
        console.group('hapus category');
        console.log(cat);
        //hapus cat
        for (let i = this._listCategory.length - 1; i >= 0; i--) {
            item = this._listCategory[i];
            if (item === cat) {
                console.log('hapus pada idx ' + i);
                this._listCategory.splice(i, 1);
                totalDelete++;
            }
        }
        SoalEdit.inst.statusEdit = true;
        if (totalDelete != 1)
            throw Error('delete != 1');
        console.groupEnd();
    }
    hapusSemuaCat() {
        while (this._listCategory.length > 0) {
            this._listCategory.pop();
        }
        SoalEdit.inst.statusEdit = true;
    }
}
