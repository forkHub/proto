"use strict";
const PF_CEPAT = 1;
const PF_A_STAR = 2;
const st_idle = 1;
const st_jalan = 2;
const gp = 352;
const gl = 352;
let cellAr = [];
let cellMax = 1000; //maksimum cell boleh dibuat
let pfConfig = {
    mode: PF_A_STAR,
    jarakx: 1,
    jaraky: 1
};
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
let gbrCentang;
let pilihan;
let centangX = 0;
let centangY = 0;
let centangTerlihat = false;
