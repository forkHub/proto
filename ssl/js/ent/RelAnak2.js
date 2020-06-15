export class RelAnak2 {
    constructor() {
        this._relPasanganId = '';
        this._anakId = '';
        this._urutan = 0;
        this._id = '';
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get relPasanganId() {
        return this._relPasanganId;
    }
    set relPasanganId(value) {
        this._relPasanganId = value;
    }
    get urutan() {
        return this._urutan;
    }
    set urutan(value) {
        this._urutan = value;
    }
    get anakId() {
        return this._anakId;
    }
    set anakId(value) {
        this._anakId = value;
    }
}
