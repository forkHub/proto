"use strict";
let kanvas;
let kanvasCont;
let kanvasCtx;
let resetTbl;
let bangunTbl;
let ukuranInput;
const waranaUbin = '#00c000';
const warnaTembok = '#808080';
const warnaTembokPilih = '#c0c000';
const warnaPinggir = '#c00000';
const warnaDasar = '#202020';
const warnaPintuKanan = '#0000c0';
window.onload = () => {
    kanvas = document.body.querySelector('canvas');
    kanvasCtx = kanvas.getContext("2d");
    kanvasCont = document.body.querySelector('div.room-gen div.canvas-cont');
    resetTbl = document.body.querySelector('button.reset');
    ukuranInput = document.body.querySelector('input.ukuran');
    bangunTbl = document.body.querySelector('button.bangun');
    bangunTbl.disabled = true;
    bangunTbl.onclick = (e) => {
        e.stopPropagation();
        rgStateUpdate();
        gambar();
    };
    ukuranInput.oninput = (e) => {
        e.stopPropagation();
        bangunTbl.disabled = true;
    };
    resetTbl.onclick = (e) => {
        e.stopPropagation();
        rgJmlUbinMax = parseInt(ukuranInput.value);
        if (isNaN(rgJmlUbinMax)) {
            rgJmlUbinMax = 50;
        }
        if (rgJmlUbinMax < 10)
            rgJmlUbinMax = 10;
        if (rgJmlUbinMax > 50)
            rgJmlUbinMax = 50;
        rgJmlUbin = 0;
        console.log(rgJmlUbinMax);
        bangunTbl.disabled = false;
        rgReset();
        rgStateUpdate();
        gambar();
    };
    rgReset();
    window.onresize = resize;
    resize();
};
function gambar() {
    console.log('gambar');
    kanvasCtx.clearRect(0, 0, 320, 320);
    for (let i = 0; i < rgPetalbr; i++) {
        for (let j = 0; j < rgPetaPjg; j++) {
            if (rgPeta[i][j].type == RG_KOSONG) {
                kanvasCtx.fillStyle = warnaDasar;
                kanvasCtx.fillRect(i * 32, j * 32, 32, 32);
            }
            else if (rgPeta[i][j].type == RG_TEMBOK) {
                if (rgPeta[i][j] == rgTembokAktif) {
                    kanvasCtx.fillStyle = warnaTembokPilih;
                    kanvasCtx.fillRect(i * 32, j * 32, 32, 32);
                }
                else {
                    kanvasCtx.fillStyle = warnaTembok;
                    kanvasCtx.fillRect(i * 32, j * 32, 32, 32);
                }
            }
            else if (rgPeta[i][j].type == RG_UBIN) {
                kanvasCtx.fillStyle = waranaUbin;
                kanvasCtx.fillRect(i * 32, j * 32, 32, 32);
            }
            else if (rgPeta[i][j].type == RG_PINTU_KANAN) {
                kanvasCtx.fillStyle = warnaPintuKanan;
                kanvasCtx.fillRect(i * 32, j * 32, 32, 32);
            }
            else if (rgPeta[i][j].type == RG_PINTU_KIRI) {
                kanvasCtx.fillStyle = warnaPintuKanan;
                kanvasCtx.fillRect(i * 32, j * 32, 32, 32);
            }
        }
    }
}
function resize() {
    let cp = 320;
    let cl = 320;
    let wp = kanvasCont.clientWidth;
    let wl = kanvasCont.clientHeight;
    console.log(wp + ' - ' + wl);
    let ratio = Math.min((wp / cp), (wl / cl));
    let cp2 = Math.floor(cp * ratio);
    let cl2 = Math.floor(cl * ratio);
    kanvas.style.width = cp2 + 'px';
    kanvas.style.height = cl2 + 'px';
    kanvas.style.top = ((wl - cl2) / 2) + 'px';
    kanvas.style.left = ((wp - cp2) / 2) + 'px';
    gambar();
}
