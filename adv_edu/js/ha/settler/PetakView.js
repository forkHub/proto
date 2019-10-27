// namespace fg {
export class PetakView extends createjs.Container {
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = value;
    }
    initAnim() {
        let data = {
            images: [document.querySelector("img#petak")],
            frames: { width: 32, height: 32 },
            animations: {
                air: 1,
                kering: 0
            }
        };
        let spriteSheet = new createjs.SpriteSheet(data);
        this._animation = new createjs.Sprite(spriteSheet, 'kering');
        this.addChild(this._animation);
    }
}
// }
