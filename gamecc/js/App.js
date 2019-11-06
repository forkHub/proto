"use strict";
var fg;
(function (fg) {
    class App {
        constructor() {
            App._inst = this;
            this._data = new fg.Data();
            this.data.contKanan = document.body.querySelector('div#cont > div.kanan');
            this.data.cont = document.body.querySelector('div#cont');
            this._updater = new fg.Updater();
            this._soalManager = new fg.SoalManager();
            this._soalManager.resetSoal();
            this._userManager = new fg.UserManager();
            this._userManager.userList = this._data.userList;
            this._dialog = new ha.comm.Dialog();
            this._dialog.render(document.body);
            this._fotoAvatarController = new fg.FotoAvatarController();
            this._editJmlPemain = new fg.pages.JmlPemain();
            this._editPemain = new fg.pages.editPemain.EditPemain();
            this._acak = new fg.pages.acak.AcakSoal();
            this._soal = new fg.pages.Soal();
            this._selesai = new fg.pages.selesai.Selesai();
            this.init();
            this.load();
        }
        init() {
            this._editJmlPemain.init();
            this._editPemain.init();
            this._acak.init();
            this._soal.init();
            this._selesai.init();
        }
        loadDefault() {
            let soal;
            soal = JSON.parse(this._soalManager.default);
            this._soalManager.importData(soal);
            console.log(soal);
        }
        load() {
            let str;
            if (window.localStorage) {
                str = window.localStorage.getItem("cc_soal");
                if (str) {
                    let soal;
                    soal = JSON.parse(str);
                    this._soalManager.importData(soal);
                    console.log("data ada");
                    console.log(soal);
                }
                else {
                    console.log('load failed, back to default');
                    this.loadDefault();
                }
            }
            else {
                console.log('local storage not found, back to default');
                this.loadDefault();
            }
        }
        get soalManager() {
            return this._soalManager;
        }
        get updater() {
            return this._updater;
        }
        get dialog() {
            return this._dialog;
        }
        get acak() {
            return this._acak;
        }
        set acak(value) {
            this._acak = value;
        }
        static get inst() {
            return App._inst;
        }
        get data() {
            return this._data;
        }
        get editJmlPemain() {
            return this._editJmlPemain;
        }
        get fotoAvatarController() {
            return this._fotoAvatarController;
        }
        get selesai() {
            return this._selesai;
        }
        get userManager() {
            return this._userManager;
        }
        get editPemain() {
            return this._editPemain;
        }
        get soal() {
            return this._soal;
        }
    }
    fg.App = App;
})(fg || (fg = {}));
