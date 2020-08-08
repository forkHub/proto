"use strict";
let canvas;
let canvasCtx;
let canvasScaleX = 1;
let canvasScaleY = 1;
window.onload = () => {
    canvas = document.body.querySelector('canvas');
    canvasCtx = canvas.getContext("2d");
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
    canvas.width = 480;
    canvas.height = 640;
    canvasScaleX = 480 / cp2;
    canvasScaleY = 640 / cl2;
    gambarCanvas(canvasCtx);
}
function gambarCanvas(ctx) {
    canvasCtx.fillStyle = "#0000ff";
    canvasCtx.clearRect(0, 0, 480, 640);
    canvasCtx.fillRect(0, 0, 480, 640);
    ctx.fillStyle = "#ff0000";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(100, 100, 75, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#00ff00";
    ctx.beginPath();
    ctx.rect(100, 200, 150, 250);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(0, 0, 480, 640);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
}
