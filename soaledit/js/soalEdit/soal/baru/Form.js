import { BaseComponent } from "../../../ha/BaseComponent.js";
export class Form extends BaseComponent {
    constructor() {
        super();
        this._soal = null;
        this._backupSoal = null;
        this._soalDB = null;
        this.teksEl = null;
        this.jawab1 = null;
        this.jawab2 = null;
        this.jawab3 = null;
        this.jawab4 = null;
        this.jawabBenar = null;
        this._backupSoal = this._soalDB.createDefault();
        this.setTemplate();
        this.build();
        this.setEl();
        this.setListener();
    }
    backupSoal() {
        this._backupSoal.soal = this.soal.soal;
        for (let i = 0; i < this.soal.jawaban.length; i++) {
            this._backupSoal.jawaban[i] = this.soal.jawaban[i];
        }
        this._backupSoal.jawabanBenar = this.soal.jawabanBenar;
        this._backupSoal.score = this.soal.score;
    }
    revert() {
        console.log(this._backupSoal);
    }
    setTemplate() {
        this._template = `
			<div class='form-soal-baru'>
				<textarea class='teks'></textarea><br/>
				<input type="text" class='jawab1'/><br/>
				<input type="text" class='jawab2'/><br/>
				<input type="text" class='jawab3'/><br/>
				<input type="text" class='jawab4'/><br/>
				<input type='text' class='jawab-benar'/><br/>
			</div>`;
    }
    setEl() {
        this.teksEl = this.getEl('textarea.teks');
        this.jawab1 = this.getEl('input.jawab1');
        this.jawab2 = this.getEl('input.jawab2');
        this.jawab3 = this.getEl('input.jawab3');
        this.jawab4 = this.getEl('input.jawab4');
        this.jawabBenar = this.getEl('input.jawab-benar');
    }
    setListener() {
        this.teksEl.onchange = this.update.bind(this);
        this.jawab1.onchange = this.update.bind(this);
        this.jawab2.onchange = this.update.bind(this);
        this.jawab3.onchange = this.update.bind(this);
        this.jawab4.onchange = this.update.bind(this);
        this.jawabBenar.onchange = this.update.bind(this);
    }
    update() {
        this._soal.soal = this.teksEl.innerHTML;
        this._soal.jawaban[0] = this.jawab1.value;
        this._soal.jawaban[1] = this.jawab2.value;
        this._soal.jawaban[2] = this.jawab3.value;
        this._soal.jawaban[3] = this.jawab4.value;
        this._soal.jawabanBenar = parseInt(this.jawabBenar.value);
    }
    set soal(value) {
        this._soal = value;
        this.teksEl.innerHTML = this._soal.soal;
        this.jawab1.value = this._soal.jawaban[0];
        this.jawab2.value = this._soal.jawaban[1];
        this.jawab3.value = this._soal.jawaban[2];
        this.jawab4.value = this._soal.jawaban[3];
        this.jawabBenar.value = this._soal.jawabanBenar + '';
        this.backupSoal();
    }
    set soalDB(value) {
        this._soalDB = value;
    }
}
