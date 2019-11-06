"use strict";
var fg;
(function (fg) {
    class TestAvatar {
        constructor() {
            let avatar;
            avatar = new fg.pages.FotoAvatar();
            avatar.data.nama = 'nama user';
            avatar.data.score = 100;
            avatar.data.src = 'imgs/photo/img01.png';
            avatar.render(document.body.querySelector('div.cont'));
        }
    }
    fg.TestAvatar = TestAvatar;
})(fg || (fg = {}));
