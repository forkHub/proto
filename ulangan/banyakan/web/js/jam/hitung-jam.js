import { Jam } from "../Jam";
import { BaseSoal } from "../BaseSoal";
import { Angka } from "./Angka";
export class HitungJam extends BaseSoal {
    constructor() {
        super();
        this.jam = null;
        this.jawabans = [];
        this.acakJam = null;
        this.canvas = null;
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
        for (let i = 0; i < 3; i++) {
            let angka = new Angka();
            this.jawabans.push(angka);
        }
        this.canvas = this.getEl('canvas');
        this.jam = new Jam();
        this.jam.canvas = this.canvas;
    }
    reset() {
        super.reset();
        for (let i = 0; i < 3; i++) {
            let angka = this.jawabans[i];
            angka.acakJam(this.acakJam);
        }
    }
}
