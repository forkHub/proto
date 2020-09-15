"use strict";
let cellAr = [];
let cellMax = 100; //maksimum cell boleh dibuat
let peta = [
    "XXXXXXXXXXX",
    "X         X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X    X    X",
    "X         X",
    "X         X",
    "X         X",
    "X         X",
    "X         X",
    "X         X",
    "XXXXXXXXXXX"
];
const st_idle = 1;
const st_jalan = 2;
let karakter = {
    jalur: [],
    jalurn: 0,
    pindahJml: 4,
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
window.onload = () => {
    canvas = document.body.querySelector('canvas');
    canvasCtx = canvas.getContext("2d");
    gbrBola = document.body.querySelector("img#img-bola");
    gbrBox = document.body.querySelector("img#img-box");
    gbrTigan = document.body.querySelector("img#img-tigan");
    window.onresize = () => {
        resize();
        render();
    };
    resize();
    render();
    setTimeout(() => {
        resize();
        render();
    }, 100);
    canvas.onclick = (e) => {
        if (karakter.status != st_idle)
            return;
        let rect = canvas.getBoundingClientRect();
        let poslx = (e.clientX - rect.x) * canvasScaleX;
        let posly = ((e.clientY - rect.y) * canvasScaleY);
        let posx = Math.floor(poslx / 32);
        let posy = Math.floor(posly / 32);
        let posGrid = krkPosisiGrid(karakter);
        let hasil = pfCariJalan(posGrid.x, posGrid.y, posx, posy);
        karakter.status = st_jalan;
        karakter.jalur = hasil;
        karakter.jalurn = -1;
    };
    setInterval(() => {
        update();
        render();
    }, 100);
};
function update() {
    if (karakter.status == st_idle) {
    }
    else if (karakter.status == st_jalan) {
        if (krkCheckPosisiDiGrid(karakter)) {
            if (karakter.jalurn >= karakter.jalur.length - 2) {
                karakter.status = st_idle;
            }
            else {
                karakter.status = st_jalan;
                karakter.pindahn = 0;
                karakter.jalurn++;
                krkPindahGrid(karakter);
            }
        }
        else {
            krkPindahGrid(karakter);
        }
    }
}
function render() {
    bersihkanLayar();
    gambarPeta();
    gambarJalan(karakter.jalur);
    gambarKarakter();
}
function gambarKarakter() {
    canvasCtx.drawImage(gbrTigan, karakter.pos.x, karakter.pos.y);
}
function gambarJalan(hasil) {
    hasil.forEach((item) => {
        canvasCtx.drawImage(gbrBola, item[0] * 32 + 8, item[1] * 32 + 8);
    });
}
function gambarPeta() {
    for (let jx = 0; jx < peta.length; jx++) {
        for (let ix = 0; ix < peta[jx].length; ix++) {
            if (petaKosong(ix, jx)) {
            }
            else {
                canvasCtx.drawImage(gbrBox, ix * 32, jx * 32);
            }
        }
    }
}
function bersihkanLayar() {
    canvasCtx.clearRect(0, 0, 320, 640);
}
