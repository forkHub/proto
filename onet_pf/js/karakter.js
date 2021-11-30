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
function krkJalan(karakter) {
    let posAwal = { x: 0, y: 0 };
    let posBaru = { x: 0, y: 0 };
    let posSelanjutnya = { x: 0, y: 0 };
    let perubahan = { x: 0, y: 0 };
    karakter.langkah.n++;
    posAwal.x = karakter.jalur.data[karakter.jalur.n][0] * 32;
    posAwal.y = karakter.jalur.data[karakter.jalur.n][1] * 32;
    posSelanjutnya.x = karakter.jalur.data[karakter.jalur.n + 1][0] * 32;
    posSelanjutnya.y = karakter.jalur.data[karakter.jalur.n + 1][1] * 32;
    perubahan.x = posSelanjutnya.x - posAwal.x;
    perubahan.y = posSelanjutnya.y - posAwal.y;
    posBaru.x = posAwal.x + (karakter.langkah.n / karakter.langkah.nMax) * perubahan.x;
    posBaru.y = posAwal.y + (karakter.langkah.n / karakter.langkah.nMax) * perubahan.y;
    karakter.pos.x = posBaru.x;
    karakter.pos.y = posBaru.y;
}
