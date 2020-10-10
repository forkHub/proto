"use strict";
class FormBarangView extends BaseComponent {
    init() {
        this._elHtml = this.getTemplate('div.form');
    }
    get form() {
        return this.getEl('form');
    }
    get namaInput() {
        return this.getEl('form input#nama-barang');
    }
    get deskripsiPanjangInput() {
        return this.getEl('form textarea#deskripsi-barang-panjang');
    }
    get hargaBarangInput() {
        return this.getEl('form input#harga-barang');
    }
    get wa() {
        return this.getEl('form input#wa');
    }
    get submitTbl() {
        return this.getEl('button.submit');
    }
    get draftTbl() {
        return this.getEl('button.draft');
    }
    get inputFileId() {
        return this.getEl('input[type="hidden"].file_id');
    }
    get fotoCont() {
        return this.getEl('div.foto-cont');
    }
    get editFotoTbl() {
        return this.getEl('button.edit-foto');
    }
    get gambarHtml() {
        return this.getEl('img.foto');
    }
    get postIdInput() {
        return this.getEl('input[type="hidden"].post_id');
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
}
