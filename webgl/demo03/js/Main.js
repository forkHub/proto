"use strict";
let gl;
let canvas;
let gbr;
let sudut = 0;
let gpj = 320;
let glb = 320;
window.onload = () => {
    canvas = document.querySelector('canvas');
    gbr = document.querySelector('img#kotak');
    // console.log(gbr);
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
    sudut += 5;
    if (sudut > 360) {
        sudut -= 360;
    }
    render();
    requestAnimationFrame(update);
}
function render() {
    gl.clear();
    gl.drawImage(gbr, canvas.width / 2, canvas.height / 2, {
        offsetX: gbr.width / 2,
        offsetY: gbr.height / 2,
        rotation: sudut,
        scaleX: 3,
        scaleY: 3
    });
}
