///<reference path='./IObject.ts'/>
// namespace fg {
export class Perintah {
    constructor() {
        this._tx = 0;
        this._ty = 0;
        this._aktif = false;
        this._target = null;
        this._targetType = '';
    }
    reset() {
        this._tx = 0;
        this._ty = 0;
        this._aktif = false;
        this._target = null;
        this._targetType = '';
    }
    cloneTo(perintah) {
        perintah.reset();
        perintah.tx = this._tx;
        perintah.ty = this._ty;
        perintah._aktif = this._aktif;
        perintah.target = this._target;
        perintah.targetType = this._targetType;
    }
    get tx() {
        return this._tx;
    }
    set tx(value) {
        this._tx = value;
    }
    get ty() {
        return this._ty;
    }
    set ty(value) {
        this._ty = value;
    }
    get aktif() {
        return this._aktif;
    }
    set aktif(value) {
        this._aktif = value;
    }
    get target() {
        return this._target;
    }
    set target(value) {
        this._target = value;
    }
    get targetType() {
        return this._targetType;
    }
    set targetType(value) {
        this._targetType = value;
    }
}
Perintah.PETAK = 'PETAK';
// }
