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
