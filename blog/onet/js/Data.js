"use strict";
const PF_CEPAT = 1;
const PF_A_STAR = 2;
const ST_AWAL = 0;
const ST_MULAI = 1; //belum ada dipilih, inter-state
const ST_ADA_DIPILIH = 2;
const ST_TENGAH = 3;
const ST_GAME_OVER = 4;
let state = ST_AWAL;
const warna = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ffffff"
];
let waktu = {
    total: 100,
    sekarang: 100,
};
let waktu2 = 100;
const gp = 32 * 8;
const gl = 32 * 7;
const isiPanjang = 4;
const isiLebar = 3;
let posAwalX;
let posAwalY;
let posAkhirX;
let posAkhirY;
let hasil;
let nilaiAwal;
let nilaiSekarang;
let cellAr = [];
let cellMax = 1000; //maksimum cell boleh dibuat
let pfConfig = {
    mode: PF_A_STAR,
    jarakx: 1,
    jaraky: 1
};
let peta = [
    "XXXXXXXX",
    "X      X",
    "X 4212 X",
    "X 1221 X",
    "X 3341 X",
    "X      X",
    "XXXXXXXX"
];
let kanvas;
let kanvasCtx;
let kanvasScaleX = 1;
let kanvasScaleY = 1;
let gbrBox;
let viewDialogDepan = {
    view: null,
    tombol: null
};
let viewDialogSelesai = {
    view: null,
    tombol: null
};
let viewDialogGameOver = {
    view: null,
    tombol: null
};
