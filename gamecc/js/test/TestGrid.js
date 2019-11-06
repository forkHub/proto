"use strict";
var fg;
(function (fg) {
    class TestGrid {
        constructor() {
            let grid;
            grid = new ha.comm.grid.Grid(4, 4);
            grid.render(document.body);
            grid.getCell(0, 0).innerText = 'hallo';
            grid.getCell(2, 2).innerText = 'hallo';
            grid.getCell(1, 1).innerText = 'hallo';
            grid.getCell(3, 3).innerText = 'hallo';
            grid.getCell(0, 3).innerText = 'hallo';
            grid.getCell(3, 0).innerText = 'hallo';
        }
    }
    fg.TestGrid = TestGrid;
})(fg || (fg = {}));
