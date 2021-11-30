"use strict";
let krkTest = {
    jalur: {
        n: 0,
        data: [[1, 1], [2, 1]]
    },
    langkah: {
        n: 0,
        nMax: 10
    },
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
        jalur: {
            n: 0,
            data: [[1, 1], [2, 1]]
        },
        langkah: {
            n: 0,
            nMax: 10
        },
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
    krkJalan(krkTest);
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
