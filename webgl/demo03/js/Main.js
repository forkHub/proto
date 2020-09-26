"use strict";
let gl;
let canvas;
let gbr;
let sudut = 0;
window.onload = () => {
    canvas = document.querySelector('canvas');
    gbr = document.querySelector('img#sprite');
    gl = new Hagl(canvas);
    window.onresize = resize;
    resize();
    requestAnimationFrame(update);
};
function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
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
        rotation: sudut
    });
}
