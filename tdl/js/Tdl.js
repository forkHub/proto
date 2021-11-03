"use strict";
let tdl = {
    tambahTbl: null,
    daftarCont: null,
    daftarItem: [],
    init: () => {
        tdl.tambahTbl = document.body.querySelector('div.tdl div.header button.tambah');
        tdl.daftarCont = document.body.querySelector('div.tdl div.daftar-cont');
        tdl.tambahTbl.onclick = () => {
            let isi = window.prompt('Item Baru:');
            let item = tdl.item.buat(isi);
            tdl.daftarItem.push(item);
            tdl.item.sembunyiTombol();
            tdl.renderList();
            tdl.db.simpan();
        };
        tdl.db.load();
        tdl.daftarItem.forEach((item) => {
            tdl.item.updateTampilan(item);
        });
        tdl.renderList();
    },
    template: (query) => {
        let template = document.body.querySelector('template').content;
        return template.querySelector(query).cloneNode(true);
    },
    renderList: () => {
        tdl.daftarCont.innerHTML = '';
        for (let i = 0; i < tdl.daftarItem.length; i++) {
            tdl.daftarCont.appendChild(tdl.daftarItem[i].el);
        }
    }
};
tdl.item = {
    sembunyiTombol: () => {
        if (tdl.item.aktif) {
            tdl.item.aktif.tombolCont.style.display = 'none';
            tdl.item.aktif = null;
        }
    },
    buat: (isi) => {
        if (!isi || isi == '')
            isi = '-kosong-';
        let item = {
            deskripsi: isi,
            selesai: false
        };
        item.el = tdl.template('div.item');
        item.deskripsiP = item.el.querySelector('p.desk');
        item.tombolCont = item.el.querySelector('div.tombol-cont');
        item.hapusTbl = item.el.querySelector('button.hapus');
        item.editTbl = item.el.querySelector('button.edit');
        item.sudahTbl = item.el.querySelector('button.sudah');
        item.deskripsiP.innerHTML = isi;
        item.el.onclick = (e) => {
            e.stopPropagation();
            tdl.item.viewKlik(item);
        };
        item.hapusTbl.onclick = (e) => {
            e.stopPropagation();
            tdl.item.hapusTblKlik(item);
        };
        item.editTbl.onclick = (e) => {
            e.stopPropagation();
            tdl.item.editTblKlik(item);
        };
        item.sudahTbl.onclick = (e) => {
            e.stopPropagation();
            tdl.item.sudahTblKlik(item);
        };
        return item;
    },
    viewKlik: (item) => {
        if (tdl.item.aktif != item) {
            tdl.item.sembunyiTombol();
            item.tombolCont.style.display = 'block';
            if (item.selesai) {
                item.sudahTbl.innerText = 'belum';
            }
            else {
                item.sudahTbl.innerText = 'sudah';
            }
            tdl.item.aktif = item;
        }
        else {
            tdl.item.sembunyiTombol();
            tdl.item.aktif = null;
        }
    },
    hapusTblKlik: (item) => {
        let ok = window.confirm('Apakah anda akan menghapus item ini?');
        tdl.item.sembunyiTombol();
        if (ok) {
            for (let i = 0; i < tdl.daftarItem.length; i++) {
                if (tdl.daftarItem[i].el == item.el) {
                    tdl.daftarItem.splice(i, 1);
                    tdl.renderList();
                    tdl.db.simpan();
                    return;
                }
            }
        }
    },
    editTblKlik: (item) => {
        let isi = window.prompt('Edit deskripsi:', item.deskripsi);
        item.deskripsi = isi;
        item.deskripsiP.innerHTML = item.deskripsi;
        tdl.db.simpan();
        tdl.item.sembunyiTombol();
    },
    sudahTblKlik: (item) => {
        item.selesai = !item.selesai;
        tdl.item.updateTampilan(item);
        tdl.db.simpan();
        tdl.item.sembunyiTombol();
    },
    updateTampilan: (item) => {
        console.log('update tampilan');
        console.log(item);
        if (item.selesai) {
            item.deskripsiP.style.textDecoration = 'line-through';
            item.deskripsiP.style.fontStyle = 'italic';
            item.deskripsiP.style.fontWeight = 'bold';
        }
        else {
            item.deskripsiP.style.textDecoration = 'none';
            item.deskripsiP.style.fontStyle = 'normal';
            item.deskripsiP.style.fontWeight = 'normal';
        }
    }
};
tdl.db = {
    load: () => {
        console.log('load');
        let dataStr = window.localStorage.getItem('tdl');
        let dataObj;
        tdl.daftarItem = [];
        if (dataStr && dataStr != '') {
            dataObj = JSON.parse(dataStr);
            dataObj.forEach((obj) => {
                let item = tdl.item.buat(obj.deskripsi);
                item.selesai = obj.selesai;
                tdl.daftarItem.push(item);
            });
        }
    },
    simpan: () => {
        let obj = [];
        tdl.daftarItem.forEach((item) => {
            obj.push({
                deskripsi: item.deskripsi,
                selesai: item.selesai
            });
        });
        window.localStorage.setItem('tdl', JSON.stringify(obj));
    }
};
