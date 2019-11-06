"use strict";
var fg;
(function (fg) {
    class Data {
        constructor() {
            this._userList = [];
            this._fotoList = [];
            this._debug = false;
            this._urls = [
                'imgs/photo/img01.png',
                'imgs/photo/img02.png',
                'imgs/photo/img03.png',
                'imgs/photo/img04.png',
                'imgs/photo/img05.png',
                'imgs/photo/img06.png',
                'imgs/photo/img07.png',
                'imgs/photo/img08.png',
                'imgs/photo/img09.png',
                'imgs/photo/img10.png',
                'imgs/photo/img11.png',
                'imgs/photo/img12.png',
            ];
        }
        static inst() {
            if (Data.instData)
                return Data.instData;
            Data.instData = new Data();
            return Data.instData;
        }
        default() {
            this._userList.push(fg.User.default());
            this._userList.push(fg.User.default());
            this._userList.push(fg.User.default());
            this._userList.push(fg.User.default());
        }
        get fotoList() {
            return this._fotoList;
        }
        get userCr() {
            return this._userList[this._userIdx];
        }
        get urls() {
            return this._urls;
        }
        set urls(value) {
            this._urls = value;
        }
        get jmlPemain() {
            return this._userList.length;
        }
        get userList() {
            return this._userList;
        }
        set userList(value) {
            this._userList = value;
        }
        get userIdx() {
            return this._userIdx;
        }
        set userIdx(value) {
            this._userIdx = value;
        }
        get contKanan() {
            return this._contKanan;
        }
        set contKanan(value) {
            this._contKanan = value;
        }
        get cont() {
            return this._cont;
        }
        set cont(value) {
            this._cont = value;
        }
        get debug() {
            return this._debug;
        }
    }
    fg.Data = Data;
})(fg || (fg = {}));
