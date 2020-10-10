"use strict";
function resize() {
    let wp = window.innerWidth;
    let wl = window.innerHeight;
    let ratio = Math.min((wp / gp), (wl / gl));
    let cp2 = Math.floor(gp * ratio);
    let cl2 = Math.floor(gl * ratio);
    kanvas.style.width = cp2 + 'px';
    kanvas.style.height = cl2 + 'px';
    kanvas.style.top = ((wl - cl2) / 2) + 'px';
    kanvas.style.left = ((wp - cp2) / 2) + 'px';
    kanvasScaleX = gp / cp2;
    kanvasScaleY = gl / cl2;
    kanvas.width = gp;
    kanvas.height = gl;
    console.log('resize');
}
