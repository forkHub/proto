"use strict";
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var editPemain;
        (function (editPemain) {
            class EditPemain extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._userList = [];
                    this.avatar = new fg.pages.editPemain.PilihAvatar();
                    this._template = `
                <div class='edit-pemain'>
                    <p class='judul'>Isi Nama Pemain:</p>
                    <div class='cont'>

                    </div>
                    <div>
                        <button class='next normal'>Selanjutnya</button>
                    </div>
                </div>
            `;
                }
                onShow() {
                    let i = 0;
                    this.editUserList = [];
                    this.cont.innerHTML = '';
                    for (i = 0; i < this._userList.length; i++) {
                        // console.log('create pemain ' + i);
                        let editUser;
                        editUser = new fg.pages.editPemain.EditUser();
                        editUser.render(this.cont);
                        editUser.nama = this._userList[i].nama;
                        editUser.src = this._userList[i].imgSrc;
                        this.editUserList.push(editUser);
                        editUser.avatarClick = () => {
                            this._editUserAktif = editUser;
                            this.avatar.show();
                        };
                    }
                    this.avatar.onSelect = (src) => {
                        this._editUserAktif.src = src;
                    };
                }
                init() {
                    this.render(fg.App.inst.data.cont);
                    this.hide();
                    this._onNextClick =
                        () => {
                            console.log('edit pemain on next click');
                            this.hide();
                            fg.App.inst.soalManager.resetSoal();
                            fg.App.inst.acak.show();
                            // App.inst.acak.catList = App.inst.soalManager.getCategoryList();
                            fg.App.inst.acak.reset();
                            fg.App.inst.fotoAvatarController.cont = document.body.querySelector('div#cont div.kiri');
                            fg.App.inst.fotoAvatarController.fotoList = fg.App.inst.data.fotoList;
                            fg.App.inst.fotoAvatarController.userList = fg.App.inst.data.userList;
                            fg.App.inst.fotoAvatarController.buatFoto();
                            fg.App.inst.data.userIdx = 0;
                            fg.App.inst.fotoAvatarController.pilihFotoByIdx(fg.App.inst.data.userIdx);
                        };
                }
                onRender() {
                    this.btnNextEl = this.getEl('button.next');
                    this.cont = this.getEl('div.cont');
                    this.btnNextEl.addEventListener('click', () => {
                        let i;
                        let user;
                        for (i = 0; i < this._userList.length; i++) {
                            user = this._userList[i];
                            user.nama = this.editUserList[i].nama;
                            user.imgSrc = this.editUserList[i].src;
                        }
                        this._onNextClick();
                    });
                    this.avatar.render(this._elHtml.parentElement);
                    this.avatar.hide();
                }
                get editUserList() {
                    return this._editUserList;
                }
                set editUserList(value) {
                    this._editUserList = value;
                }
                get userAktif() {
                    return this._userAktif;
                }
                set userAktif(value) {
                    this._userAktif = value;
                }
                get userList() {
                    return this._userList;
                }
                set userList(value) {
                    this._userList = value;
                }
            }
            editPemain.EditPemain = EditPemain;
        })(editPemain = pages.editPemain || (pages.editPemain = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
