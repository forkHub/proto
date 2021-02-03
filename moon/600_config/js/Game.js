"use strict";
window.onload = () => {
    canvas = document.body.querySelector('canvas');
    canvasCtx = canvas.getContext("2d");
    gbrBola = document.body.querySelector("img#img-bola");
    gbrBox = document.body.querySelector("img#img-box");
    gbrTigan = document.body.querySelector("img#img-tigan");
    document.body.querySelector('input#cepat').onclick = (e) => {
        pfConfig.mode = parseInt(e.currentTarget.value);
    };
    document.body.querySelector('input#astar').onclick = (e) => {
        pfConfig.mode = parseInt(e.currentTarget.value);
    };
    // pilihan.onclick = () => {
    // 	console.log(pilihan.value);
    // }
    // pilihan.onchange = () => {
    // 	console.log('on change ' + pilihan.value);
    // }
    window.onresize = () => {
        resize();
        render();
    };
    resize();
    render();
    setTimeout(() => {
        resize();
        render();
    }, 100);
    canvas.onclick = (e) => {
        if (karakter.status != st_idle)
            return;
        let rect = canvas.getBoundingClientRect();
        let poslx = (e.clientX - rect.x) * canvasScaleX;
        let posly = ((e.clientY - rect.y) * canvasScaleY);
        let posx = Math.floor(poslx / 32);
        let posy = Math.floor(posly / 32);
        let posGrid = krkPosisiGrid(karakter);
        let hasil = pfCariJalan(posGrid.x, posGrid.y, posx, posy);
        karakter.status = st_jalan;
        karakter.jalur = hasil;
        karakter.jalurn = -1;
    };
    setInterval(() => {
        update();
        render();
    }, 100);
};
function update() {
    if (karakter.status == st_idle) {
    }
    else if (karakter.status == st_jalan) {
        if (krkCheckPosisiDiGrid(karakter)) {
            karakter.jalurn++;
            if (karakter.jalurn >= karakter.jalur.length - 1) {
                karakter.status = st_idle;
            }
            else {
                karakter.status = st_jalan;
                karakter.pindahn = 0;
                krkPindahGrid(karakter);
            }
        }
        else {
            krkPindahGrid(karakter);
        }
    }
}
function render() {
    bersihkanLayar();
    gambarPeta();
    gambarJalan(karakter.jalur);
    gambarKarakter();
}
function gambarKarakter() {
    canvasCtx.drawImage(gbrTigan, karakter.pos.x, karakter.pos.y);
}
function gambarJalan(hasil) {
    hasil.forEach((item) => {
        canvasCtx.drawImage(gbrBola, item[0] * 32 + 8, item[1] * 32 + 8);
    });
}
function gambarPeta() {
    for (let jx = 0; jx < peta.length; jx++) {
        for (let ix = 0; ix < peta[jx].length; ix++) {
            if (petaKosong(ix, jx)) {
            }
            else {
                canvasCtx.drawImage(gbrBox, ix * 32, jx * 32);
            }
        }
    }
}
function bersihkanLayar() {
    canvasCtx.clearRect(0, 0, gp, gl);
}
