"use strict";
const st_idle = 1;
const st_jalan = 2;
const gp = 352;
const gl = 352;
let cellAr = [];
let cellMax = 1000; //maksimum cell boleh dibuat
let peta = [
    "XXXXXXXXXXX",
    "X         X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X         X",
    "XXXXXXXXXXX"
];
let karakter = {
    jalur: [],
    jalurn: 0,
    pindahJml: 2,
    pindahn: 0,
    pos: {
        x: 32,
        y: 32
    },
    status: st_idle
};
let canvas;
let canvasCtx;
let canvasScaleX = 1;
let canvasScaleY = 1;
let gbrBox;
let gbrBola;
let gbrTigan;
let pilihan;
