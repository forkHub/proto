"use strict";
var fg;
(function (fg) {
    class TestTree {
        constructor() {
            let tree = new ha.comm.tree.Tree;
            tree.render(document.body);
            let tree2 = new ha.comm.tree.Tree();
            tree2.render(tree.content);
            tree2.content.innerHTML = 'I like html5';
        }
    }
    fg.TestTree = TestTree;
})(fg || (fg = {}));
