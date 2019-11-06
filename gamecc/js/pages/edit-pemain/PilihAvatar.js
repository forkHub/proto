"use strict";
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var editPemain;
        (function (editPemain) {
            class PilihAvatar extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._template = `
                <div class='pilih-avatar'>
                    <p class='judul'>Pilih Avatar:</p>
                    <div class='grid-cont'>
                    </div>
                </div>
            `;
                    this.grid = new ha.comm.grid.Grid(4, 3);
                }
                onRender() {
                    let cont;
                    let i;
                    let j;
                    cont = this.getEl('div.grid-cont');
                    this.grid.render(cont);
                    for (i = 0; i < 4; i++) {
                        for (j = 0; j < 3; j++) {
                            let src = fg.Data.inst().urls[j * 4 + i];
                            let btn = new ImgButton(src);
                            btn.onClick = () => {
                                this._onSelect(src);
                                this.hide();
                            };
                            btn.render(this.grid.getCell(i, j));
                        }
                    }
                }
                get onSelect() {
                    return this._onSelect;
                }
                set onSelect(value) {
                    this._onSelect = value;
                }
            }
            editPemain.PilihAvatar = PilihAvatar;
            class ImgButton extends ha.core.BaseComponent {
                constructor(src) {
                    super();
                    this.src = '';
                    this.src = src;
                    this._template = `
            <div class='pages-edit-pemain-img-btn'>
                <button>
                    <img src=''/>
                </button>
            </div>
            `;
                }
                onRender() {
                    this.imgEl = this.getEl('img');
                    this.imgEl.src = this.src;
                    this.btnEl = this.getEl('button');
                    this.btnEl.addEventListener('click', () => {
                        this._onClick(this.src);
                    });
                }
                get onClick() {
                    return this._onClick;
                }
                set onClick(value) {
                    this._onClick = value;
                }
            }
            editPemain.ImgButton = ImgButton;
        })(editPemain = pages.editPemain || (pages.editPemain = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
