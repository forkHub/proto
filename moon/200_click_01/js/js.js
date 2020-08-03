"use strict";
let cellAr = [];
let cellMax = 100; //maksimum cell boleh dibuat
let peta = [
    "XXXXXXXXXX",
    "X        X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X    X   X",
    "X        X",
    "XXXXXXXXXX"
];
let canvas;
let canvasCtx;
let gbrBox;
let gbrBola;
window.onload = () => {
    canvas = document.body.querySelector('canvas');
    canvasCtx = canvas.getContext("2d");
    gbrBola = document.body.querySelector("img#img-bola");
    gbrBox = document.body.querySelector("img#img-box");
    gambarPeta();
    canvas.onclick = (e) => {
        let posx = Math.floor((e.clientX) / 32);
        let posy = Math.floor((e.clientY) / 32);
        bersihkanLayar();
        let hasil = pfCariJalan(1, 1, posx, posy);
        gambarPeta();
        gambarJalan(hasil);
    };
};
function gambarJalan(hasil) {
    hasil.forEach((item) => {
        canvasCtx.drawImage(gbrBola, item[0] * 32, item[1] * 32);
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
    canvasCtx.clearRect(0, 0, 360, 640);
}
/**
 * Membuat jalur hasil dengan cara menelusuri balik dari cell terakhir ke pertama
 * @param cell Cell terakhir
 * @param res tempat menampung hasil
 */
function pfTelusurBalik(cell, res) {
    let i = 0;
    let cellTemp = null;
    let cellParent = null;
    let len;
    //cari parent dari cell yang sedang di check
    len = cellAr.length;
    for (i = 0; i < len; i++) {
        cellTemp = cellAr[i];
        if (cell.induk == cellTemp) {
            cellParent = cellTemp;
        }
    }
    //parent gak ada, cell adalah cell awal, kembali;
    if (cellParent == null) {
        console.log("pencarian selesai cell target adalah cell awal");
        return;
    }
    //hasilnya di masukkan ke let res
    //urutan dibalik
    //bila parent adalah cell awal maka penelusuran berhenti
    res.unshift(cellParent);
    if (cellParent.induk == null) {
        return;
    }
    else {
        pfTelusurBalik(cellParent, res);
    }
}
/**
 * Buka cell
 * @param cellCr cell sekarang
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfBukaCellBaru(cellCr, tx, ty) {
    //up
    if (pfPosBisa(cellCr.x, cellCr.y - 1)) {
        cellAr.push(cellBuat(cellCr, cellCr.x, cellCr.y - 1, tx, ty));
    }
    //right
    if (pfPosBisa(cellCr.x + 1, cellCr.y)) {
        cellAr.push(cellBuat(cellCr, cellCr.x + 1, cellCr.y, tx, ty));
    }
    //down
    if (pfPosBisa(cellCr.x, cellCr.y + 1)) {
        cellAr.push(cellBuat(cellCr, cellCr.x, cellCr.y + 1, tx, ty));
    }
    //left
    if (pfPosBisa(cellCr.x - 1, cellCr.y)) {
        cellAr.push(cellBuat(cellCr, cellCr.x - 1, cellCr.y, tx, ty));
    }
}
/**
 * Merubah hasil kebentuk array yang lebih sederhana
 * @param res Array sumber
 */
function pfRes2Array(res) {
    let ar = [];
    res.forEach(cell => {
        ar.push([cell.x, cell.y]);
    });
    return ar;
}
/**
 * Check sampai tujuan
 * @param x posisi x
 * @param y posisi y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfCheckSampaiTujuan(x, y, tx, ty) {
    if ((x == tx) && (y == ty))
        return true;
    return false;
}
/**
 * Proses mencari jalan
 * @param sx posisi sumber x
 * @param sy posisi sumber y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfCariJalan(sx, sy, tx, ty) {
    let cellCr;
    let res = [];
    cellAr = [];
    //bila posisi tujuan sama dengan awal
    //kembalikan array kosong
    if ((sx == tx) && (sy == ty)) {
        return [];
    }
    cellAr.push(cellBuat(null, sx, sy, tx, ty));
    while (true) {
        //bila jumlah cell yang dihasilkan melebihi maksimum
        //kembalikan array kosong
        if ((cellAr.length >= cellMax)) {
            return [];
        }
        //cari cell yang masih terbuka (Langkah 2)
        cellCr = cellCariYangTerbuka();
        //bila ada cell yang masih terbuka
        if (cellCr) {
            //ubah status jadi tutup (Langkah 2)
            cellCr.buka = -1;
            //check jika sudah sampai tujuan (Langkah 12)
            if (pfCheckSampaiTujuan(cellCr.x, cellCr.y, tx, ty)) {
                //buat jalur (Langkah 12)
                res.unshift(cellCr);
                pfTelusurBalik(cellCr, res);
                return pfRes2Array(res);
            }
            //(Langkah 1)
            pfBukaCellBaru(cellCr, tx, ty);
        }
        else {
            //Tidak ada cell yang terbuka
            //Jalur tidak ketemu
            //Kembalikan array kosong
            return [];
        }
    }
}
/**
 * Mengecek apakah posisi (ix, jx) bisa dilalui
 * @param x Posisi x
 * @param y Posisi y
 */
function pfPosBisa(x, y) {
    //check cell
    if (cellCheckDouble(x, y)) {
        return false;
    }
    //check block peta
    if (!petaPosValid(x, y)) {
        return false;
    }
    return true;
}
/**
 * Buat cell baru
 * @param parent Parent cell
 * @param x posisi x
 * @param y posisi y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function cellBuat(parent, x, y, tx, ty) {
    let cell = {
        x: x,
        y: y,
        buka: 1,
        jarak: -1,
        induk: parent,
    };
    cell.jarak = Math.abs(tx - x) + Math.abs(ty - y);
    return cell;
}
/**
 * Cari cell yang masih terbuka
 */
function cellCariYangTerbuka() {
    let i = 0;
    let cell = null;
    let maxLen;
    let cellTemp;
    let len = 0;
    maxLen = 10000;
    len = cellAr.length - 1;
    for (i = len; i >= 0; i--) {
        cell = cellAr[i];
        if (1 == cell.buka) {
            if (cell.jarak < maxLen) {
                cellTemp = cell;
                maxLen = cell.jarak;
            }
        }
    }
    return cellTemp;
}
/**
 * Check apakah cell sudah ada di daftar, parameter yang dipakai adalah posisi
 * @param x posisi x
 * @param y posisi y
 */
function cellCheckDouble(x, y) {
    let res = false;
    cellAr.forEach(cell => {
        if (cell.x == x && cell.y == y) {
            res = true;
        }
    });
    return res;
}
function petaKosong(x, y) {
    return (peta[y].charAt(x) == " ");
}
function petaPosValid(x, y) {
    if (x < 0)
        return false;
    if (y >= peta.length)
        return false;
    if (x >= peta[y].length)
        return false;
    return petaKosong(x, y);
}
