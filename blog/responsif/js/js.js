"use strict";
let canvas;
let canvasCtx;
let gambar;
window.onload = () => {
    canvas = document.body.querySelector('canvas');
    canvasCtx = canvas.getContext("2d");
    gambar = document.body.querySelector('img.gambar');
    gambarCanvas(canvasCtx);
    window.onresize = resize;
    resize();
};
function resize() {
    let cp = 360;
    let cl = 218;
    let wp = window.innerWidth;
    let wl = window.innerHeight;
    let ratio = Math.min((wp / cp), (wl / cl));
    let cp2 = Math.floor(cp * ratio);
    let cl2 = Math.floor(cl * ratio);
    canvas.style.width = cp2 + 'px';
    canvas.style.height = cl2 + 'px';
    canvas.style.top = ((wl - cl2) / 2) + 'px';
    canvas.style.left = ((wp - cp2) / 2) + 'px';
    gambarCanvas(canvasCtx);
}
function gambarCanvas(ctx) {
    ctx.drawImage(gambar, 0, 0);
}
