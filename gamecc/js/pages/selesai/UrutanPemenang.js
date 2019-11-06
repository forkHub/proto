"use strict";
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var selesai;
        (function (selesai) {
            class UrutanPemenang extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this.namaEl = null;
                    this.scoreEl = null;
                    this.imgEl = null;
                    this._template = `
                <div class='urutan-pemenang table'>
                    <div class='table-cell nama-score'>
                        <p class='nama'></p>
                        <p class='score'><span class='score'></span></p>
                    </div>
                    <div class='table-cell img'>
                        <img class='avatar' src=''/>
                    </div>
                </div>
            `;
                    this._data = new Data();
                    this._data.view = this;
                }
                get data() {
                    return this._data;
                }
                updateEl() {
                    this.namaEl.innerText = this.data.nama;
                    this.scoreEl.innerHTML = this.data.score + '';
                    this.imgEl.src = this.data.imgSrc;
                }
                onRender() {
                    this.namaEl = this.getEl('p.nama');
                    this.imgEl = this.getEl('img.avatar');
                    this.scoreEl = this.getEl('span.score');
                }
            }
            selesai.UrutanPemenang = UrutanPemenang;
            class Data {
                get view() {
                    return this._view;
                }
                set view(value) {
                    this._view = value;
                }
                get nama() {
                    return this._nama;
                }
                set nama(value) {
                    this._nama = value;
                    this.view.updateEl();
                }
                get imgSrc() {
                    return this._imgSrc;
                }
                set imgSrc(value) {
                    this._imgSrc = value;
                    this.view.updateEl();
                }
                get score() {
                    return this._score;
                }
                set score(value) {
                    this._score = value;
                    this.view.updateEl();
                }
            }
        })(selesai = pages.selesai || (pages.selesai = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
