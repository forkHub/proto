"use strict";
var fg;
(function (fg) {
    class TestFotoAvatarController {
        constructor() {
            this.initData();
            this._fotoAvatarController = new fg.FotoAvatarController();
            this._fotoAvatarController.cont = document.body;
            this._fotoAvatarController.fotoList = this.data.fotoList;
            // this._fotoAvatarController.jml = this.data.jmlPemain;
            this._fotoAvatarController.userList = this.data.userList;
            this._fotoAvatarController.buatFoto();
        }
        initData() {
            this.data = new fg.Data();
            this.userManager = new fg.UserManager();
            this.userManager.userList = this.data.userList;
            this.userManager.buatPemain(4);
        }
        get fotoAvatarController() {
            return this._fotoAvatarController;
        }
    }
    fg.TestFotoAvatarController = TestFotoAvatarController;
})(fg || (fg = {}));
