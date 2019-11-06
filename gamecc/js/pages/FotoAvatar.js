"use strict";
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        class FotoAvatar extends ha.core.BaseComponent {
            constructor() {
                super();
                this._data = new Data();
                this.data.fotoAvatar = this;
                this._template = `
                <div class='foto-avatar selected'>
                    <img class='foto' src=''/>
                    <hr/>
                    <p class='nama'></p>
                    <p class='score'></p>
                </div>
            `;
            }
            destroy() {
                if (this._elHtml) {
                    if (this._elHtml.parentElement) {
                        this._elHtml.parentElement.removeChild(this._elHtml);
                    }
                }
            }
            default() {
                let fotoAvatar;
                fotoAvatar = new FotoAvatar();
                return fotoAvatar;
            }
            onRender() {
                this.imgEl = this.getEl('img.foto');
                this.nameEl = this.getEl('p.nama');
                this.scoreEl = this.getEl('p.score');
                this.update();
            }
            update() {
                if (this.nameEl) {
                    this.nameEl.innerText = this.data.nama;
                }
                if (this.imgEl) {
                    this.imgEl.src = this.data.src;
                }
                if (this.scoreEl) {
                    this.scoreEl.innerText = this.data.score + '';
                }
            }
            get data() {
                return this._data;
            }
        }
        pages.FotoAvatar = FotoAvatar;
        class Data {
            set fotoAvatar(value) {
                this._fotoAvatar = value;
            }
            get nama() {
                return this._nama;
            }
            set nama(value) {
                this._nama = value;
                this._fotoAvatar.update();
            }
            get score() {
                return this._score;
            }
            set score(value) {
                this._score = value;
                this._fotoAvatar.update();
            }
            get src() {
                return this._src;
            }
            set src(value) {
                this._src = value;
                this._fotoAvatar.update();
            }
        }
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
