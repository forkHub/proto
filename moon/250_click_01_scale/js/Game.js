"use strict";
let cellAr = [];
let cellMax = 100; //maksimum cell boleh dibuat
let peta = [
    "XXXXXXXXXX",
    "X        X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X        X",
    "XXXXXXXXXX"
];
let canvas;
let canvasCtx;
let canvasScaleX = 1;
let canvasScaleY = 1;
let gbrBox;
let gbrBola;
let hasil = [];
window.onload = () => {
    canvas = document.body.querySelector('canvas');
    canvasCtx = canvas.getContext("2d");
    gbrBola = document.body.querySelector("img#img-bola");
    gbrBox = document.body.querySelector("img#img-box");
    window.onresize = resize;
    resize();
    setTimeout(() => {
        resize();
    }, 100);
    gambarPeta();
    canvas.onclick = (e) => {
        let rect = canvas.getBoundingClientRect();
        let poslx = (e.clientX - rect.x) * canvasScaleX;
        let posly = ((e.clientY - rect.y) * canvasScaleY);
        let posx = Math.floor(poslx / 32);
        let posy = Math.floor(posly / 32);
        bersihkanLayar();
        hasil = pfCariJalan(1, 1, posx, posy);
        gambarPeta();
        gambarJalan(hasil);
    };
};
function resize() {
    let cp = 360;
    let cl = 640;
    let wp = window.innerWidth;
    let wl = window.innerHeight;
    let ratio = Math.min((wp / cp), (wl / cl));
    let cp2 = Math.floor(cp * ratio);
    let cl2 = Math.floor(cl * ratio);
    canvas.style.width = cp2 + 'px';
    canvas.style.height = cl2 + 'px';
    canvas.style.top = ((wl - cl2) / 2) + 'px';
    canvas.style.left = ((wp - cp2) / 2) + 'px';
    canvas.width = 360;
    canvas.height = 640;
    canvasScaleX = 360 / cp2;
    canvasScaleY = 640 / cl2;
    gambarPeta();
    gambarJalan(hasil);
}
function gambarJalan(hasil) {
    hasil.forEach((item) => {
        canvasCtx.drawImage(gbrBola, item[0] * 32, item[1] * 32);
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
    canvasCtx.clearRect(0, 0, 360, 640);
}
