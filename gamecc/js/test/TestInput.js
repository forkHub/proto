"use strict";
var fg;
(function (fg) {
    class TestInput {
        constructor() {
            let input = new ha.comm.Edit();
            input.data.onSave = (str) => {
                console.log('on save ' + str);
            };
            input.render(document.body);
        }
    }
    fg.TestInput = TestInput;
})(fg || (fg = {}));
