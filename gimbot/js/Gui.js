"use strict";
let GUI = {};
GUI.kanan = document.body.querySelector('button.kanan');
GUI.kiri = document.body.querySelector('button.kiri');
GUI.aksi = document.body.querySelector('button.aksi');
GUI.kanan.ontouchstart = (e) => {
    e.stopPropagation();
    console.log('kanan di pencet');
};
GUI.kanan.ontouchend = (e) => {
    e.stopPropagation();
    console.log('kanan di lepas');
};
GUI.kiri.ontouchstart = (e) => {
    e.stopPropagation();
    console.log('kiri di pencet');
};
GUI.kiri.ontouchend = (e) => {
    e.stopPropagation();
    console.log('kiri di lepas');
};
GUI.aksi.ontouchstart = (e) => {
    e.stopPropagation();
    console.log('tombol aksi di pencet');
};
GUI.aksi.ontouchend = (e) => {
    e.stopPropagation();
    console.log('tombol aksi di lepas');
};
let test = document.body.querySelector('div.canvas-cont');
test.onmousedown = (e) => {
    e.preventDefault();
    console.log('test mouse down');
};
console.log(test);
