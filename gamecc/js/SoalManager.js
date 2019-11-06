"use strict";
var fg;
(function (fg) {
    class SoalManager {
        constructor() {
            this._data = [];
            this._catCr = null;
            this._default = `[{"label":"Pertambahan","soal":[{"soal":"1 + 1","jawaban":["2","3","4","5"],"jawabanBenar":1,"score":100},{"soal":"5 + 3","jawaban":["7","8","9","10"],"jawabanBenar":2,"score":100},{"soal":"2 + 2","jawaban":["6","4","2","3"],"jawabanBenar":2,"score":100},{"soal":"5 + 2","jawaban":["7","8","9","10"],"jawabanBenar":1,"score":100}]},{"label":"Perkalian","soal":[{"soal":"3 x 2","jawaban":["6","7","8","9"],"jawabanBenar":1,"score":100},{"soal":"2 x 2","jawaban":["4","5","6","7"],"jawabanBenar":1,"score":100},{"soal":"4 x 1","jawaban":["2","3","4","5"],"jawabanBenar":3,"score":100}]},{"label":"Pengurangan","soal":[{"soal":"3 - 3","jawaban":["0","1","2","3"],"jawabanBenar":1,"score":100},{"soal":"4 - 2","jawaban":["2","3","4","5"],"jawabanBenar":1,"score":100},{"soal":"7 - 4","jawaban":["4","3","2","1"],"jawabanBenar":2,"score":100}]},{"label":"Pembagian","soal":[{"soal":"4 - 2","jawaban":["1","2","3","4"],"jawabanBenar":2,"score":100},{"soal":"6 - 3","jawaban":["1","2","3","4"],"jawabanBenar":3,"score":100},{"soal":"3 - 0","jawaban":["4","3","2","1"],"jawabanBenar":2,"score":100}]}]`;
            // this._data = DataSoal;
        }
        importSoal(soal, soalSrc) {
            soal.soal = soalSrc.soal;
            soal.jawabanBenar = soalSrc.jawabanBenar;
            soal.score = soalSrc.score;
            soal.sudahDijawab = soalSrc.sudahDijawab;
            for (let i = 0; i < soal.jawaban.length; i++) {
                soal.jawaban[i] = soalSrc[i];
            }
        }
        importCat(cat, catSource) {
            console.log('import cat');
            cat.label = catSource.label;
            for (let i = 0; i < this.catCr.soal.length; i++) {
                this.importSoal(cat.soal[i], catSource.soal[i]);
            }
        }
        importData(dataSource) {
            console.log('import data');
            console.log(dataSource);
            this._data = dataSource;
        }
        resetSoal() {
            let i;
            let j;
            let cat;
            let soal;
            for (i = 0; i < this._data.length; i++) {
                cat = this._data[i];
                for (j = 0; j < cat.soal.length; j++) {
                    soal = cat.soal[j];
                    soal.sudahDijawab = false;
                    if (!soal.score)
                        soal.score = 100;
                }
            }
        }
        getJmlSoal(cat) {
            let i;
            let jml = 0;
            for (i = 0; i < cat.soal.length; i++) {
                if (cat.soal[i].sudahDijawab == false) {
                    jml++;
                }
            }
            return jml;
        }
        getCategoryList() {
            let res = [];
            let i;
            let cat;
            let jml;
            for (i = 0; i < this._data.length; i++) {
                cat = this._data[i];
                jml = this.getJmlSoal(cat);
                if (jml > 0) {
                    res.push({
                        cat: cat,
                        jml: jml
                    });
                }
            }
            return res;
        }
        getSoalBelumDijawab(cat) {
            for (let i = 0; i < cat.soal.length; i++) {
                if (cat.soal[i].sudahDijawab == false) {
                    // console.log('i ' + i);
                    return cat.soal[i];
                }
            }
            throw new Error('');
        }
        get catCr() {
            return this._catCr;
        }
        set catCr(value) {
            this._catCr = value;
        }
        get data() {
            return this._data;
        }
        get default() {
            return this._default;
        }
    }
    fg.SoalManager = SoalManager;
})(fg || (fg = {}));
