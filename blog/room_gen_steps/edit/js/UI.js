"use strict";
jln.ui = {
    editTbl: document.body.querySelector('div.header button.edit'),
    jalanTbl: document.body.querySelector('div.header button.jalan'),
};
jln.ui.kontainer2 = {
    el: document.body.querySelector('div.kontainer-utama div.kontainer-2'),
    daftarFile: {
        el: document.body.querySelector('div.kontainer-utama div.kontainer-2 div.daftar-file'),
    },
    editText: {
        el: document.body.querySelector('div.kontainer-utama div.kontainer-2 div.edit-text'),
        textArea: document.body.querySelector('div.kontainer-utama div.kontainer-2 div.edit-text textarea'),
        judul: document.body.querySelector('div.kontainer-utama div.kontainer-2 div.edit-text div.judul'),
        kembaliTbl: document.body.querySelector('div.kontainer-utama div.kontainer-2 div.edit-text button.kembali'),
        muatUlangTbl: document.body.querySelector('div.kontainer-utama div.kontainer-2 div.edit-text button.muat-ulang')
    }
};
jln.ui.kontainer2.daftarFile.daftarCss = jln.ui.kontainer2.daftarFile.el.querySelector('div.daftar-css');
jln.ui.kontainer2.daftarFile.daftarJs = jln.ui.kontainer2.daftarFile.el.querySelector('div.daftar-js');
jln.ui.kontainer2.daftarFile.daftarHtml = jln.ui.kontainer2.daftarFile.el.querySelector('div.daftar-html');
jln.ui.kontainer2.web = {
    el: jln.ui.kontainer2.el.querySelector('div.web'),
    iframe: jln.ui.kontainer2.el.querySelector('div.web iframe'),
};
