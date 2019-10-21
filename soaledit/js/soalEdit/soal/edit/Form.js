import { BaseComponent } from "../../ha/BaseComponent.js";
import { SoalEdit } from "../../SoalEdit.js";
export class Form extends BaseComponent {
    constructor() {
        super();
        this._soalAktif = null;
        this._backupSoal = null;
        this._catDb = null;
        this.teksEl = null;
        this.jawab1 = null;
        this.jawab2 = null;
        this.jawab3 = null;
        this.jawab4 = null;
        this.jawabBenar = null;
        this.setTemplate();
    }
    init() {
        this._catDb = SoalEdit.inst.category.db;
        this._backupSoal = this._catDb.defaultSoal();
        this.build();
        this.setEl();
        this.setListener();
    }
    mulai() {
        this._soalAktif = SoalEdit.inst.soal.daftar.listView.itemAktif.soal;
        this.backupSoal();
        this.soal2Html();
    }
    backupSoal() {
        this._backupSoal.soal = this._soalAktif.soal;
        for (let i = 0; i < this._soalAktif.jawaban.length; i++) {
            this._backupSoal.jawaban[i] = this._soalAktif.jawaban[i];
        }
        this._backupSoal.jawabanBenar = this._soalAktif.jawabanBenar;
        this._backupSoal.score = this._soalAktif.score;
    }
    revert() {
        console.log(this._backupSoal);
        this._soalAktif.soal = this._backupSoal.soal;
        for (let i = 0; i < this._backupSoal.jawaban.length; i++) {
            this._soalAktif.jawaban[i] = this._backupSoal.jawaban[i];
        }
        this._soalAktif.jawabanBenar = this._backupSoal.jawabanBenar;
        this._soalAktif.score = this._backupSoal.score;
        // this._soalAktif.soal = this._backupSoal.soal;
        this.soal2Html();
    }
    setTemplate() {
        this._template = `
			<div class='form-soal-baru'>
				<p>Teks Soal:</p>
				<textarea class='teks' rows='10'></textarea><br/>
				<p>Jawaban:</p>
				<input type="text" class='jawab1'/><br/><br/>
				<input type="text" class='jawab2'/><br/><br/>
				<input type="text" class='jawab3'/><br/><br/>
				<input type="text" class='jawab4'/><br/><br/>
				<p>Jawaban Benar:</p>
				<input class="jawab-benar" type="number" min="1" max="4">
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
        this.teksEl.onchange = this.html2Soal.bind(this);
        this.jawab1.onchange = this.html2Soal.bind(this);
        this.jawab2.onchange = this.html2Soal.bind(this);
        this.jawab3.onchange = this.html2Soal.bind(this);
        this.jawab4.onchange = this.html2Soal.bind(this);
        this.jawabBenar.onchange = this.html2Soal.bind(this);
    }
    validateJawabanBenar(n) {
        if (n < 1)
            return 1;
        if (n > 4)
            return 4;
        if (!n)
            return 1;
        return n;
    }
    html2Soal() {
        this._soalAktif.soal = this.teksEl.value;
        this._soalAktif.jawaban[0] = this.jawab1.value;
        this._soalAktif.jawaban[1] = this.jawab2.value;
        this._soalAktif.jawaban[2] = this.jawab3.value;
        this._soalAktif.jawaban[3] = this.jawab4.value;
        this._soalAktif.jawabanBenar = this.validateJawabanBenar(parseInt(this.jawabBenar.value));
        this.soal2Html();
        SoalEdit.inst.statusEdit = true;
    }
    soal2Html() {
        this.teksEl.value = this._soalAktif.soal;
        this.jawab1.value = this._soalAktif.jawaban[0];
        this.jawab2.value = this._soalAktif.jawaban[1];
        this.jawab3.value = this._soalAktif.jawaban[2];
        this.jawab4.value = this._soalAktif.jawaban[3];
        this.jawabBenar.value = this._soalAktif.jawabanBenar + '';
    }
}
