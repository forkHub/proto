"use strict";
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
    canvas.width = 320;
    canvas.height = 320;
    canvasScaleX = 320 / cp2;
    canvasScaleY = 320 / cl2;
}