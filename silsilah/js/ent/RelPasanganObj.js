export class RelPasanganObj {
    constructor() {
        this._anak1 = '';
        this._anak2 = '';
        this._id = '';
        this._anaks = [];
    }
    get anakStr() {
        return this._anakStr;
    }
    set anakStr(value) {
        this._anakStr = value;
    }
    get anaks() {
        return this._anaks;
    }
    set anaks(value) {
        this._anaks = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get anak2() {
        return this._anak2;
    }
    set anak2(value) {
        this._anak2 = value;
    }
    get anak1() {
        return this._anak1;
    }
    set anak1(value) {
        this._anak1 = value;
    }
}
// export interface IRelPasanganDbo {
// 	id: string;
// 	anak1: string;
// 	anak2: string;
// 	anaks: string;
// }
