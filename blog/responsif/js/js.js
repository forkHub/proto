"use strict";
let canvas;
let canvasCtx;
let canvasScaleX = 1;
let canvasScaleY = 1;
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
    let cp = parseInt(canvas.style.width);
    let cl = parseInt(canvas.style.height);
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
    canvas.height = 218;
    canvasScaleX = 360 / cp2;
    canvasScaleY = 218 / cl2;
    gambarCanvas(canvasCtx);
}
function gambarCanvas(ctx) {
    ctx.drawImage(gambar, 0, 0);
}
