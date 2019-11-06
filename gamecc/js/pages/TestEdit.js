"use strict";
var fg;
(function (fg) {
    class TestEdit {
        constructor() {
            let edit = new ha.comm.Edit();
            edit.render(document.body);
            edit.data.onSave((text) => { console.log('data saved ' + text); });
        }
    }
    fg.TestEdit = TestEdit;
})(fg || (fg = {}));
