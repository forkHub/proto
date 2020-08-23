"use strict";
let cellAr = [];
let cellMax = 100; //maksimum cell boleh dibuat
let peta = [
    "XXXXXXXXXX",
    "X        X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X        X",
    "XXXXXXXXXX"
];
const st_idle = 1;
const st_jalan = 2;
let karakter = {
    jalur: [],
    jalurn: 0,
    pos: {
        x: 1,
        y: 1
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
    canvas.onclick = (e) => {
        if (karakter.status != st_idle)
            return;
        let rect = canvas.getBoundingClientRect();
        let poslx = (e.clientX - rect.x) * canvasScaleX;
        let posly = ((e.clientY - rect.y) * canvasScaleY);
        let posx = Math.floor(poslx / 32);
        let posy = Math.floor(posly / 32);
        let hasil = pfCariJalan(karakter.pos.x, karakter.pos.y, posx, posy);
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
        if (karakter.jalurn >= (karakter.jalur.length - 1)) {
            karakter.status = st_idle;
        }
        else {
            karakter.jalurn++;
            karakter.pos.x = karakter.jalur[karakter.jalurn][0];
            karakter.pos.y = karakter.jalur[karakter.jalurn][1];
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
    canvasCtx.drawImage(gbrTigan, karakter.pos.x * 32, karakter.pos.y * 32);
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
    canvasCtx.clearRect(0, 0, 320, 240);
}
