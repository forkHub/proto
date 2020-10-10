"use strict";
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
function petaAmbilNilai(x, y) {
    // console.log('peta ambil nilai ' + x + '/' + y);
    let hasil = (peta[y].charAt(x));
    return hasil;
}
function petaSetNilai(x, y, nilai) {
    let str = peta[y];
    // console.log('str ' + str);
    // console.log('x ' + x + '/y ' + y + '/' + nilai);
    str = str.slice(0, x) + nilai + str.slice(x + 1);
    // console.log('str ' + str);
    peta[y] = str;
    // console.log('set nilai ' + x + '-' + y + '-' + nilai);
}
