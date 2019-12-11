import { BaseComponent } from "../BaseComponent.js";
import { Game } from "../../Game.js";
import { FeedbackEnum } from "../Feedback.js";

export class Puluhan extends BaseComponent {
	private puluhan: number = 0;
	private satuan: number = 0;
	private jumlah: number = 0;

	// private max: number = 0;
	private soalTotal: number = 10;
	private _soalTerjawab: number = 0;
	private jmlBenar: number = 0;
	// private jmlSalah: number = 0;

	private jumlahEl: HTMLSpanElement = null;
	private puluhanEl: HTMLInputElement = null;
	private satuanEl: HTMLInputElement = null;
	private kirimBtn: HTMLButtonElement = null;

	constructor() {
		super();
		this._template = `
			<div class='puluhan'>
				<p>Isilah kotak yang kosong dengan bilangan puluhan dan satuan</p>
				<hr/>
				<br/>
				<span class='jml'></span> =
				<input id="puluhan" type='number' placeholder="0" /> Puluhan +
				<input id="satuan" type='number' placeholder="0" /> Satuan
				<br/>
				<br/>
				<hr />
				<button class='normal kirim'>Kirim</button>
			</div>
		`;
		this.build();
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

		this.kirimBtn = this.getEl('button.kirim') as HTMLButtonElement;

		console.log(this.jumlahEl);
		console.log(this.puluhanEl);
		console.log(this.satuanEl);

		this.resetSoal();

		this.kirimBtn.onclick = () => {
			this.kirimClick();
		}

	}

	feedbackOnClick(): void {
		Game.inst.feedback.detach();

		this._soalTerjawab++;
		if (this._soalTerjawab >= this.soalTotal) {
			Game.inst.selesai.attach();
			Game.inst.selesai.nilai = this.jmlBenar;
			Game.inst.selesai.onClick = () => {
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
		// console.log('mulai lagi click');
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

		// console.log('ambil angka 2');
		// console.log('puluhan ' + this.puluhan + '/satuan ' + this.satuan + '/jumlah ' + this.jumlah);
	}

	// ambilAngka(): void {
	// 	this.puluhan = (Math.floor(Math.random() * (this.max - 1)) + 1) * 10;
	// 	this.satuan = Math.floor(Math.random() * this.max);
	// 	this.jumlah = this.puluhan + this.satuan;

	// 	console.log('reset');
	// 	console.log('puluhan ' + this.puluhan + '/satuan ' + this.satuan + '/jumlah ' + this.jumlah);
	// }

	resetSoal() {
		this.ambilAngka2();
		this.jumlahEl.innerHTML = this.jumlah + '';
		this.satuanEl.value = '0';
		this.puluhanEl.value = '0';
	}

	checkBenar(): boolean {

		if (this.puluhanEl.value == '') return false;
		if (this.satuanEl.value == '') return false;

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
