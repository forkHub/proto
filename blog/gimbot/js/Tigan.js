"use strict";
const IDLE = 1;
const JLN = 2;
let krk = {
    x: 0,
    y: 240,
    frame: 0,
    anim: false,
    seq: [0, 1, 2, 1],
    arah: 2,
    state: IDLE
};
function krkRender(kontek) {
    kontek.drawImage(krk.gbr, krk.seq[krk.frame] * 32, 0, 32, 55, krk.x, krk.y, 32, 55);
}
function krkUpdate(gmb) {
    if (gmb.kiriTblDitekan) {
        krk.x -= 4;
        krk.anim = true;
        krk.arah = 1;
        krk.state = JLN;
    }
    if (gmb.kananTblDitekan) {
        krk.x += 4;
        krk.anim = true;
        krk.arah = 2;
        krk.state = JLN;
    }
    if (!gmb.arahTblDitekan()) {
        krk.state = IDLE;
        krk.anim = false;
        krk.state = 1;
    }
    //animation
    if (krk.anim) {
        krk.frame++;
        if (krk.frame >= krk.seq.length) {
            krk.frame = 0;
        }
    }
}
