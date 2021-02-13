"use strict";
function resize() {
    let wp = window.innerWidth;
    let wl = window.innerHeight;
    let ratio = Math.min((wp / gp), (wl / gl));
    let cp2 = Math.floor(gp * ratio);
    let cl2 = Math.floor(gl * ratio);
    canvas.style.width = cp2 + 'px';
    canvas.style.height = cl2 + 'px';
    canvas.style.top = ((wl - cl2) / 2) + 'px';
    canvas.style.left = ((wp - cp2) / 2) + 'px';
    canvasScaleX = gp / cp2;
    canvasScaleY = gl / cl2;
    canvas.width = gp;
    canvas.height = gl;
    console.log('resize');
}
