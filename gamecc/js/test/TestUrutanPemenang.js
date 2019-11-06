"use strict";
var fg;
(function (fg) {
    class TestUrutanPemenang {
        constructor() {
            let view = new fg.pages.selesai.UrutanPemenang();
            view.render(document.body);
            view.data.nama = 'nama pemain';
            view.data.imgSrc = './imgs/photo/img01.png';
            view.data.score = 1500;
        }
    }
    fg.TestUrutanPemenang = TestUrutanPemenang;
})(fg || (fg = {}));
