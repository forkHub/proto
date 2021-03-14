"use strict";
const RG_KOSONG = 1;
const RG_UBIN = 2;
const RG_TEMBOK = 3;
const RG_PINTU_KANAN = 4;
const RG_PINTU_KIRI = 5;
const RGST_AWAL = 1;
const RGST_TEMBOK = 2;
const RGST_PILIH_TEMBOK = 3;
const RGST_UBIN_BARU = 4;
const RGST_SELESAI = 5;
let rgPeta = [];
let rgState = 1;
let rgTembokAktif;
let rgJmlUbinMax = 40;
let rgJmlUbin = 0;
let rgPetaPjg = 10;
let rgPetalbr = 10;
function rgPasangPintuKiri() {
    let posx = 1000;
    let posy = 1000;
    for (let i = 0; i < rgPetalbr; i++) {
        for (let j = 0; j < rgPetaPjg; j++) {
            if (rgPeta[i][j].type == RG_TEMBOK) {
                if (rgPintuKiriOk(i, j)) {
                    if (i < posx) {
                        posx = i;
                        posy = j;
                    }
                }
            }
        }
    }
    if (posx < 1000) {
        rgPeta[posx][posy].type = RG_PINTU_KIRI;
    }
}
function rgPintuKiriOk(x, y) {
    if (x == rgPetaPjg - 1)
        return false;
    if (rgPeta[x + 1][y].type != RG_UBIN)
        return false;
    return true;
}
function rgPintuKananOk(x, y) {
    if (x == 0)
        return false;
    if (rgPeta[x - 1][y].type != RG_UBIN)
        return false;
    return true;
}
function rgSekelilingAdaUbin(x, y) {
    if (x > 0) {
        if (y > 0) {
            if (rgPeta[x - 1][y - 1].type == RG_UBIN)
                return true;
        }
        if (y < rgPetalbr - 1) {
            if (rgPeta[x - 1][y + 1].type == RG_UBIN)
                return true;
        }
    }
    if (x < rgPetaPjg - 1) {
        if (y > 0) {
            if (rgPeta[x + 1][y - 1].type == RG_UBIN)
                return true;
        }
        if (y < rgPetalbr - 1) {
            if (rgPeta[x + 1][y + 1].type == RG_UBIN)
                return true;
        }
    }
    return rgSebelahAdaUbin(x, y);
}
function rgStateUbinBaru() {
    if (rgTembokAktif) {
        rgTembokAktif.type = RG_UBIN;
        rgState = RGST_TEMBOK;
        rgJmlUbin++;
    }
}
function rgBuat() {
    rgReset();
    while (rgState != RGST_SELESAI) {
        // console.log('udate state ' + rgState);
        rgStateUpdate();
    }
}
function rgPinggir(x, y) {
    if (x == 0)
        return true;
    if (x == rgPetaPjg - 1)
        return true;
    if (y == 0)
        return true;
    if (y == rgPetalbr - 1)
        return true;
    return false;
}
function rgSebelahAdaUbin(x, y) {
    if (x > 0) {
        if (rgPeta[x - 1][y].type == RG_UBIN)
            return true;
    }
    if (x < rgPetaPjg - 1) {
        if (rgPeta[x + 1][y].type == RG_UBIN)
            return true;
    }
    if (y > 0) {
        if (rgPeta[x][y - 1].type == RG_UBIN)
            return true;
    }
    if (y < rgPetalbr - 1) {
        if (rgPeta[x][y + 1].type == RG_UBIN)
            return true;
    }
    return false;
}
function rgPasangPintuKanan() {
    let posx = -1;
    let posy = -1;
    for (let i = 0; i < rgPetalbr; i++) {
        for (let j = 0; j < rgPetaPjg; j++) {
            if (rgPeta[i][j].type == RG_TEMBOK) {
                if (rgPintuKananOk(i, j)) {
                    if (i > posx) {
                        posx = i;
                        posy = j;
                    }
                }
            }
        }
    }
    if (posx >= 0) {
        rgPeta[posx][posy].type = RG_PINTU_KANAN;
    }
}
function rgStateAwal() {
    rgPeta[Math.floor(rgPetaPjg / 2)][Math.floor(rgPetalbr / 2)].type = RG_UBIN;
    rgState = RGST_TEMBOK;
}
function rgStateBangunTembok() {
    //set tembok
    for (let i = 0; i < rgPetalbr; i++) {
        for (let j = 0; j < rgPetaPjg; j++) {
            if (rgPeta[i][j].type == RG_KOSONG) {
                if (rgSekelilingAdaUbin(i, j)) {
                    rgPeta[i][j].type = RG_TEMBOK;
                }
            }
        }
    }
    if (rgJmlUbin >= rgJmlUbinMax) {
        rgPasangPintuKiri();
        rgPasangPintuKanan();
        rgState = RGST_SELESAI;
    }
    else {
        rgState = RGST_PILIH_TEMBOK;
    }
}
function rgStatePilihTembok() {
    let kotakAr = [];
    for (let i = 0; i < rgPetalbr; i++) {
        for (let j = 0; j < rgPetaPjg; j++) {
            if (rgPeta[i][j].type == RG_TEMBOK) {
                if (rgSebelahAdaUbin(i, j) && !rgPinggir(i, j)) {
                    kotakAr.push(rgPeta[i][j]);
                }
            }
        }
    }
    rgTembokAktif = kotakAr[Math.floor(Math.random() * kotakAr.length)];
    rgState = RGST_UBIN_BARU;
}
function rgReset() {
    for (let i = 0; i < rgPetalbr; i++) {
        rgPeta[i] = new Array(10);
        for (let j = 0; j < rgPetaPjg; j++) {
            rgPeta[i][j] = {
                type: RG_KOSONG,
                pemilik: []
            };
        }
    }
    rgState = RGST_AWAL;
}
function rgStateUpdate() {
    // state++;
    if (rgState == RGST_AWAL) {
        rgStateAwal();
    }
    else if (rgState == RGST_TEMBOK) {
        rgStateBangunTembok();
    }
    else if (rgState == RGST_PILIH_TEMBOK) {
        rgStatePilihTembok();
    }
    else if (rgState == RGST_UBIN_BARU) {
        rgStateUbinBaru();
    }
    else if (rgState == RGST_SELESAI) {
        //selesai
    }
    else {
        throw Error('state tidak terdaftar');
    }
}
