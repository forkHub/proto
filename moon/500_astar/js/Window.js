"use strict";
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
    canvasScaleX = 360 / cp2;
    canvasScaleY = 640 / cl2;
}
