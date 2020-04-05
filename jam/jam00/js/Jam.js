"use strict";
class Jam {
    constructor() {
        this._canvas = null;
        this.ctx = null;
        this.sudut2rad = (Math.PI / 180);
    }
    gambar(jam, menit) {
        if (menit > 15)
            jam += .5;
        if (menit >= 30)
            jam += .5;
        //dapatkan context
        this.ctx = this._canvas.getContext("2d");
        //bersihkan canvas
        this.ctx.clearRect(0, 0, 240, 240);
        //gambar lingkaran
        this.ctx.beginPath();
        this.ctx.arc(120, 120, 100, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.gambarTitik();
        this.gambarJarum(jam, 50);
        this.gambarJarum(menit / 5, 70);
    }
    /**
     * gambar jarum
     * @param jam jam berapa
     * @param pjg panjang garis
     */
    gambarJarum(jam, pjg) {
        let dx;
        let dy;
        dx = pjg * Math.cos((jam * 30 - 90) * this.sudut2rad);
        dy = pjg * Math.sin((jam * 30 - 90) * this.sudut2rad);
        this.ctx.beginPath();
        this.ctx.moveTo(120, 120);
        this.ctx.lineWidth = 5;
        this.ctx.lineTo(120 + dx, 120 + dy);
        this.ctx.stroke();
    }
    /**
     * 	gambar titik-titik di pinggir
     */
    gambarTitik() {
        let dx;
        let dy;
        for (let i = 0; i < 12; i++) {
            dx = 85 * Math.cos(i * this.sudut2rad * 30);
            dy = 85 * Math.sin(i * this.sudut2rad * 30);
            this.ctx.beginPath();
            this.ctx.arc(120 + dx, 120 + dy, 3, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }
    get canvas() {
        return this._canvas;
    }
    set canvas(value) {
        this._canvas = value;
    }
}
window.onload = () => {
    let canvas = document.body.querySelector('canvas');
    let jam = new Jam();
    jam.canvas = canvas;
    jam.gambar(9, 33);
};
