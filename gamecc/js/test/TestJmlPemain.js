"use strict";
var fg;
(function (fg) {
    class TestJmlPemain {
        constructor() {
            this._editJmlPemain = new fg.pages.JmlPemain();
            this._editJmlPemain.render(document.body);
            this._editJmlPemain.onNextClick = () => {
                console.log('edit jml pemain on next click');
            };
        }
    }
    fg.TestJmlPemain = TestJmlPemain;
})(fg || (fg = {}));
