"use strict";
function krkCheckPosisiDiGrid(karakter) {
    if (karakter.pos.x % 32)
        return false;
    if (karakter.pos.y % 32)
        return false;
    return true;
}

function krkPosisiGrid(karakter) {
    return {
        x: Math.floor(karakter.pos.x / 32),
        y: Math.floor(karakter.pos.y / 32)
    };
}

function krkPindahGrid(karakter) {
    let posAwalX;
    let posAwalY;
    let posSelanjutnyaX;
    let posSelanjutnyaY;
    let jarakX;
    let jarakY;
    let posBaruX;
    let posBaruY;
    karakter.pindahn++;
    //posisi grid sekarang
    posAwalX = karakter.jalur[karakter.jalurn][0] * 32;
    posAwalY = karakter.jalur[karakter.jalurn][1] * 32;
    //posisi grid target
    posSelanjutnyaX = karakter.jalur[karakter.jalurn + 1][0] * 32;
    posSelanjutnyaY = karakter.jalur[karakter.jalurn + 1][1] * 32;
    //jarak dari grid sekarang ke target
    jarakX = posSelanjutnyaX - posAwalX;
    jarakY = posSelanjutnyaY - posAwalY;
    //posisi karakter baru
    posBaruX = posAwalX + (karakter.pindahn / karakter.pindahJml) * jarakX;
    posBaruY = posAwalY + (karakter.pindahn / karakter.pindahJml) * jarakY;
    karakter.pos.x = posBaruX;
    karakter.pos.y = posBaruY;
}
