export class AnggotaObj {
    constructor() {
        this._nama = '';
        this._id = '';
        this._idFoto = '';
        // private _orangTuaId: string = '';
        this._namaLengkap = '';
        this._alamat = '';
        this._tglLahir = NaN;
        this._tglMeninggal = NaN;
        this._wa = '';
        this._facebook = '';
        this._instagram = '';
        this._linkedin = '';
        this._jkl = '';
    }
    get jkl() {
        return this._jkl;
    }
    set jkl(value) {
        this._jkl = value;
    }
    get namaLengkap() {
        return this._namaLengkap;
    }
    set namaLengkap(value) {
        this._namaLengkap = value;
    }
    get alamat() {
        return this._alamat;
    }
    set alamat(value) {
        this._alamat = value;
    }
    get tglLahir() {
        return this._tglLahir;
    }
    set tglLahir(value) {
        this._tglLahir = value;
    }
    get tglMeninggal() {
        return this._tglMeninggal;
    }
    set tglMeninggal(value) {
        this._tglMeninggal = value;
    }
    get wa() {
        return this._wa;
    }
    set wa(value) {
        this._wa = value;
    }
    get facebook() {
        return this._facebook;
    }
    set facebook(value) {
        this._facebook = value;
    }
    get linkedin() {
        return this._linkedin;
    }
    set linkedin(value) {
        this._linkedin = value;
    }
    get instagram() {
        return this._instagram;
    }
    set instagram(value) {
        this._instagram = value;
    }
    // public get orangTuaId(): string {
    // return this._orangTuaId;
    // }
    // public set orangTuaId(value: string) {
    // this._orangTuaId = value;
    // }
    get idFoto() {
        return this._idFoto;
    }
    set idFoto(value) {
        this._idFoto = value;
    }
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
}
