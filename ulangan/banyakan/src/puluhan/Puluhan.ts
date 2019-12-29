import { BaseComponent } from "../BaseComponent.js";
import { Game } from "../Game.js";
import { FeedbackEnum } from "../Feedback.js";
import { Bar } from "../Bar.js";

export class Puluhan extends BaseComponent {
	private puluhan: number = 0;
	private satuan: number = 0;
	private jumlah: number = 0;

	private soalTotal: number = 10;
	private _soalTerjawab: number = 0;
	private jmlBenar: number = 0;

	private jumlahEl: HTMLSpanElement = null;
	private puluhanEl: HTMLInputElement = null;
	private satuanEl: HTMLInputElement = null;
	private kirimBtn: HTMLButtonElement = null;
	private barCont: HTMLDivElement = null;
	private bar: Bar;

	constructor() {
		super();
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

	init(): void {
		console.log('init');

		this.jumlahEl = this.getEl('span.jml') as HTMLSpanElement;
		this.puluhanEl = this.getEl('input#puluhan') as HTMLInputElement;
		this.satuanEl = this.getEl('input#satuan') as HTMLInputElement;
		this.barCont = this.getEl('div.bar-cont') as HTMLDivElement;

		this.kirimBtn = this.getEl('button.kirim') as HTMLButtonElement;

		this.puluhanEl.tabIndex = 0;
		this.puluhanEl.autofocus = true;
		this.satuanEl.tabIndex = 1;

		this.bar.attach(this.barCont);
		this.bar.persen = 0;
		this.bar.onClick = () => {
			this.detach();
			Game.inst.menu.attach(Game.inst.cont);
		}

		this.resetSoal();

		this.kirimBtn.onclick = () => {
			this.kirimClick();
		}

	}

	feedbackOnClick(): void {
		Game.inst.feedback.detach();

		this._soalTerjawab++;
		this.bar.persen = Math.floor((this._soalTerjawab / 10) * 100);

		if (this._soalTerjawab >= this.soalTotal) {
			Game.inst.selesai.attach(Game.inst.cont);
			Game.inst.selesai.nilai = this.jmlBenar;
			Game.inst.selesai.onMulaiClick = () => {
				// this.detach();
				this.selesaiMulaiLagiClick();
			}

			Game.inst.selesai.onMenuClick = () => {
				// this.detach();
				this.selesaiMenuClick();
			}
		}
		else {
			this.resetSoal();
		}
	}

	selesaiMulaiLagiClick(): void {
		this._soalTerjawab = 0;
		this.bar.persen = 0;
		this.resetSoal();
	}

	selesaiMenuClick(): void {
		this.detach();
		Game.inst.menu.attach(Game.inst.cont);
	}

	kirimClick(): void {
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
			}
		}
		else {
			// console.log('salah');
			this._soalTerjawab++;

			Game.inst.feedback.attach(Game.inst.cont);
			Game.inst.feedback.label = 'Jawaban Salah';
			Game.inst.feedback.type = FeedbackEnum.SALAH;
			Game.inst.feedback.onClick = () => {
				this.feedbackOnClick();
			}
		}
	}

	mulaiLagi(): void {
		this._soalTerjawab = 0;
		// this.jmlBenar = 0;
		// this.jmlSalah = 0;
		this.resetSoal();
	}

	ambilAngka2(): void {
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

	checkBenar(): boolean {

		if (this.puluhanEl.value == '') this.puluhanEl.value = '0';
		if (this.satuanEl.value == '') this.satuanEl.value = '0';

		if (parseInt(this.puluhanEl.value) != this.puluhan) return false;
		if (parseInt(this.satuanEl.value) != this.satuan) return false;

		return true;
	}

	public get soalTerjawab(): number {
		return this._soalTerjawab;
	}
	public set soalTerjawab(value: number) {
		this._soalTerjawab = value;
	}

}
