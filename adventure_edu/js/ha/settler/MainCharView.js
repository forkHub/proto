// namespace fg {
import { PFHelper } from '../pf/PFHelper.js';
export class MainCharView extends createjs.Container {
    get animation() {
        return this._animation;
    }
    initAnim() {
        let data = {
            images: [document.getElementById("jalan")],
            frames: { width: 32, height: 32 },
            animations: {
                berdiri: 2,
                jalanka: {
                    frames: [5, 3, 5, 4],
                    speed: .5
                },
                jalanba: {
                    frames: [2, 0, 2, 1],
                    speed: .5
                },
                jalanat: {
                    frames: [11, 9, 11, 10],
                    speed: .5
                },
                jalanki: {
                    frames: [8, 6, 8, 7],
                    speed: .5
                },
                jalankaat: {
                    frames: [11, 9, 11, 10],
                    speed: .5
                },
                jalankaba: {
                    frames: [17, 15, 17, 16],
                    speed: .5
                },
                jalankiat: {
                    frames: [11, 9, 11, 10],
                    speed: .5
                },
                jalankiba: {
                    frames: [14, 12, 14, 13],
                    speed: .5
                }
            }
        };
        let spriteSheet = new createjs.SpriteSheet(data);
        this._animation = new createjs.Sprite(spriteSheet, "jalanka");
        this.addChild(this._animation);
        this.mouseEnabled = false;
    }
    updateAnim(arah) {
        // console.log('arah ' + this.pfHelper.arah);
        if (arah == PFHelper.ATAS && (this._animation.currentAnimation != "jalanat")) {
            this._animation.gotoAndPlay("jalanat");
        }
        else if (arah == PFHelper.KANAN && (this._animation.currentAnimation != "jalanka")) {
            this._animation.gotoAndPlay("jalanka");
        }
        else if (arah == PFHelper.BAWAH && (this._animation.currentAnimation != "jalanba")) {
            this._animation.gotoAndPlay("jalanba");
        }
        else if (arah == PFHelper.KIRI && (this._animation.currentAnimation != "jalanki")) {
            this._animation.gotoAndPlay("jalanki");
        }
        else if (arah == PFHelper.KANAN_ATAS && (this._animation.currentAnimation != "jalankaat")) {
            this._animation.gotoAndPlay("jalankaat");
        }
        else if (arah == PFHelper.KANAN_BAWAH && (this._animation.currentAnimation != "jalankaba")) {
            // console.log('anim jalan kanan bawah');
            this._animation.gotoAndPlay("jalankaba");
        }
        else if (arah == PFHelper.KIRI_ATAS && (this._animation.currentAnimation != "jalankiat")) {
            // console.log('anim jalan kiri atas');
            this._animation.gotoAndPlay("jalankiat");
        }
        else if (arah == PFHelper.KIRI_BAWAH && (this._animation.currentAnimation != "jalankiba")) {
            this._animation.gotoAndPlay("jalankiba");
        }
    }
}
// }
