"use strict";
var puluhan = 0;
var satuan = 0;
var jumlah = 0;
var max = 0;
var jumlahEl = null;
var puluhanEl = null;
var satuanEl = null;
var kirimBtn = null;
var benarBtn = null;
var salahBtn = null;
var feedbackBenar = null;
var feedbackSalah = null;
var soal = 0;
var max = 10;
window.onload = () => {
    init();
};
function init() {
    jumlahEl = document.querySelector('div.cont span.jml');
    puluhanEl = document.querySelector('div.cont input#puluhan');
    satuanEl = document.querySelector('div.cont input#satuan');
    kirimBtn = document.querySelector('div.cont button.kirim');
    benarBtn = document.querySelector('div.feedback.benar button');
    salahBtn = document.querySelector('div.feedback.salah button');
    feedbackBenar = document.querySelector('div.feedback.benar');
    feedbackSalah = document.querySelector('div.feedback.salah');
    console.log(jumlahEl);
    console.log(puluhanEl);
    console.log(satuanEl);
    reset();
    kirimBtn.onclick = () => {
        console.log('kirim klik');
        if (checkBenar()) {
            console.log('benar');
            feedbackBenar.style.display = 'block';
        }
        else {
            console.log('salah');
            feedbackSalah.style.display = 'block';
        }
    };
}
function reset() {
    puluhan = (Math.floor(Math.random() * (max - 1)) + 1) * 10;
    satuan = Math.floor(Math.random() * max);
    jumlah = puluhan + satuan;
    console.log('reset');
    console.log('puluhan ' + puluhan + '/satuan ' + satuan + '/jumlah ' + jumlah);
    jumlahEl.textContent = jumlah + '';
    feedbackHide();
}
function feedbackHide() {
    console.log('feedback hide');
    feedbackBenar.style.display = 'none';
    feedbackSalah.style.display = 'none';
}
function checkBenar() {
    if (puluhanEl.value == '')
        return false;
    if (satuanEl.value == '')
        return false;
    if (parseInt(puluhanEl.value) != puluhan)
        return false;
    if (parseInt(satuanEl.value) != satuan)
        return false;
    return true;
}
