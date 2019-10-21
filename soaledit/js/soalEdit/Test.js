import { SoalEdit } from "./SoalEdit.js";
export class Test {
    constructor() {
        this.category = SoalEdit.inst.category;
        this.edit = SoalEdit.inst;
        this.soal = SoalEdit.inst.soal;
    }
    init() {
        this.category = SoalEdit.inst.category;
        this.edit = SoalEdit.inst;
        this.soal = SoalEdit.inst.soal;
    }
    testDialog() {
        this.edit.dialog.contentEl.innerText = 'Test Dialog';
        this.edit.dialog.setAsYN();
        this.edit.dialog.show();
        this.edit.dialog.batalBtn.onclick = (e) => {
            e.stopPropagation();
            this.edit.dialog.detach();
        };
        this.edit.dialog.okBtn.onclick = (e) => {
            e.stopPropagation();
            this.edit.dialog.detach();
        };
        // this.edit.dialog.tutupBtn.onclick = () => {
        // 	this.edit.dialog.detach();
        // }
    }
    test() {
        this.category.catBuatClick();
        this.category.categorySelected(this.category.listView.list[0]);
        this.category.lihatSoalClick();
        this.soal.daftar.listView.selectItem(this.soal.daftar.listView.listItemView[0]);
        this.soal.daftar.editTblClick();
    }
    testEditCategori() {
        //edit category
        this.category.catBuatClick();
        this.category.editNamaTombolClick();
    }
    testSimpan() {
        this.category.catBuatClick();
        this.category.catBuatClick();
        this.category.categorySelected(this.category.listView.list[0]);
        this.category.lihatSoalClick();
        this.soal.daftar.soalBaruClick();
        this.soal.daftar.soalBaruClick();
        this.edit.simpan();
        this.edit.load();
    }
}
