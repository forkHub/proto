"use strict";
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        class Soal extends ha.core.BaseComponent {
            constructor() {
                super();
                this.jawabansEl = [];
                this.initTemplate();
                this._timer = new fg.Timer();
                this._timer.waktuHabis = () => {
                    this._dialog.teks = 'Waktu habis! Nilaimu dikurangi ' + this._soal.score;
                    this._dialog.show();
                };
            }
            init() {
                let data = fg.App.inst.data;
                let soalManager = fg.App.inst.soalManager;
                let selesai = fg.App.inst.selesai;
                let acak = fg.App.inst.acak;
                this._dialog = fg.App.inst.dialog;
                this._timer.updater = fg.App.inst.updater;
                this._photoAvatarController = fg.App.inst.fotoAvatarController;
                this.render(data.contKanan);
                this.hide();
                this._onFinish = () => {
                    data.userIdx++;
                    if (data.userIdx >= data.userList.length) {
                        data.userIdx = 0;
                    }
                    fg.App.inst.fotoAvatarController.pilihFotoByIdx(fg.App.inst.data.userIdx);
                    this.hide();
                    if (soalManager.getCategoryList().length == 0) {
                        console.log('soal habis');
                        selesai.urutkanPemenang();
                        selesai.show();
                        selesai.data.daftarPemenang = data.userList;
                    }
                    else {
                        acak.show();
                        // acak.catList = soalManager.getCategoryList();
                        acak.reset();
                    }
                };
            }
            mulai() {
                this.timer.mulai();
                this.extractSoal(this._soal);
                this._dialog.onClick = this.dialogOnClick.bind(this);
                let i;
                for (i = 0; i < this.jawabansEl.length; i++) {
                    this.jawabansEl[i].parentElement.classList.remove('pilih');
                }
            }
            onRender() {
                this.initElementRef();
                this.initListener();
                this.timer.element = this.waktuEl;
            }
            initElementRef() {
                this.soalContEl = this.getEl('div.soal-cont span');
                this.waktuEl = this.getEl('div.timer span');
                this.jawabansEl.push(this.getEl('button.jawab:nth-child(1) span:nth-child(2)'));
                this.jawabansEl.push(this.getEl('button.jawab:nth-child(2) span:nth-child(2)'));
                this.jawabansEl.push(this.getEl('button.jawab:nth-child(3) span:nth-child(2)'));
                this.jawabansEl.push(this.getEl('button.jawab:nth-child(4) span:nth-child(2)'));
                this.nilaiEl = this.getEl('span.score');
            }
            initListener() {
                let button;
                for (let i = 0; i < this.jawabansEl.length; i++) {
                    button = this.jawabansEl[i].parentElement;
                    button.addEventListener('click', () => {
                        this.jawabClick(i, this.jawabansEl[i].parentElement);
                    });
                }
            }
            jawabClick(idx, button) {
                console.log('user pilih jawaban ' + idx);
                button.classList.add('pilih');
                if (idx == this._soal.jawabanBenar - 1) {
                    console.log('jawaban benar');
                    this._user.score += this._soal.score;
                    this._dialog.teks = 'Jawabanmu benar, nilaimu bertambah ' + this._soal.score;
                    this._dialog.show();
                }
                else {
                    console.log('jawaban salah, idx ' + idx + '/jawaban benar ' + this._soal.jawabanBenar);
                    this._user.score -= 100;
                    if (this._user.score < 0)
                        this._user.score = 0;
                    this.dialog.teks = 'Jawabanmu Salah, nilaimu dikurangi ' + this._soal.score;
                    this.dialog.show();
                }
                this._soal.sudahDijawab = true;
                this.timer.stop();
                this._photoAvatarController.updateScore();
            }
            dialogOnClick() {
                this._dialog.onClick = null;
                this._onFinish();
            }
            extractSoal(soal) {
                this.soalContEl.innerHTML = soal.soal;
                this.jawabansEl[0].innerHTML = soal.jawaban[0];
                this.jawabansEl[1].innerHTML = soal.jawaban[1];
                this.jawabansEl[2].innerHTML = soal.jawaban[2];
                if (soal.jawaban[3]) {
                    this.jawabansEl[3].innerHTML = soal.jawaban[3];
                    this.show(this.getEl('button.jawab:nth-child(' + 4 + ')'));
                }
                else {
                    this.hide(this.getEl('button.jawab:nth-child(' + 4 + ')'));
                }
                this.nilaiEl.innerText = 'Nilai: ' + soal.score;
            }
            initTemplate() {
                this._template =
                    `<div class='pages-soal'>
                    <div class='score-cont table'>
                        <div class='score table-column'>
                            <span class='score'>nilai:500</span>
                        </div>
                        <div class='timer table-column kanan'>
                            <span>waktu: 00:00</span>
                        </div>
                    </div>
                    <hr/>
                    <div class='soal-cont'>
                        <Span>soal-soal</span>
                    </div>
                    <div class='jawab-cont'>
                        <button class='jawab'>
                            <span>A:</span>
                            <span>Text</span>
                        </button>
                        <button class='jawab'>
                            <span>B:</span>
                            <span>Text</span>
                        </button>
                        <button class='jawab'>
                            <span>C:</span>
                            <span>Text</span>
                        </button>
                        <button class='jawab'>
                            <span>D:</span>
                            <span>Text</span>
                        </button>
                    </div>
                </div>`;
            }
            get soal() {
                return this._soal;
            }
            set soal(value) {
                this._soal = value;
            }
            get dialog() {
                return this._dialog;
            }
            set dialog(value) {
                this._dialog = value;
            }
            get user() {
                return this._user;
            }
            set user(value) {
                this._user = value;
            }
            get onFinish() {
                return this._onFinish;
            }
            set onFinish(value) {
                this._onFinish = value;
            }
            get timer() {
                return this._timer;
            }
            get photoAvatarController() {
                return this._photoAvatarController;
            }
            set photoAvatarController(value) {
                this._photoAvatarController = value;
            }
        }
        pages.Soal = Soal;
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
