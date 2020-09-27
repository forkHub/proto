"use strict";
let gl;
let canvas;
let gbr;
let gpj = 128;
let glb = 128;
let frame = 0;
let skala = 1 / 8;
window.onload = () => {
    canvas = document.querySelector('canvas');
    gbr = document.querySelector('img#ledakan');
    gl = new Hagl(canvas);
    window.onresize = resize;
    resize();
    requestAnimationFrame(update);
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
}
function update() {
    frame++;
    if (frame >= 64)
        frame = 0;
    render();
    requestAnimationFrame(update);
}
function render() {
    let x = frame % 8;
    let y = Math.floor(frame / 8);
    let u1 = x * 64;
    let v1 = y * 64;
    let u2 = u1 + 64;
    let v2 = v1 + 64;
    gl.clear();
    gl.drawImage(gbr, canvas.width / 2, canvas.height / 2, {
        scaleX: skala,
        scaleY: skala,
        offsetX: gbr.width / 2,
        offsetY: gbr.height / 2,
        texU1: u1,
        texV1: v1,
        texU2: u2,
        texV2: v2
    });
}
