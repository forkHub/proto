// import { BaseComponent } from "../BaseComponent.js";
// import { Game } from "../Game.js";
// import { FeedbackEnum } from "../Feedback.js";
// import { Bar } from "../Bar.js";
import { BaseSoal } from "../BaseSoal.js";
export class Puluhan extends BaseSoal {
    constructor() {
        super();
        this.puluhan = 0;
        this.satuan = 0;
        this.jumlah = 0;
        // private soalTotal: number = 10;
        // private _soalTerjawab: number = 0;
        // private jmlBenar: number = 0;
        this.jumlahEl = null;
        this.puluhanEl = null;
        this.satuanEl = null;
        this._template = `
			<div class='puluhan'>
				<div class='bar-cont'></div>
				<p>Isilah kotak yang kosong dengan bilangan puluhan dan satuan</p>
				<hr />
				<br />
				<span class='jml'></span> =
				<input id="puluhan" type='number' placeholder="0" /> Puluhan +
				<input id="satuan" type='number' placeholder="0" /> Satuan
				<br />
				<br />
				<hr />
				<div class='kirim-cont'>
					<button class='normal kirim'>Kirim</button>
				</div>
			</div>
		`;
        this.build();
    }
    jawabanBenar() {
        return this.puluhan + " puluhan  " + this.satuan + " satuan";
    }
    init() {
        console.log('init');
        super.init();
        this.jumlahEl = this.getEl('span.jml');
        this.puluhanEl = this.getEl('input#puluhan');
        this.satuanEl = this.getEl('input#satuan');
        this.puluhanEl.tabIndex = 0;
        // this.puluhanEl.autofocus = true;
        this.satuanEl.tabIndex = 1;
        // this.resetSoal();
        // this.kirimBtn.onclick = () => {
        // 	this.kirimClick();
        // }
    }
    //TODO: refactor masukin ke base class
    // feedbackOnClick(): void {
    // 	Game.inst.feedback.detach();
    // 	this._soalTerjawab++;
    // 	this.bar.persen = Math.floor((this._soalTerjawab / 10) * 100);
    // 	if (this._soalTerjawab >= this.soalTotal) {
    // 		Game.inst.selesai.attach(Game.inst.cont);
    // 		Game.inst.selesai.nilai = this.jmlBenar;
    // 		Game.inst.selesai.onMulaiClick = () => {
    // 			this.selesaiMulaiLagiClick();
    // 		}
    // 		Game.inst.selesai.onMenuClick = () => {
    // 			this.selesaiMenuClick();
    // 		}
    // 	}
    // 	else {
    // 		this.resetSoal();
    // 	}
    // }
    // selesaiMulaiLagiClick(): void {
    // 	this._soalTerjawab = 0;
    // 	this.bar.persen = 0;
    // 	this.resetSoal();
    // }
    // selesaiMenuClick(): void {
    // 	this.detach();
    // 	Game.inst.selesai.detach();
    // 	Game.inst.menu.attach(Game.inst.cont);
    // }
    // kirimClick(): void {
    // 	if (this.checkBenar()) {
    // 		this.jmlBenar++;
    // 		this._soalTerjawab++;
    // 		Game.inst.feedback.attach(Game.inst.cont);
    // 		Game.inst.feedback.label = 'Jawaban Benar';
    // 		Game.inst.feedback.type = FeedbackEnum.BENAR;
    // 		Game.inst.feedback.onClick = () => {
    // 			this.feedbackOnClick();
    // 		}
    // 	}
    // 	else {
    // 		this._soalTerjawab++;
    // 		Game.inst.feedback.attach(Game.inst.cont);
    // 		Game.inst.feedback.label = 'Jawaban Salah';
    // 		Game.inst.feedback.type = FeedbackEnum.SALAH;
    // 		Game.inst.feedback.onClick = () => {
    // 			this.feedbackOnClick();
    // 		}
    // 	}
    // }
    // mulaiLagi(): void {
    // 	this._soalTerjawab = 0;
    // 	this.resetSoal();
    // }
    ambilAngka() {
        this.jumlah = Math.floor(Math.random() * 89) + 10;
        this.puluhan = Math.floor(this.jumlah / 10);
        this.satuan = this.jumlah % 10;
    }
    reset() {
        super.reset();
        this.ambilAngka();
        this.jumlahEl.innerHTML = this.jumlah + '';
        this.satuanEl.value = '';
        this.puluhanEl.value = '';
        this.puluhanEl.focus();
        // console.log('reset');
    }
    check() {
        if (this.puluhanEl.value == '')
            this.puluhanEl.value = '0';
        if (this.satuanEl.value == '')
            this.satuanEl.value = '0';
        if (parseInt(this.puluhanEl.value) != this.puluhan)
            return false;
        if (parseInt(this.satuanEl.value) != this.satuan)
            return false;
        return true;
    }
}
