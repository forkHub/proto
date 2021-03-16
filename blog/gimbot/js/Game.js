"use strict";
let kontek;
window.onload = () => {
    gmb.init();
    kontek = gmb.kanvas.getContext('2d');
    krk.gbr = document.body.querySelector('img.gbr-tigan');
    window.onresize = resize;
    resize();
    requestAnimationFrame(update);
};
function resize() {
    let cp = 320;
    let cl = 320;
    console.log('resize');
    let wp = gmb.kanvasCont.clientWidth;
    let wl = gmb.kanvasCont.clientHeight;
    console.log(wp);
    console.log(wl);
    let ratio = Math.min((wp / cp), (wl / cl));
    let cp2 = Math.floor(cp * ratio);
    let cl2 = Math.floor(cl * ratio);
    gmb.kanvas.style.width = cp2 + 'px';
    gmb.kanvas.style.height = cl2 + 'px';
    gmb.kanvas.style.top = ((wl - cl2) / 2) + 'px';
    gmb.kanvas.style.left = ((wp - cp2) / 2) + 'px';
    render();
}
function update() {
    krkUpdate(gmb);
    render();
    setTimeout(() => {
        requestAnimationFrame(update);
    }, 30);
}
function render() {
    kontek.clearRect(0, 0, 320, 320);
    krkRender(kontek);
}
