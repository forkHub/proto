"use strict";
jln.init = async () => {
    jln.loading.tampil();
    // let config: string = await jln.load('./edit.json?r=' + Math.floor(Math.random() * 99999));
    // let hasilAr: IProject[] = JSON.parse(hasil);
    projek = config;
    jln.ui.kontainer2.daftarFile.daftarCss.innerHTML = '';
    jln.ui.kontainer2.daftarFile.daftarJs.innerHTML = '';
    for (let i = 0; i < projek.file.css.length; i++) {
        let item = projek.file.css[i];
        // item.konten = await jln.load('./' + item.url + '?r=' + Math.floor(Math.random() * 99999));
        item.kontenEdit = item.konten;
        jln.buatItem(item, jln.ui.kontainer2.daftarFile.daftarCss);
    }
    for (let i = 0; i < projek.file.js.length; i++) {
        let item = projek.file.js[i];
        // item.konten = await jln.load('./' + item.url + '?r=' + Math.floor(Math.random() * 99999));
        item.kontenEdit = item.konten;
        jln.buatItem(item, jln.ui.kontainer2.daftarFile.daftarJs);
    }
    for (let i = 0; i < projek.file.html.length; i++) {
        let item = projek.file.html[i];
        // item.konten = await jln.load('./' + item.url + '?r=' + Math.floor(Math.random() * 99999));
        // console.log(item.konten);
        // item.konten = jln.html(item.konten);
        item.kontenEdit = item.konten;
        // console.log(item.konten);
        jln.buatItem(item, jln.ui.kontainer2.daftarFile.daftarHtml);
    }
    // console.log(hasil);
    console.log(window.top.location.search);
    myCodeMirror = CodeMirror.fromTextArea(jln.ui.kontainer2.editText.textArea, {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        theme: 'ambiance'
    });
    myCodeMirror.on("change", () => {
        fileAktif.kontenEdit = myCodeMirror.getValue();
    });
    jln.loading.tutup();
    jln.compile();
};
jln.html = (str) => {
    let idx = 0;
    let idx2 = 0;
    let scriptReg = /<script .+<\/script>/;
    let hasil = '';
    idx = str.indexOf('<body>');
    idx2 = str.indexOf('</body>', idx);
    hasil = str.slice(idx + 6, idx2);
    hasil = hasil.replace(scriptReg, '');
    hasil = hasil.replace(scriptReg, '');
    hasil = hasil.replace(scriptReg, '');
    hasil = hasil.replace(scriptReg, '');
    hasil = hasil.replace(scriptReg, '');
    hasil = hasil.replace(scriptReg, '');
    return hasil;
};
jln.buatItem = (item, cont) => {
    item.ui = {};
    item.ui.el = jln.template('div.file');
    item.ui.tbl = item.ui.el.querySelector('button');
    item.ui.tbl.innerText = item.nama;
    cont.appendChild(item.ui.el);
    item.ui.el.onclick = (e) => {
        e.stopPropagation();
        console.log(item.nama);
        jln.editFile(item);
    };
};
jln.load = async (url) => {
    return new Promise((resolve, reject) => {
        try {
            let xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (200 == xhr.status) {
                    resolve(xhr.responseText);
                }
                else {
                    console.log('response error');
                    reject(new CError(xhr.status, xhr.statusText));
                }
            };
            xhr.onerror = (e) => {
                console.log('xhr error');
                console.log(e);
                reject(new CError(500, e.message));
            };
            xhr.open("get", url, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send('');
        }
        catch (e) {
            console.log('Util error');
            console.log(e);
            reject(new CError(500, e.message));
        }
    });
};
jln.compile = () => {
    let hasil = template;
    let css = '<style>';
    let script = '';
    jln.loading.tampil();
    projek.file.css.forEach((file) => {
        css += file.kontenEdit;
    });
    css += '</style>';
    projek.file.js.forEach((file) => {
        let scr2 = '<script>' + file.kontenEdit + '</script>';
        script += scr2;
    });
    hasil = hasil.replace("{{css}}", css);
    hasil = hasil.replace("{{body}}", projek.file.html[0].kontenEdit);
    hasil = hasil.replace("{{js}}", script);
    jln.ui.kontainer2.web.iframe.parentElement.removeChild(jln.ui.kontainer2.web.iframe);
    jln.ui.kontainer2.web.iframe = document.createElement('iframe');
    jln.ui.kontainer2.web.el.innerHTML = '';
    jln.ui.kontainer2.web.el.appendChild(jln.ui.kontainer2.web.iframe);
    jln.ui.jalanTbl.disabled = true;
    jln.ui.editTbl.disabled = false;
    // console.log(script);
    // console.log(hasil);
    setTimeout(() => {
        jln.ui.kontainer2.web.iframe.contentWindow.document.open();
        jln.ui.kontainer2.web.iframe.contentWindow.document.write(hasil);
        jln.ui.kontainer2.web.iframe.contentWindow.document.close();
        jln.loading.tutup();
    }, 1000);
};
jln.template = (query) => {
    let template = document.body.querySelector('template').content;
    return template.querySelector(query).cloneNode(true);
};
jln.editFile = (item) => {
    jln.ui.kontainer2.daftarFile.el.style.display = 'none';
    jln.ui.kontainer2.web.el.style.display = 'none';
    jln.ui.kontainer2.editText.el.style.display = 'flex';
    jln.ui.kontainer2.editText.judul.innerHTML = item.nama;
    fileAktif = item;
    myCodeMirror.doc.setValue(item.kontenEdit);
    myCodeMirror.setOption('theme', 'ambiance');
};
