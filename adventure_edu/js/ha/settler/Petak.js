// namespace fg {
// 
import { PetakView } from './PetakView.js';
import { Game } from './Game.js';
import { Global } from './Global.js';
import { Perintah } from './Perintah.js';
export class Petak {
    constructor() {
        this._stAir = false;
        this._state = Game.ST_IDLE;
    }
    init() {
        this._view = new PetakView();
        this._mainChar = Global.getInst().mainChar;
        this._view.initAnim();
        this._view.on("click", this.onClick.bind(this));
    }
    aksiMulai() {
        this._state = Game.ST_AKSI;
    }
    checkAksiSelesai() {
        return this._state == Game.ST_AKSI_SELESAI;
    }
    aksiSelesai() {
        this._state = Game.ST_IDLE;
    }
    gantiHari() {
        this._stAir = false;
        this._state = Game.ST_IDLE;
    }
    update() {
        if (this._state == Game.ST_AKSI) {
            this._stAir = true;
            this._state = Game.ST_AKSI_SELESAI;
            this._view.animation.gotoAndStop('air');
        }
        else if (this._state == Game.ST_AKSI_SELESAI) {
        }
        else if (this._state == Game.ST_IDLE) {
        }
    }
    onClick(evt) {
        evt.stopPropagation();
        console.log("petak on click");
        this._mainChar.perintahTunggu.reset();
        this._mainChar.perintahTunggu.aktif = true;
        this._mainChar.perintahTunggu.tx = Math.floor(evt.stageX / 32);
        this._mainChar.perintahTunggu.ty = Math.floor(evt.stageY / 32);
        this._mainChar.perintahTunggu.targetType = Perintah.PETAK;
        this._mainChar.perintahTunggu.target = this;
    }
    get view() {
        return this._view;
    }
    set view(value) {
        this._view = value;
    }
    get mainChar() {
        return this._mainChar;
    }
    set mainChar(value) {
        this._mainChar = value;
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
    get stAir() {
        return this._stAir;
    }
}
Petak.FASE_KOSONG = 'fase kosong';
Petak.FASE_BIJI = 'fase biji';
Petak.FASE_TUNAHS = 'fase tunas';
// }
