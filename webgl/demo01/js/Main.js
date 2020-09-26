"use strict";
let gl;
let canvas;
let gbr;
let jml = 0;
let spr = [];
window.onload = () => {
    // console.log('window onload');
    canvas = document.querySelector('canvas');
    gbr = document.querySelector('img#sprite');
    // console.log(gbr);
    gl = new Hagl(canvas);
    window.onresize = resize;
    resize();
    requestAnimationFrame(update);
};
function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
function buatSprite() {
    return {
        x: Math.random() * canvas.width / 2,
        y: canvas.height / 2,
        grav: Math.random() * 10 + 5,
        kec: Math.random() * 10 + 5,
        op: 1
    };
}
function update() {
    // console.log('update');
    if (jml < 500) {
        jml++;
        spr.push(buatSprite());
    }
    spr.forEach((item) => {
        item.y -= item.kec;
        if (item.y < 0) {
            item.y = canvas.height;
            item.x = Math.random() * canvas.width;
            item.kec = Math.floor(Math.random() * 10) + 10;
        }
    });
    render();
    // setTimeout(() => {
    requestAnimationFrame(update);
    // }, 30);
}
function render() {
    gl.clear();
    spr.forEach((item) => {
        gl.drawImage(gbr, item.x, item.y);
    });
}
