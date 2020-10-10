"use strict";
window.onload = () => {
    kanvas = document.body.querySelector('canvas');
    kanvasCtx = kanvas.getContext("2d");
    gbrBox = document.body.querySelector("img#img-box");
    viewDialogDepan.view = document.body.querySelector('div.depan');
    viewDialogDepan.tombol = viewDialogDepan.view.querySelector('button');
    viewDialogSelesai.view = document.body.querySelector('div.selesai');
    viewDialogSelesai.tombol = viewDialogSelesai.view.querySelector('button');
    viewDialogGameOver.view = document.body.querySelector('div.game-over');
    viewDialogGameOver.tombol = viewDialogGameOver.view.querySelector('button');
    viewDialogDepan.tombol.onclick = () => {
        console.log('mulai click');
        viewDialogDepan.view.style.display = 'none';
        mulai();
    };
    viewDialogSelesai.tombol.onclick = () => {
        console.log('selesai click');
        viewDialogSelesai.view.style.display = 'none';
        viewDialogDepan.view.style.display = 'flex';
    };
    viewDialogGameOver.tombol.onclick = () => {
        viewDialogGameOver.view.style.display = 'none';
        viewDialogDepan.view.style.display = 'flex';
    };
    window.onresize = () => {
        resize();
        render();
    };
    resize();
    render();
    setTimeout(() => {
        resize();
        render();
    }, 100);
    kanvas.onclick = (e) => {
        kanvasKlick(e);
        render();
    };
    setInterval(() => {
        if (ST_GAME_OVER == state)
            return;
        if (ST_AWAL == state)
            return;
        waktu2--;
        if (waktu2 <= 0) {
            state = ST_GAME_OVER;
            viewDialogGameOver.view.style.display = 'flex';
        }
        render();
    }, 1000);
};
function mulai() {
    state = ST_MULAI;
    isiPeta();
    nilaiAwal = '';
    nilaiSekarang = '';
    waktu2 = 100;
    render();
}
function isiPeta() {
    let total = isiPanjang * isiLebar / 2;
    let isi = [];
    for (let i = 0; i < total; i++) {
        isi.push(i);
        isi.push(i);
    }
    // console.log('isi');
    // console.log(isi);
    //acak
    for (let i = 0; i < isi.length * 10; i++) {
        let a = Math.floor(Math.random() * total * 2);
        let b = Math.floor(Math.random() * total * 2);
        let c = 0;
        c = isi[a];
        isi[a] = isi[b];
        isi[b] = c;
    }
    // console.log('isi');
    // console.log(isi);
    for (let i = 0; i < total * 2; i++) {
        let x = i % isiPanjang;
        let y = Math.floor(i / isiPanjang);
        x;
        y;
        petaSetNilai(x + 2, y + 2, isi[i] + '');
    }
    // console.log(peta);
}
function checkSelesai() {
    for (let i = 0; i < peta[0].length; i++) {
        for (let j = 0; j < peta.length; j++) {
            if (petaAmbilNilai(i, j) in ["1", "2", '3', '4', '5', '6', '7', '8']) {
                console.log('belum selesai ' + i + '-' + j + '-' + petaAmbilNilai(i, j));
                return false;
            }
        }
    }
    return true;
}
function kanvasKlick(e) {
    let rect = kanvas.getBoundingClientRect();
    let poslx = (e.clientX - rect.x) * kanvasScaleX;
    let posly = ((e.clientY - rect.y) * kanvasScaleY);
    let posx = Math.floor(poslx / 32);
    let posy = Math.floor(posly / 32);
    let nilai = '';
    if (!posValid(posx, posy)) {
        console.log('posisi tidak valid');
        return;
    }
    nilai = petaAmbilNilai(posx, posy);
    if (nilai == ' ' || nilai == "X") {
        console.log('nilai tidak valid');
        return;
    }
    if (ST_ADA_DIPILIH == state) {
        posAkhirX = posx;
        posAkhirY = posy;
        nilaiSekarang = nilai;
        hasil = pfCariJalan(posAwalX, posAwalY, posAkhirX, posAkhirY);
        if (pilihanValid()) {
            petaSetNilai(posAwalX, posAwalY, ' ');
            petaSetNilai(posAkhirX, posAkhirY, ' ');
            hasil.push([posAkhirX, posAkhirY]);
            if (checkSelesai()) {
                viewDialogSelesai.view.style.display = 'flex';
                state = ST_AWAL;
            }
            else {
                state = ST_TENGAH;
            }
        }
        else {
            console.log('pilihan tidak valid');
            state = ST_ADA_DIPILIH;
            nilaiAwal = nilaiSekarang;
            posAwalX = posAkhirX;
            posAwalY = posAkhirY;
        }
    }
    else if (ST_MULAI == state) {
        posAwalX = posx;
        posAwalY = posy;
        nilaiAwal = nilai;
        state = ST_ADA_DIPILIH;
    }
    else if (ST_TENGAH == state) {
        posAwalX = posx;
        posAwalY = posy;
        nilaiAwal = nilai;
        state = ST_ADA_DIPILIH;
    }
    else {
        throw new Error('');
    }
}
function posValid(x, y) {
    if (x < 0)
        return false;
    if (y < 0)
        return false;
    if (x >= peta[0].length)
        return false;
    if (y >= peta.length)
        return false;
    return true;
}
function nilaiValid() {
    if (nilaiAwal == ' ')
        return false;
    return true;
}
function pilihanValid() {
    if (nilaiAwal != nilaiSekarang)
        return false;
    if (hasil.length == 0)
        return false;
    return true;
}
function render() {
    // console.log('render state ' + state);
    bersihkanLayar();
    gambarPeta();
    if (ST_ADA_DIPILIH == state) {
        // console.log('gambar state dipilih');
        gambarKotak(posAwalX, posAwalY);
    }
    else if (ST_MULAI == state) {
        // console.log('gambar state awal');
    }
    else if (ST_TENGAH == state) {
        // console.log('gambar state tengah');
        gambarKotak(posAwalX, posAwalY);
        gambarKotak(posAkhirX, posAkhirY);
        gambarJalan(hasil);
    }
    gambarWaktu();
}
function gambarWaktu() {
    kanvasCtx.beginPath();
    kanvasCtx.strokeStyle = "#ffffff";
    kanvasCtx.lineWidth = 2;
    kanvasCtx.rect(32 * 2, 32 * 1 + 8, 32 * 4, 16);
    kanvasCtx.stroke();
    kanvasCtx.beginPath();
    kanvasCtx.strokeStyle = "#ffffff";
    kanvasCtx.lineWidth = 2;
    kanvasCtx.fillStyle = "#0000ff";
    kanvasCtx.rect(32 * 2, 32 * 1 + 8, (waktu2 / 100) * 32 * 4, 16);
    kanvasCtx.fill();
    kanvasCtx.stroke();
}
function gambarJalan(hasil) {
    if (!hasil)
        return;
    if (hasil.length == 0)
        return;
    kanvasCtx.beginPath();
    kanvasCtx.strokeStyle = "#00ff00";
    kanvasCtx.lineWidth = 3;
    for (let i = 0; i < hasil.length; i++) {
        if (i > 0) {
            let x0 = (hasil[i - 1][0]) * 32 + 16;
            let y0 = (hasil[i - 1][1]) * 32 + 16;
            let x1 = (hasil[i][0]) * 32 + 16;
            let y1 = (hasil[i][1]) * 32 + 16;
            kanvasCtx.moveTo(x0, y0);
            kanvasCtx.lineTo(x1, y1);
        }
    }
    // if (hasil.length == 1) {
    // 	kanvasCtx.moveTo(posAwalX * 32 + 16, posAwalY * 32 + 16)
    // }
    // kanvasCtx.lineTo(posAkhirX * 32 + 16, posAkhirY * 32 + 16);
    kanvasCtx.stroke();
}
function gambarKotak(x, y) {
    // console.log('gambar kotak ' + x + '/' + y);
    kanvasCtx.beginPath();
    kanvasCtx.strokeStyle = "#0000ff";
    kanvasCtx.lineWidth = 3;
    kanvasCtx.rect(x * 32, y * 32, 32, 32);
    kanvasCtx.stroke();
}
function gambarPeta() {
    for (let jx = 0; jx < peta.length; jx++) {
        for (let ix = 0; ix < peta[jx].length; ix++) {
            let n = petaAmbilNilai(ix, jx);
            if (" " == n) {
            }
            else if ("X" == n) {
                kanvasCtx.drawImage(gbrBox, ix * 32, jx * 32);
            }
            else {
                kanvasCtx.beginPath();
                kanvasCtx.lineWidth = 1;
                kanvasCtx.arc(ix * 32 + 16, jx * 32 + 16, 10, 0, 180 / Math.PI);
                kanvasCtx.fillStyle = warna[parseInt(n)];
                kanvasCtx.fill();
                kanvasCtx.strokeStyle = "#ffffff";
                kanvasCtx.stroke();
            }
        }
    }
}
function bersihkanLayar() {
    kanvasCtx.clearRect(0, 0, gp, gl);
    kanvasCtx.beginPath();
}
