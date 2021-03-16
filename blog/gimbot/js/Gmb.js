"use strict";
let gmb = {};
gmb.init = () => {
    gmb.kananTbl = document.body.querySelector('button.kanan');
    gmb.kiriTbl = document.body.querySelector('button.kiri');
    gmb.aTbl = document.body.querySelector('button.aksi');
    gmb.kanvas = document.body.querySelector('canvas');
    gmb.kanvasCont = document.body.querySelector('div.gimbot div.canvas-cont');
    gmb.kananTblDitekan = false;
    gmb.kiriTblDitekan = false;
    gmb.aTblDitekan = false;
    window.onkeydown = (e) => {
        e.stopPropagation();
        // console.log(e.code);
        if (e.code == 'ArrowLeft') {
            gmb.kiriTblDitekan = true;
        }
        else if (e.code == 'ArrowRight') {
            gmb.kananTblDitekan = true;
        }
        else if (e.code == 'KeyCode') {
            gmb.aTblDitekan = true;
        }
    };
    gmb.arahTblDitekan = () => {
        if (gmb.kiriTblDitekan)
            return true;
        if (gmb.kananTblDitekan)
            return true;
        return false;
    };
    window.onkeyup = (e) => {
        e.stopPropagation();
        if (e.code == 'ArrowLeft') {
            gmb.kiriTblDitekan = false;
        }
        else if (e.code == 'ArrowRight') {
            gmb.kananTblDitekan = false;
        }
        else if (e.code == 'KeyCode') {
            gmb.aTblDitekan = false;
        }
    };
    gmb.kananTbl.ontouchstart = (e) => {
        e.stopPropagation();
        gmb.kananTblDitekan = true;
    };
    gmb.kananTbl.ontouchend = (e) => {
        e.stopPropagation();
        gmb.kananTblDitekan = false;
    };
    gmb.kiriTbl.ontouchstart = (e) => {
        e.stopPropagation();
        gmb.kiriTblDitekan = true;
    };
    gmb.kiriTbl.ontouchend = (e) => {
        e.stopPropagation();
        gmb.kiriTblDitekan = false;
    };
    gmb.aTbl.ontouchstart = (e) => {
        e.stopPropagation();
        gmb.aTblDitekan = true;
    };
    gmb.aTbl.ontouchend = (e) => {
        e.stopPropagation();
        gmb.aTblDitekan = false;
    };
};
