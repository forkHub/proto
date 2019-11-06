"use strict";
var fg;
(function (fg) {
    class TestEditPemain {
        constructor() {
            let ep = new fg.pages.editPemain.EditPemain;
            fg.Data.inst().default();
            ep.userList = fg.Data.inst().userList;
            ep.render(document.body);
            ep.onShow();
            // ep.onNextClick = () => { };
            ep.init();
        }
    }
    fg.TestEditPemain = TestEditPemain;
})(fg || (fg = {}));
