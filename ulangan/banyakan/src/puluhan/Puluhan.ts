import { BaseComponent } from "../BaseComponent";

export class Puluhan extends BaseComponent {
	private puluhan: number = 0;
	private satuan: number = 0;
	private jumlah: number = 0;
	private max: number = 0;
	private jumlahEl: HTMLSpanElement = null;
	private puluhanEl: HTMLInputElement = null;
	private satuanEl: HTMLInputElement = null;
	private kirimBtn: HTMLButtonElement = null;
	private feedbackBenar: HTMLDivElement = null;
	private feedbackSalah: HTMLDivElement = null;

	constructor() {
		super();
		this._template = `
			<div class='puluhan'>
				<span class='jml'></span> =
				<input id="puluhan" type='number' placeholder="0" /> +
				<input id="satuan" type='number' placeholder="0" />
				<hr />
				<button class='normal kirim'>Kirim</button>
			</div>
		`;
		this.build();
	}

	init(): void {
		console.log('init');

		this.jumlahEl = document.querySelector('div.cont span.jml') as HTMLSpanElement;
		this.puluhanEl = document.querySelector('div.cont input#puluhan') as HTMLInputElement;
		this.satuanEl = document.querySelector('div.cont input#satuan') as HTMLInputElement;

		this.kirimBtn = document.querySelector('div.cont button.kirim') as HTMLButtonElement;

		this.feedbackBenar = document.querySelector('div.feedback.benar') as HTMLDivElement;
		this.feedbackSalah = document.querySelector('div.feedback.salah') as HTMLDivElement;

		console.log(this.jumlahEl);
		console.log(this.puluhanEl);
		console.log(this.satuanEl);

		this.resetSoal();

		this.kirimBtn.onclick = () => {
			console.log('kirim klik');

			if (this.checkBenar()) {
				console.log('benar');
				this.feedbackBenar.style.display = 'block';
			}
			else {
				console.log('salah');
				this.feedbackSalah.style.display = 'block';
			}
		}

	}

	ambilAngka(): void {
		this.puluhan = (Math.floor(Math.random() * (this.max - 1)) + 1) * 10;
		this.satuan = Math.floor(Math.random() * this.max);
		this.jumlah = this.puluhan + this.satuan;

		console.log('reset');
		console.log('puluhan ' + this.puluhan + '/satuan ' + this.satuan + '/jumlah ' + this.jumlah);
	}

	resetSoal() {
		this.ambilAngka();
		this.jumlahEl.innerHTML = this.jumlah + '';

		this.feedbackHide();
	}

	feedbackHide(): void {
		console.log('feedback hide');

		this.feedbackBenar.style.display = 'none';
		this.feedbackSalah.style.display = 'none';
	}

	checkBenar(): boolean {

		if (this.puluhanEl.value == '') return false;
		if (this.satuanEl.value == '') return false;

		if (parseInt(this.puluhanEl.value) != this.puluhan) return false;
		if (parseInt(this.satuanEl.value) != this.satuan) return false;

		return true;
	}
}
