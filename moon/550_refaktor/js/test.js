"use strict";
let krkTest = {
    jalurn: 0,
    jalur: [[1, 1], [2, 1]],
    pindahn: 0,
    pindahJml: 10,
    pos: {
        x: 32,
        y: 32
    },
    status: st_idle
};
function test() {
    testPosisiDiGrid();
    testJalan();
}
function krkTestReset() {
    krkTest = {
        jalurn: 0,
        jalur: [[1, 1], [2, 1]],
        pindahn: 0,
        pindahJml: 10,
        pos: {
            x: 32,
            y: 32
        },
        status: st_idle
    };
}
function testPosisiDiGrid() {
    if (!krkCheckPosisiDiGrid(krkTest))
        throw new Error('');
}
function testJalan() {
    krkTestReset();
    krkPindahGrid(krkTest);
    console.log(krkTest);
    if (krkTest.pos.x != 32 + 3.2)
        throw new Error();
    if (krkTest.pos.y != 32)
        throw new Error();
    krkTestReset();
}
function testPosisi() {
    krkTestReset();
    if (krkPosisiGrid(krkTest).x != 1)
        throw new Error();
    if (krkPosisiGrid(krkTest).y != 1)
        throw new Error();
}
