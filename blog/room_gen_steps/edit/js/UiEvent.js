"use strict";
jln.ui.editTbl.onclick = () => {
    jln.ui.editTbl.classList.add('aktif');
    jln.ui.jalanTbl.classList.remove('aktif');
    jln.ui.kontainer2.daftarFile.el.style.display = 'block';
    jln.ui.kontainer2.editText.el.style.display = 'none';
    jln.ui.kontainer2.web.el.style.display = 'none';
    jln.ui.jalanTbl.disabled = false;
    jln.ui.editTbl.disabled = true;
    //baca query
    // console.log('search: ' + window.top.location.search);
};
jln.ui.kontainer2.editText.kembaliTbl.onclick = (e) => {
    e.stopPropagation();
    jln.ui.kontainer2.editText.el.style.display = 'none';
    jln.ui.kontainer2.web.el.style.display = 'none';
    jln.ui.kontainer2.daftarFile.el.style.display = 'block';
    console.log(projek);
};
jln.ui.kontainer2.editText.muatUlangTbl.onclick = (e) => {
    e.stopPropagation();
    fileAktif.kontenEdit = fileAktif.konten;
    myCodeMirror.setValue(fileAktif.kontenEdit);
};
jln.ui.jalanTbl.onclick = (e) => {
    e.stopPropagation();
    jln.ui.kontainer2.editText.el.style.display = 'none';
    jln.ui.kontainer2.web.el.style.display = 'flex';
    jln.ui.kontainer2.daftarFile.el.style.display = 'none';
    jln.compile();
};
