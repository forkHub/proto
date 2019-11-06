"use strict";
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var selesai;
        (function (selesai) {
            class Selesai extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._data = new Data();
                    this._data.view = this;
                    this._template = `
                <div class='pages-selesai'>
                    <p class='judul'>Permainan Selesai</p>
                    <img class='logo' src='imgs/piala.png'/>
                    <div class='juara'>
                        
                    </div>
                    <button class='main-lagi normal'>Main Lagi</button>
                </div>
            `;
                }
                init() {
                    this._data.daftarPemenang = fg.App.inst.data.userList;
                    this._data.onMulaiLagi = () => {
                        this.hide();
                        fg.App.inst.editJmlPemain.show();
                        fg.App.inst.fotoAvatarController.hapusFoto();
                    };
                    this.render(fg.App.inst.data.cont);
                    this.hide();
                }
                onRender() {
                    this.data.contJuara = this.getEl('div.juara');
                    this.data.tombolMulaiLagi = this.getEl('button.main-lagi');
                    this.data.tombolMulaiLagi.addEventListener('click', () => {
                        this.data.onMulaiLagi();
                    });
                }
                urutkanPemenang() {
                    let user1;
                    let user2;
                    // let tempScore: User;
                    let i;
                    let j;
                    for (i = 0; i < this._data.daftarPemenang.length; i++) {
                        for (j = i + 1; j < this._data.daftarPemenang.length; j++) {
                            user1 = this._data.daftarPemenang[i];
                            user2 = this._data.daftarPemenang[j];
                            if (user2.score > user1.score) {
                                this._data.daftarPemenang[i] = user2;
                                this._data.daftarPemenang[j] = user1;
                            }
                        }
                    }
                }
                renderPemenang() {
                    let i;
                    let user;
                    let urutanPemenang;
                    if (!this._data.contJuara)
                        return;
                    this._data.contJuara.innerHTML = '';
                    for (i = 0; i < this.data.daftarPemenang.length; i++) {
                        user = this.data.daftarPemenang[i];
                        urutanPemenang = new selesai.UrutanPemenang();
                        urutanPemenang.render(this.data.contJuara);
                        urutanPemenang.data.imgSrc = user.imgSrc;
                        urutanPemenang.data.nama = user.nama;
                        urutanPemenang.data.score = user.score;
                    }
                }
                update() {
                }
                get data() {
                    return this._data;
                }
            }
            selesai.Selesai = Selesai;
            class Data {
                get onMulaiLagi() {
                    return this._onMulaiLagi;
                }
                set onMulaiLagi(value) {
                    this._onMulaiLagi = value;
                }
                get tombolMulaiLagi() {
                    return this._tombolMulaiLagi;
                }
                set tombolMulaiLagi(value) {
                    this._tombolMulaiLagi = value;
                }
                get contJuara() {
                    return this._contJuara;
                }
                set contJuara(value) {
                    this._contJuara = value;
                }
                get view() {
                    return this._view;
                }
                set view(value) {
                    this._view = value;
                }
                get daftarPemenang() {
                    return this._daftarPemenang;
                }
                set daftarPemenang(value) {
                    this._daftarPemenang = value;
                    this._view.renderPemenang();
                }
                createDefault() {
                    this._daftarPemenang = [
                        fg.User.default(),
                        fg.User.default(),
                        fg.User.default(),
                        fg.User.default()
                    ];
                    this._onMulaiLagi = () => {
                        console.log('mulai lagi dari awal');
                    };
                    this._daftarPemenang[0].score = 100;
                    this._daftarPemenang[1].score = 200;
                    this._daftarPemenang[2].score = 300;
                    this._daftarPemenang[3].score = 400;
                }
            }
        })(selesai = pages.selesai || (pages.selesai = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
