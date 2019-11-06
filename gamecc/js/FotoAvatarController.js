"use strict";
var fg;
(function (fg) {
    class FotoAvatarController {
        constructor() {
        }
        hapusFoto() {
            let foto;
            while (this._fotoList.length > 0) {
                foto = this._fotoList.pop();
                foto.destroy();
            }
        }
        static default() {
            let foto = new FotoAvatarController();
            foto.fotoList = [];
            foto.userList = [];
            return foto;
        }
        pilihFoto(foto) {
            if (!foto.elHtml.classList.contains('selected')) {
                foto.elHtml.classList.add('selected');
            }
        }
        deselectFoto() {
            let foto;
            let i = 0;
            for (i = 0; i < this._fotoList.length; i++) {
                foto = this._fotoList[i];
                foto.elHtml.classList.remove('selected');
            }
        }
        pilihFotoByIdx(idx) {
            let foto;
            this.deselectFoto();
            foto = this._fotoList[idx];
            this.pilihFoto(foto);
        }
        updateScore() {
            let i;
            let user;
            let foto;
            for (i = 0; i < this._fotoList.length; i++) {
                user = this._userList[i];
                foto = this._fotoList[i];
                foto.data.score = user.score;
            }
        }
        buatFoto() {
            let i;
            //clear div
            this._cont.innerHTML = '';
            while (this._fotoList.length > 0) {
                this._fotoList.pop();
            }
            //buat foto
            for (i = 0; i < this._userList.length; i++) {
                let item;
                let user = this._userList[i];
                item = new fg.pages.FotoAvatar();
                item.render(this._cont);
                item.data.nama = user.nama;
                item.data.score = user.score;
                item.data.src = user.imgSrc;
                this._fotoList.push(item);
            }
        }
        set cont(value) {
            this._cont = value;
        }
        set fotoList(value) {
            this._fotoList = value;
        }
        set userList(value) {
            this._userList = value;
        }
    }
    fg.FotoAvatarController = FotoAvatarController;
})(fg || (fg = {}));
