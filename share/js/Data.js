"use strict";
class IPost {
}
class PostObj {
    constructor() {
        this._teks = '';
        this._noHp = '';
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get teks() {
        return this._teks;
    }
    set teks(value) {
        this._teks = value;
    }
    get noHp() {
        return this._noHp;
    }
    set noHp(value) {
        this._noHp = value;
    }
}
class Data {
}
