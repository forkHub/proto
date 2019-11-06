"use strict";
var fg;
(function (fg) {
    class TestPilihAvatar {
        constructor() {
            let avatar;
            avatar = new fg.pages.editPemain.PilihAvatar();
            avatar.render(document.body);
            avatar.onSelect = (item) => {
                console.log('select' + item);
            };
        }
    }
    fg.TestPilihAvatar = TestPilihAvatar;
})(fg || (fg = {}));
