"use strict";
class FormBarangPage {
    constructor() {
        this.id = '';
        this._editMode = false;
        this._view = new FormBarangView();
        this._selesai = null;
    }
    resetTinyMCE() {
        if (tinymce.activeEditor) {
            tinymce.activeEditor.destroy();
        }
        tinymce.EditorManager.editors = [];
        tinymce.remove('textarea#deskripsi-barang-panjang');
        tinymce.init({
            selector: "textarea#deskripsi-barang-panjang"
        });
    }
    init() {
        this.view.init();
        this.upload = App.upload;
        this.default();
        this.view.form.onsubmit = (e) => {
            e.stopPropagation();
            console.log(this._editMode);
            if (this._editMode) {
                this.editKirim(1);
            }
            else {
                this.simpanKirim(1);
            }
            return false;
        };
        this.view.draftTbl.onclick = () => {
            console.group('click draft button');
            if (this._editMode) {
                this.editKirim(0);
            }
            else {
                this.simpanKirim(0);
            }
            console.groupEnd();
        };
        this.view.editFotoTbl.onclick = () => {
            this.editFotoClick();
        };
        this.view.tutupTbl.onclick = () => {
            window.top.location.href = '/toko';
        };
    }
    editKirim(publish) {
        try {
            Util.Ajax('post', '/barang/update/' + this.id, JSON.stringify(this.formToObj(publish)))
                .then((hasil) => {
                console.log('update sukses');
                console.log(hasil);
                App.dialog.p.innerText = 'Sukses';
                App.dialog.tampil(false);
                App.dialog.okTbl.onclick = () => {
                    console.log('tombol on click');
                    window.top.location.href = Util.urlToko;
                };
            })
                .catch((_err) => {
                App.dialog.p.innerHTML = _err;
                App.dialog.tampil();
            });
        }
        catch (e) {
            App.dialog.p.innerHTML = e;
            App.dialog.tampil();
        }
    }
    draftKirim() {
    }
    simpanKirim(publish) {
        try {
            Util.Ajax('post', '/barang/baru', JSON.stringify(this.formToObj(publish)))
                .then((hasil) => {
                console.log(hasil);
                App.dialog.p.innerText = 'Sukses';
                App.dialog.tampil(false);
                App.dialog.okTbl.onclick = () => {
                    window.top.location.href = Util.urlToko;
                };
            })
                .catch((_err) => {
                App.dialog.p.innerHTML = _err;
                App.dialog.tampil();
            });
        }
        catch (e) {
            App.dialog.p.innerHTML = e;
            App.dialog.tampil();
        }
    }
    default() {
        this.view.namaInput.value = 'nama';
        // this.view.deskripsiBarangInput.value = 'deskripsi';
        this.view.deskripsiPanjangInput.value = 'deskripsi2';
        this.view.hargaBarangInput.value = '1000';
        this.view.wa.value = '12345';
    }
    objToForm(data) {
        this.view.namaInput.value = data.nama;
        // this.view.deskripsiBarangInput.value = data.deskripsi;
        this.view.deskripsiPanjangInput.value = data.deskripsi_panjang;
        this.view.hargaBarangInput.value = data.harga + '';
        this.view.wa.value = data.wa;
        this.id = data.id;
        this.view.inputFileId.value = data.file_id;
    }
    formToObj(publish) {
        return {
            deskripsi_panjang: tinymce.activeEditor.getContent(),
            file_id: this.view.inputFileId.value,
            harga: this.view.hargaBarangInput.value,
            id: this.view.postIdInput.value,
            nama: this.view.namaInput.value,
            wa: this.view.wa.value,
            publish: publish
        };
    }
    editFotoClick() {
        this.view.detach();
        this.upload.attach(App.cont);
        this.upload.selesai = () => {
            this.upload.detach();
            this.upload.selesai = null;
            this.view.inputFileId.value = this.upload.insertedId;
            this.view.gambarHtml.src = this.upload.gbrUrl;
            this.view.attach(App.cont);
            this.resetTinyMCE();
        };
        this.upload.tutupTbl.onclick = () => {
            this.upload.detach();
            this.view.attach(App.cont);
            this.resetTinyMCE();
        };
    }
    get view() {
        return this._view;
    }
    get editMode() {
        return this._editMode;
    }
    set editMode(value) {
        this._editMode = value;
    }
    get selesai() {
        return this._selesai;
    }
    set selesai(value) {
        this._selesai = value;
    }
}
