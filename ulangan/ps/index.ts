var puluhan: number = 0;
var satuan: number = 0;
var jumlah: number = 0;
var max: number = 0;
var jumlahEl: HTMLSpanElement = null;
var puluhanEl: HTMLInputElement = null;
var satuanEl: HTMLInputElement = null;
var kirimBtn: HTMLButtonElement = null;
var benarBtn: HTMLButtonElement = null;
var salahBtn: HTMLButtonElement = null;
var feedbackBenar: HTMLDivElement = null;
var feedbackSalah: HTMLDivElement = null;
var soal: number = 0;
var max: number = 10;

window.onload = () => {
	init();
}

function init(): void {
	jumlahEl = document.querySelector('div.cont span.jml') as HTMLSpanElement;
	puluhanEl = document.querySelector('div.cont input#puluhan') as HTMLInputElement;
	satuanEl = document.querySelector('div.cont input#satuan') as HTMLInputElement;

	kirimBtn = document.querySelector('div.cont button.kirim') as HTMLButtonElement;

	benarBtn = document.querySelector('div.feedback.benar button') as HTMLButtonElement;
	salahBtn = document.querySelector('div.feedback.salah button') as HTMLButtonElement;

	feedbackBenar = document.querySelector('div.feedback.benar') as HTMLDivElement;
	feedbackSalah = document.querySelector('div.feedback.salah') as HTMLDivElement;

	console.log(jumlahEl);
	console.log(puluhanEl);
	console.log(satuanEl);

	reset();

	kirimBtn.onclick = () => {
		console.log('kirim klik');

		if (checkBenar()) {
			console.log('benar');
			feedbackBenar.style.display = 'block';
		}
		else {
			console.log('salah');
			feedbackSalah.style.display = 'block';
		}
	}

}

function reset() {
	puluhan = (Math.floor(Math.random() * (max - 1)) + 1) * 10;
	satuan = Math.floor(Math.random() * max);
	jumlah = puluhan + satuan;

	console.log('reset');
	console.log('puluhan ' + puluhan + '/satuan ' + satuan + '/jumlah ' + jumlah);

	jumlahEl.textContent = jumlah + '';

	feedbackHide();
}

function feedbackHide(): void {
	console.log('feedback hide');

	feedbackBenar.style.display = 'none';
	feedbackSalah.style.display = 'none';
}

function checkBenar(): boolean {

	if (puluhanEl.value == '') return false;
	if (satuanEl.value == '') return false;

	if (parseInt(puluhanEl.value) != puluhan) return false;
	if (parseInt(satuanEl.value) != satuan) return false;

	return true;
}