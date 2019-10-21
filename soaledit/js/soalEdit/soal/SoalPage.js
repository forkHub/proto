import { SoalDB } from "./SoalDB.js";
import { Tombol } from "../Tombol.js";
import { List } from "./SoalList.js";
export class SoalPage {
    constructor(kanan, kiri) {
        this.db = new SoalDB();
        this.kanan = kanan;
        this.kiri = kiri;
        this.editTbl = new Tombol();
        this.editTbl.render(this.kanan);
        this.editTbl.label = 'edit soal';
        this.editTbl.hide();
        this.editTbl.onClick = () => {
            this.editTblClick();
        };
        this.hapusSoalTbl = new Tombol();
        this.hapusSoalTbl.render(this.kanan);
        this.hapusSoalTbl.label = 'hapus soal';
        this.hapusSoalTbl.hide();
        this.hapusSoalTbl.onClick = () => {
            this.hapusSoalClick();
        };
        this.soalBaruTbl = new Tombol();
        this.soalBaruTbl.label = 'buat soal baru';
        this.soalBaruTbl.render(kanan);
        this.soalBaruTbl.hide();
        this.soalBaruTbl.onClick = () => {
            this.soalBaruClick();
        };
        this.listView = new List(this.kiri, this.listOnClick);
    }
    render(data) {
        this.db.list = data;
        this.listView.redraw(data);
        this.soalBaruTbl.show();
    }
    listOnClick(item) {
        this.soalAktif = item.soal;
        console.group('item on click');
        console.log(item);
        console.log(this.soalAktif);
        console.groupEnd();
    }
    hapusSoalClick() {
    }
    soalListItemClick(soal) {
        this.soalAktif = soal;
        this.editTbl.show();
        this.hapusSoalTbl.show();
    }
    soalBaruClick() {
        console.log('soal baru click');
    }
    editTblClick() {
        console.log('edit tombol click');
        console.log('open edit soal perspectif');
    }
}
