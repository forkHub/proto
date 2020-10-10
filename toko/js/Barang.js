"use strict";
class BarangObj {
    get publish() {
        return this._publish;
    }
    set publish(value) {
        this._publish = value;
    }
    get file_id() {
        return this._file_id;
    }
    set file_id(value) {
        this._file_id = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get wa() {
        return this._wa;
    }
    set wa(value) {
        this._wa = value;
    }
    get thumb() {
        return this._thumb;
    }
    set thumb(value) {
        this._thumb = value;
    }
    get gbr() {
        return this._gbr;
    }
    set gbr(value) {
        this._gbr = value;
    }
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
    get deskripsi_panjang() {
        return this._deskripsi_panjang;
    }
    set deskripsi_panjang(value) {
        this._deskripsi_panjang = value;
    }
    get harga() {
        return this._harga;
    }
    set harga(value) {
        this._harga = value;
    }
}
class BarangController {
    static responseToObj(data) {
        let postObj = new BarangObj();
        // postObj.deskripsi = data.deskripsi;
        postObj.deskripsi_panjang = data.deskripsi_panjang;
        postObj.file_id = data.file_id;
        postObj.gbr = data.gbr;
        postObj.harga = data.harga;
        postObj.id = data.id;
        postObj.nama = data.nama;
        postObj.thumb = data.thumb;
        postObj.wa = data.wa;
        postObj.publish = data.publish;
        return postObj;
    }
}
