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
    jalur: {
        n: 0,
        data: []
    },
    langkah: {
        n: 0,
        nMax: 3
    },
    pos: {
        x: 32,
        y: 32
    },
    status: st_idle
};
let canvas;
let canvasCtx;
let gbrBox;
let gbrBola;
let gbrTigan;
window.onload = () => {
    canvas = document.body.querySelector('canvas');
    canvasCtx = canvas.getContext("2d");
    gbrBola = document.body.querySelector("img#img-bola");
    gbrBox = document.body.querySelector("img#img-box");
    gbrTigan = document.body.querySelector("img#img-tigan");
    gambarPeta();
    canvas.onclick = (e) => {
        if (karakter.status != st_idle)
            return;
        let posx = Math.floor(e.clientX / 32);
        let posy = Math.floor(e.clientY / 32);
        bersihkanLayar();
        let posGrid = krkPosisiGrid(karakter);
        console.log(posGrid);
        console.log('posx ' + posx + '/posy ' + posy);
        console.log('peta:');
        console.log(peta);
        let hasil = pfCariJalan(posGrid.x, posGrid.y, posx, posy);
        karakter.status = st_jalan;
        karakter.jalur.data = hasil;
        karakter.jalur.n = -1;
        gambarPeta();
        gambarJalan(hasil);
    };
    test();
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
            if (karakter.jalur.n >= karakter.jalur.data.length - 1) {
                karakter.status = st_idle;
            }
            else {
                karakter.status = st_jalan;
                karakter.langkah.n = 0;
                karakter.jalur.n++;
                krkJalan(karakter);
            }
        }
        else {
            krkJalan(karakter);
        }
    }
}
function render() {
    bersihkanLayar();
    gambarPeta();
    gambarJalan(karakter.jalur.data);
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
    canvasCtx.clearRect(0, 0, 320, 240);
}
