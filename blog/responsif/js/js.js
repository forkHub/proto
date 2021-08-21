"use strict";
let kanvasEl = document.body.querySelector('canvas');
let kanvasCtx = kanvasEl.getContext("2d");
let kanvas = {
    pjg: 160,
    lbr: 160
};
let bola = {
    x: 20,
    y: 20,
    radius: 20,
    vx: 15,
    vy: 13
};
window.onresize = resize;
resize();
setTimeout(perulangan, 100);
function perulangan() {
    bola.x += bola.vx;
    bola.y += bola.vy;
    if (bola.x + bola.radius > kanvas.pjg) {
        bola.vx = -bola.vx;
    }
    if (bola.x - bola.radius < 0) {
        bola.vx = -bola.vx;
    }
    if (bola.y + bola.radius > kanvas.lbr) {
        bola.vy = -bola.vy;
    }
    if (bola.y - bola.radius < 0) {
        bola.vy = -bola.vy;
    }
    gambar();
    setTimeout(perulangan, 100);
}
function gambar() {
    kanvasCtx.clearRect(0, 0, kanvas.pjg, kanvas.lbr);
    kanvasCtx.fillStyle = "#00ff00";
    kanvasCtx.beginPath();
    kanvasCtx.arc(bola.x, bola.y, bola.radius, 0, 2 * Math.PI);
    kanvasCtx.fill();
}
function resize() {
    let wp = window.innerWidth;
    let wl = window.innerHeight;
    let ratio = Math.min((wp / kanvas.pjg), (wl / kanvas.lbr));
    let cp2 = Math.floor(kanvas.pjg * ratio);
    let cl2 = Math.floor(kanvas.lbr * ratio);
    kanvasEl.style.width = cp2 + 'px';
    kanvasEl.style.height = cl2 + 'px';
}
