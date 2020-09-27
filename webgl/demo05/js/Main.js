"use strict";
let gl;
let canvas;
let gbr;
let gpj = 64;
let glb = 64;
window.onload = () => {
    canvas = document.querySelector('canvas');
    gbr = document.querySelector('img#kotak');
    gl = new Hagl(canvas);
    window.onresize = resize;
    resize();
    render();
};
function resize() {
    let wp = window.innerWidth;
    let wl = window.innerHeight;
    let ratio = Math.min((wp / gpj), (wl / glb));
    let cp2 = Math.floor(gpj * ratio);
    let cl2 = Math.floor(glb * ratio);
    canvas.style.width = cp2 + 'px';
    canvas.style.height = cl2 + 'px';
    canvas.style.top = ((wl - cl2) / 2) + 'px';
    canvas.style.left = ((wp - cp2) / 2) + 'px';
    canvas.width = gpj;
    canvas.height = glb;
    render();
}
function render() {
    gl.clear();
    gl.drawImage(gbr, 0, 0, {
        alpha: 1
    });
    gl.drawImage(gbr, 8, 8, {
        alpha: .5
    });
    gl.drawImage(gbr, 16, 16, {
        alpha: .5
    });
}
