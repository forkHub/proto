"use strict";
let tdl = {};
tdl.item = {};
tdl.db = {};
tdl.view = {
    tambahTbl: document.body.querySelector('div.tdl div.header button.tambah'),
    daftarCont: document.body.querySelector('div.tdl div.daftar-cont')
};
tdl.init = () => {
    tdl.item.daftar = [];
    tdl.db.load();
    tdl.item.daftar.forEach((item) => {
        tdl.item.updateTampilan(item);
    });
    tdl.renderList();
};
tdl.view.tambahTbl.onclick = () => {
    let isi = window.prompt('Item Baru:');
    let item = tdl.item.buat(isi);
    tdl.item.daftar.push(item);
    tdl.item.sembunyiTombol();
    tdl.renderList();
    tdl.db.simpan();
};
tdl.item.sembunyiTombol = () => {
    if (tdl.item.aktif) {
        tdl.item.aktif.view.tombolCont.style.display = 'none';
        tdl.item.aktif = null;
    }
};
tdl.db.simpan = () => {
    let obj = [];
    tdl.item.daftar.forEach((item) => {
        obj.push({
            deskripsi: item.deskripsi,
            selesai: item.selesai
        });
    });
    window.localStorage.setItem('tdl', JSON.stringify(obj));
};
tdl.db.load = () => {
    let dataStr = window.localStorage.getItem('tdl');
    let dataObj;
    tdl.item.daftar = [];
    if (dataStr && dataStr != '') {
        dataObj = JSON.parse(dataStr);
        dataObj.forEach((obj) => {
            let item = tdl.item.buat(obj.deskripsi);
            item.selesai = obj.selesai;
            tdl.item.daftar.push(item);
        });
    }
};
tdl.item.updateTampilan = (item) => {
    if (item.selesai) {
        item.view.deskripsiP.style.textDecoration = 'line-through';
        item.view.deskripsiP.style.fontStyle = 'italic';
        item.view.deskripsiP.style.fontWeight = 'bold';
    }
    else {
        item.view.deskripsiP.style.textDecoration = 'none';
        item.view.deskripsiP.style.fontStyle = 'normal';
        item.view.deskripsiP.style.fontWeight = 'normal';
    }
};
tdl.renderList = () => {
    tdl.view.daftarCont.innerHTML = '';
    for (let i = 0; i < tdl.item.daftar.length; i++) {
        tdl.view.daftarCont.appendChild(tdl.item.daftar[i].view.html);
    }
};
tdl.item.buat = (isi) => {
    if (!isi || isi == '')
        isi = '-kosong-';
    let item = {
        view: {
            html: tdl.template('div.item'),
        },
        deskripsi: isi,
        selesai: false
    };
    item.view.deskripsiP = item.view.html.querySelector('p.desk');
    item.view.tombolCont = item.view.html.querySelector('div.tombol-cont');
    item.view.hapusTbl = item.view.html.querySelector('button.hapus');
    item.view.editTbl = item.view.html.querySelector('button.edit');
    item.view.sudahTbl = item.view.html.querySelector('button.sudah');
    item.view.deskripsiP.innerHTML = isi;
    item.view.html.onclick = (e) => {
        e.stopPropagation();
        if (tdl.item.aktif != item) {
            tdl.item.sembunyiTombol();
            item.view.tombolCont.style.display = 'block';
            if (item.selesai) {
                item.view.sudahTbl.innerText = 'belum';
            }
            else {
                item.view.sudahTbl.innerText = 'sudah';
            }
            tdl.item.aktif = item;
        }
        else {
            tdl.item.sembunyiTombol();
            tdl.item.aktif = null;
        }
    };
    item.view.hapusTbl.onclick = (e) => {
        e.stopPropagation();
        let ok = window.confirm('Apakah anda akan menghapus item ini?');
        tdl.item.sembunyiTombol();
        if (ok) {
            for (let i = 0; i < tdl.item.daftar.length; i++) {
                if (tdl.item.daftar[i].view == item.view) {
                    tdl.item.daftar.splice(i, 1);
                    tdl.renderList();
                    tdl.db.simpan();
                    return;
                }
            }
        }
    };
    item.view.editTbl.onclick = (e) => {
        e.stopPropagation();
        let isi = window.prompt('Edit deskripsi:', item.deskripsi);
        item.deskripsi = isi;
        item.view.deskripsiP.innerHTML = item.deskripsi;
        tdl.db.simpan();
        tdl.item.sembunyiTombol();
    };
    item.view.sudahTbl.onclick = (e) => {
        e.stopPropagation();
        item.selesai = !item.selesai;
        tdl.item.updateTampilan(item);
        tdl.db.simpan();
        tdl.item.sembunyiTombol();
    };
    return item;
};
tdl.template = (query) => {
    let template = document.body.querySelector('template').content;
    return template.querySelector(query).cloneNode(true);
};
