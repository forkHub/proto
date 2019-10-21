import { Tombol } from "../../Tombol.js";
import { ListSoal } from "./ListSoal.js";
import { SoalEdit } from "../../SoalEdit.js";
export class DaftarSoalPage {
    constructor(kanan, kiri) {
        this._db = null;
        this._listView = null;
        this.editTbl = null;
        this.soalBaruTbl = null;
        this.hapusSoalTbl = null;
        this.kembaliTbl = null;
        this.kanan = null;
        this.kiri = null;
        this.kanan = kanan;
        this.kiri = kiri;
        this.editTbl = new Tombol();
        this.hapusSoalTbl = new Tombol();
        this.soalBaruTbl = new Tombol();
        this.kembaliTbl = new Tombol();
        this._listView = new ListSoal(this.kiri);
    }
    init() {
        this._db = SoalEdit.inst.soal.db;
        this.kembaliTbl.build();
        this.kembaliTbl.label = 'Kembali';
        this.editTbl.build();
        this.editTbl.label = 'Edit soal';
        this.editTbl.onClick = () => {
            this.editTblClick();
        };
        this.hapusSoalTbl.build();
        this.hapusSoalTbl.label = 'Hapus soal';
        this.hapusSoalTbl.onClick = () => {
            this.hapusSoalClick();
        };
        this.soalBaruTbl.label = 'Buat soal baru';
        this.soalBaruTbl.build();
        // this.soalBaruTbl.attach(this.kanan);
        this.soalBaruTbl.onClick = () => {
            this.soalBaruClick();
        };
        this.kembaliTbl.label = 'Kembali';
        this.kembaliTbl.build();
        this.kembaliTbl.onClick = () => {
            this.kembaliClick();
        };
    }
    kembaliClick() {
        let cat = SoalEdit.inst.category;
        this.detach();
        cat.attach();
    }
    onSoalSelected() {
        console.log('on soal selected');
        this.hapusSoalTbl.attach(this.kanan);
        this.editTbl.attach(this.kanan);
        this.kembaliTbl.attach(this.kanan);
    }
    attach() {
        this.soalBaruTbl.attach(this.kanan);
        this.kembaliTbl.attach(this.kanan);
        this._listView.update();
    }
    update() {
        this._listView.update();
    }
    hapusSoalClick() {
        console.log('hapus soal click');
        this._db.hapus(this._listView.itemAktif.soal);
        this._listView.update();
        this.soalBaruTbl.attach(this.kanan);
        this.hapusSoalTbl.detach();
        this.kembaliTbl.attach(this.kanan);
        this.editTbl.detach();
    }
    soalBaruClick() {
        console.log('soal baru click');
        this._db.insert(this._db.createDefault());
        this._listView.update();
        this.editTbl.detach();
        this.hapusSoalTbl.detach();
    }
    detach() {
        this._listView.clearView();
        this.editTbl.detach();
        this.kembaliTbl.detach();
        this.soalBaruTbl.detach();
        this.hapusSoalTbl.detach();
    }
    editTblClick() {
        let editSoalPage = SoalEdit.inst.soal.edit;
        console.log('edit tombol click');
        console.log('open edit soal perspectif');
        this.detach();
        editSoalPage.editSoal();
    }
    get listView() {
        return this._listView;
    }
}
