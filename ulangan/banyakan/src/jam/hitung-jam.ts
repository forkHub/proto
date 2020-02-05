import { Jam } from "../Jam";
import { BaseSoal } from "../BaseSoal";
import { Angka } from "./Angka";
import { Acak } from "../Acak";

export class HitungJam extends BaseSoal {
	private jam: Jam = null;
	private jawabans: Array<Angka> = [];
	private acakJam: Acak = null;
	private canvas: HTMLCanvasElement = null;

	constructor() {
		super();
		this._template = `
			<div class='jumlah-benda'>
				<div class='bar-cont'></div>
				<p class='judul-soal'>Jam berapa sekarang</p> 
				<canvas class='canvas' width='240' height='240'></canvas>
				<div class='jawaban'>
				</div>
			</div>
		`;
		this.build();

		for (let i: number = 0; i < 3; i++) {
			let angka: Angka = new Angka();
			this.jawabans.push(angka);
		}

		this.canvas = this.getEl('canvas') as HTMLCanvasElement;
		this.jam = new Jam();
		this.jam.canvas = this.canvas;
	}

	reset(): void {
		super.reset();

		for (let i: number = 0; i < 3; i++) {
			let angka: Angka = this.jawabans[i];
			angka.acakJam(this.acakJam);
		}
	}
}