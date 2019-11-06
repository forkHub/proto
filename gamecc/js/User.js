"use strict";
var fg;
(function (fg) {
    class User {
        constructor() {
            this._score = 0;
            this._nama = 'nama';
            this._imgSrc = 'imgs/photo/img01.png';
        }
        static default(nama, imgSrc) {
            let user = new User();
            if (!nama)
                nama = 'nama user';
            if (!imgSrc)
                imgSrc = 'imgs/photo/img01.png';
            user.imgSrc = imgSrc;
            user.nama = nama;
            user.score = 100;
            return user;
        }
        get score() {
            return this._score;
        }
        set score(value) {
            this._score = value;
        }
        get nama() {
            return this._nama;
        }
        set nama(value) {
            this._nama = value;
        }
        get imgSrc() {
            return this._imgSrc;
        }
        set imgSrc(value) {
            this._imgSrc = value;
        }
    }
    fg.User = User;
})(fg || (fg = {}));
