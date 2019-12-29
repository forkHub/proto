import { BaseComponent } from "../BaseComponent.js";
import { Game } from "../Game.js";
import { FeedbackEnum } from "../Feedback.js";
import { Bar } from "../Bar.js";
export class Puluhan extends BaseComponent {
    constructor() {
        super();
        this.puluhan = 0;
        this.satuan = 0;
        this.jumlah = 0;
        this.soalTotal = 10;
        this._soalTerjawab = 0;
        this.jmlBenar = 0;
        this.jumlahEl = null;
        this.puluhanEl = null;
        this.satuanEl = null;
        this.kirimBtn = null;
        this.barCont = null;
        this._template = `
			<div class='puluhan'>
				<div class='bar-cont'>
				</div>
				<p>Isilah kotak yang kosong dengan bilangan puluhan dan satuan</p>
				<hr />
				<br />
				<span class='jml'></span> =
				<input id="puluhan" type='number' placeholder="0" /> Puluhan +
				<input id="satuan" type='number' placeholder="0" /> Satuan
				<br />
				<br />
				<hr />
				<button class='normal kirim'>Kirim</button>
			</div>
		`;
        this.build();
        this.bar = new Bar();
    }
    detach() {
        super.detach();
        Game.inst.getStackTrace();
    }
    init() {
        console.log('init');
        this.jumlahEl = this.getEl('span.jml');
        this.puluhanEl = this.getEl('input#puluhan');
        this.satuanEl = this.getEl('input#satuan');
        this.barCont = this.getEl('div.bar-cont');
        this.kirimBtn = this.getEl('button.kirim');
        this.puluhanEl.tabIndex = 0;
        this.puluhanEl.autofocus = true;
        this.satuanEl.tabIndex = 1;
        this.bar.attach(this.barCont);
        this.bar.persen = 0;
        this.bar.onClick = () => {
            this.detach();
            Game.inst.menu.attach(Game.inst.cont);
        };
        this.resetSoal();
        this.kirimBtn.onclick = () => {
            this.kirimClick();
        };
    }
    feedbackOnClick() {
        Game.inst.feedback.detach();
        this._soalTerjawab++;
        this.bar.persen = Math.floor((this._soalTerjawab / 10) * 100);
        if (this._soalTerjawab >= this.soalTotal) {
            Game.inst.selesai.attach(Game.inst.cont);
            Game.inst.selesai.nilai = this.jmlBenar;
            Game.inst.selesai.onMulaiClick = () => {
                // this.detach();
                this.selesaiMulaiLagiClick();
            };
            Game.inst.selesai.onMenuClick = () => {
                // this.detach();
                this.selesaiMenuClick();
            };
        }
        else {
            this.resetSoal();
        }
    }
    selesaiMulaiLagiClick() {
        this._soalTerjawab = 0;
        this.bar.persen = 0;
        this.resetSoal();
    }
    selesaiMenuClick() {
        this.detach();
        Game.inst.menu.attach(Game.inst.cont);
    }
    kirimClick() {
        // console.log('kirim klik');
        if (this.checkBenar()) {
            // console.log('benar');
            this.jmlBenar++;
            this._soalTerjawab++;
            Game.inst.feedback.attach(Game.inst.cont);
            Game.inst.feedback.label = 'Jawaban Benar';
            Game.inst.feedback.type = FeedbackEnum.BENAR;
            Game.inst.feedback.onClick = () => {
                this.feedbackOnClick();
            };
        }
        else {
            // console.log('salah');
            this._soalTerjawab++;
            Game.inst.feedback.attach(Game.inst.cont);
            Game.inst.feedback.label = 'Jawaban Salah';
            Game.inst.feedback.type = FeedbackEnum.SALAH;
            Game.inst.feedback.onClick = () => {
                this.feedbackOnClick();
            };
        }
    }
    mulaiLagi() {
        this._soalTerjawab = 0;
        // this.jmlBenar = 0;
        // this.jmlSalah = 0;
        this.resetSoal();
    }
    ambilAngka2() {
        this.jumlah = Math.floor(Math.random() * 89) + 10;
        this.puluhan = Math.floor(this.jumlah / 10);
        this.satuan = this.jumlah % 10;
    }
    resetSoal() {
        this.ambilAngka2();
        this.jumlahEl.innerHTML = this.jumlah + '';
        this.satuanEl.value = '';
        this.puluhanEl.value = '';
        this.puluhanEl.focus();
    }
    checkBenar() {
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
    get soalTerjawab() {
        return this._soalTerjawab;
    }
    set soalTerjawab(value) {
        this._soalTerjawab = value;
    }
}
