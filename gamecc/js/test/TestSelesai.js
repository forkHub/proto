"use strict";
var fg;
(function (fg) {
    class TestSelesai {
        constructor() {
            let view = new fg.pages.selesai.Selesai();
            view.render(document.body);
            console.log(view.data);
            view.data.createDefault();
            view.urutkanPemenang();
            view.renderPemenang();
        }
    }
    fg.TestSelesai = TestSelesai;
})(fg || (fg = {}));
