"use strict";
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var editPemain;
        (function (editPemain) {
            class EditUser extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._template = `
                <div class='edit-user'>
                    <div class='input-cont'>
                        <span>Nama:</span><br/>
                        <input type='text'/>
                    </div>
                    <div class='img-cont'>
                        <button class='avatar'>
                            <img src=''/>
                        </button>
                    </div>
                </div>
            `;
                }
                onRender() {
                    this._inputEl = this.getEl('input');
                    this._inputEl.onblur = () => {
                        this._nama = this._inputEl.value;
                    };
                    this._imgEl = this.getEl('img');
                    this._imgEl.src = 'imgs/photo/img01.png';
                    this._buttonAvatarEl = this.getEl('button.avatar');
                    this._buttonAvatarEl.onclick = () => {
                        this._avatarClick();
                    };
                    this.update();
                }
                update() {
                    if (this._inputEl)
                        this._inputEl.value = this._nama;
                    if (this._imgEl)
                        this._imgEl.src = this._src;
                }
                get nama() {
                    return this._nama;
                }
                set nama(value) {
                    this._nama = value;
                    this.update();
                }
                get src() {
                    return this._src;
                }
                set src(value) {
                    this._src = value;
                    // console.log('update src ' + value);
                    this.update();
                }
                get avatarClick() {
                    return this._avatarClick;
                }
                set avatarClick(value) {
                    this._avatarClick = value;
                }
            }
            editPemain.EditUser = EditUser;
        })(editPemain = pages.editPemain || (pages.editPemain = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
