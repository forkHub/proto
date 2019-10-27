import { MainCharView } from './MainCharView.js';
import { Perintah } from '../Perintah.js';
import { PFHelper } from '../../pf/pfHelper.js';
import { PathFinder } from '../../pf/PathFinder.js';
import { Point } from '../../pf/Point.js';
// import { ViewPort } from '../ViewPort.js';
// import { Global } from '../Global.js';
export class MainChar {
    constructor() {
        this.ruteJalan = [];
        this._pos = new Point();
        this.state = 1;
    }
    init() {
        this._view = new MainCharView();
        this.initPathFinder();
        this._view.initAnim();
        this._perintah = new Perintah();
        this._perintahTunggu = new Perintah();
    }
    initPathFinder() {
        this.pf = new PathFinder();
        this.pf.flBlocked = PathFinder.BL_TERDEKAT;
        this.pfHelper = new PFHelper();
        this.pfHelper.langkahTotal = 8;
        this.pf.checkCanMoveToPos = (x, y) => {
            return this._map.isPassable(x, y);
        };
        this.pf.checkSampai = (i, j, tx, ty) => {
            var jrkX;
            var jrkY;
            let hasil;
            // console.group('check sampai');
            if (this._perintah && this._perintah.target) {
                jrkX = Math.abs(tx - i);
                jrkY = (ty - j);
                hasil = (jrkX == 0) && (jrkY == 1);
                // console.log('jrkx ' + jrkX + '/jrky ' + jrkY);
                // console.groupEnd();
                return hasil;
            }
            else {
                return (i == tx) && (j == ty);
            }
        };
        this.pfHelper.updateArahCallBack = () => {
            this._view.updateAnim(this.pfHelper.arah);
        };
    }
    updateView() {
        this._view.x = this._pos.x;
        this._view.y = this._pos.y;
    }
    stateIdle() {
        this._perintah.reset();
        if (this._perintahTunggu.aktif) {
            this._perintahTunggu.cloneTo(this._perintah);
            this._perintahTunggu.reset();
        }
        if (this._perintah.aktif) {
            this.ruteJalan = this.pf.find(Math.floor(this._pos.x / 32), Math.floor(this._pos.y / 32), this._perintah.tx, this._perintah.ty);
            if (this.ruteJalan.length > 0) {
                this.pfHelper.start(this.ruteJalan);
                this._view.updateAnim(this.pfHelper.arah);
                this.state = MainChar.JALAN;
                console.log('rute jalan');
                console.log(this.ruteJalan);
                console.log('next state ' + this.state);
                console.log('perintah aktif ' + this._perintah.aktif);
            }
            else {
                console.log('rute jalan tidak ketemu');
                console.log(this.ruteJalan);
            }
        }
    }
    onGrid() {
        if ((this._pos.x % 32) != 0)
            return false;
        if ((this._pos.y % 32) != 0)
            return false;
        return true;
    }
    stateJalan() {
        // let perintah: Perintah;
        if (this.onGrid()) {
            if (this._perintahTunggu.aktif) {
                this._perintahTunggu.cloneTo(this._perintah);
                this._perintahTunggu.reset();
                if (this._perintah.aktif) {
                    this.ruteJalan = this.pf.find(Math.floor(this._pos.x / 32), Math.floor(this._pos.y / 32), this._perintah.tx, this._perintah.ty);
                    if (this.ruteJalan.length > 0) {
                        this.pfHelper.start(this.ruteJalan);
                        this._view.updateAnim(this.pfHelper.arah);
                        this.state = MainChar.JALAN;
                        console.log('state jalan update next state st_jalan ');
                        return;
                    }
                }
            }
        }
        this.pfHelper.update();
        this._pos.x = this.pfHelper.pos.x;
        this._pos.y = this.pfHelper.pos.y;
        if (!this.pfHelper.sedangJalan) {
            this.state = MainChar.JALAN_FINISH;
            this._view.animation.gotoAndStop("berdiri");
            console.log('state jalan update next state ' + this.state);
        }
    }
    updateState() {
        if (this.state == MainChar.IDLE) {
            this.stateIdle();
        }
        else if (this.state == MainChar.JALAN) {
            // console.log(this.state);
            this.stateJalan();
        }
        else if (this.state == MainChar.JALAN_FINISH) {
            //check setelah jalan apakah ada command
            console.log('jalan finish');
            if (this._perintah.aktif) {
                if (this._perintah.targetType == Perintah.PETAK) {
                    console.log('aksi petak');
                    this._perintah.target.aksiMulai();
                    this.state = MainChar.TUNGGU_AKSI;
                }
                else {
                    console.log('perintah type kosong, aksi type' + this._perintah.targetType);
                    this.state = MainChar.IDLE;
                    // this._perintah = null;
                }
            }
            else {
                console.log('perintah kosong');
                this.state = MainChar.IDLE;
            }
        }
        else if (this.state == MainChar.AKSI) {
            //jalankan aksi
        }
        else if (this.state == MainChar.TUNGGU_AKSI) {
            if (this._perintah.target.checkAksiSelesai()) {
                this._perintah.target.aksiSelesai();
                console.log('tunggu aksi selesai, back to idle');
                this.state = MainChar.IDLE;
            }
        }
        else {
            throw new Error();
        }
    }
    updateViewPort() {
        // let viewPort: ViewPort;
        // viewPort = Global.getInst().viewPort;
    }
    update() {
        this.updateState();
        this.updateView();
    }
    get pos() {
        return this._pos;
    }
    set pos(value) {
        this._pos = value;
    }
    get view() {
        return this._view;
    }
    set view(value) {
        this._view = value;
    }
    set map(value) {
        this._map = value;
    }
    get perintah() {
        return this._perintah;
    }
    get perintahTunggu() {
        return this._perintahTunggu;
    }
    set perintahTunggu(value) {
        this._perintahTunggu = value;
    }
}
MainChar.IDLE = 1;
MainChar.JALAN = 2;
MainChar.JALAN_FINISH = 3;
MainChar.AKSI = 4;
MainChar.TUNGGU_AKSI = 5;
// }
// bisaTerimaPerintah(): boolean {
//     if (this.state == MainChar.IDLE) {
//         return true;
//     }
//     else if (this.state == MainChar.JALAN) {
//         if (this.onGrid()) {
//             return true;
//         }
//     }
//     return false;
// }
// ambilPerintah(): Perintah {
//     let perintah: Perintah;
//     while (this._perintahAr.length > 0) {
//         perintah = this._perintahAr.shift();
//     }
//     return perintah;
// }
// tambahPerintah(perintah: Perintah): void {
//     this._perintahAr.push(perintah);
//     console.log('tambah perintah ' + this._perintahAr);
// }
// initAnim(): void {
//     let data = {
//         images: [document.getElementById("jalan")],
//         frames: { width: 32, height: 32 },
//         animations: {
//             berdiri: 2,
//             jalanka: {
//                 frames: [5, 3, 5, 4],
//                 speed: .5
//             },
//             jalanba: {
//                 frames: [2, 0, 2, 1],
//                 speed: .5
//             },
//             jalanat: {
//                 frames: [11, 9, 11, 10],
//                 speed: .5
//             },
//             jalanki: {
//                 frames: [8, 6, 8, 7],
//                 speed: .5
//             },
//             jalankaat: {
//                 frames: [11, 9, 11, 10],
//                 speed: .5
//             },
//             jalankaba: {
//                 frames: [17, 15, 17, 16],
//                 speed: .5
//             },
//             jalankiat: {
//                 frames: [11, 9, 11, 10],
//                 speed: .5
//             },
//             jalankiba: {
//                 frames: [14, 12, 14, 13],
//                 speed: .5
//             }
//         }
//     };
//     let spriteSheet: createjs.SpriteSheet = new createjs.SpriteSheet(data);
//     this.animation = new createjs.Sprite(spriteSheet, "jalanka");
//     this._view.addChild(this.animation);
//     this._view.mouseEnabled = false;
// }
// updateAnim(): void {
//     // console.log('arah ' + this.pfHelper.arah);
//     if (this.pfHelper.arah == PFHelper.ATAS && (this.animation.currentAnimation != "jalanat")) {
//         this.animation.gotoAndPlay("jalanat");
//     }
//     else if (this.pfHelper.arah == PFHelper.KANAN && (this.animation.currentAnimation != "jalanka")) {
//         this.animation.gotoAndPlay("jalanka");
//     }
//     else if (this.pfHelper.arah == PFHelper.BAWAH && (this.animation.currentAnimation != "jalanba")) {
//         this.animation.gotoAndPlay("jalanba");
//     }
//     else if (this.pfHelper.arah == PFHelper.KIRI && (this.animation.currentAnimation != "jalanki")) {
//         this.animation.gotoAndPlay("jalanki");
//     }
//     else if (this.pfHelper.arah == PFHelper.KANAN_ATAS && (this.animation.currentAnimation != "jalankaat")) {
//         this.animation.gotoAndPlay("jalankaat");
//     }
//     else if (this.pfHelper.arah == PFHelper.KANAN_BAWAH && (this.animation.currentAnimation != "jalankaba")) {
//         // console.log('anim jalan kanan bawah');
//         this.animation.gotoAndPlay("jalankaba");
//     }
//     else if (this.pfHelper.arah == PFHelper.KIRI_ATAS && (this.animation.currentAnimation != "jalankiat")) {
//         // console.log('anim jalan kiri atas');
//         this.animation.gotoAndPlay("jalankiat");
//     }
//     else if (this.pfHelper.arah == PFHelper.KIRI_BAWAH && (this.animation.currentAnimation != "jalankiba")) {
//         this.animation.gotoAndPlay("jalankiba");
//     }
// }
// jalanKePos(i: number, j: number): void {
//     if (!this.pfHelper.sedangJalan) {
//         this.ruteJalan = this.pf.find(Math.floor(this._pos.x / 32), Math.floor(this._pos.y / 32), i, j);
//         if (this.ruteJalan.length > 0) {
//             this.pfHelper.start(this.ruteJalan);
//             this.updateAnim();
//             this.state = MainChar.JALAN;
//         }
//     }
// }
