export class Jam {
	private _canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private readonly sudut2rad: number = (Math.PI / 180);

	constructor() {
	}

	init(): void {
		this.ctx = this._canvas.getContext("2d");
		this.ctx.clearRect(0, 0, 240, 240);
		this.ctx.beginPath();
		this.ctx.arc(120, 120, 100, 0, 2 * Math.PI);
		this.ctx.stroke();

		this.gambarTitik();
	}

	gambar(jam: number, menit: number): void {
		if (menit > 15) jam += .5;
		if (menit >= 30) jam += .5;
		this.gambarJarum(jam, 50);
		this.gambarJarum(menit / 5, 70);
	}

	gambarJarum(jam: number, pjg: number): void {
		let dx: number;
		let dy: number;

		dx = pjg * Math.cos((jam * 30 - 90) * this.sudut2rad);
		dy = pjg * Math.sin((jam * 30 - 90) * this.sudut2rad);

		this.ctx.beginPath();
		this.ctx.moveTo(120, 120);
		this.ctx.lineWidth = 5;
		this.ctx.lineTo(120 + dx, 120 + dy);
		this.ctx.stroke();
	}

	gambarTitik(): void {
		let dx: number;
		let dy: number;
		for (let i: number = 0; i < 12; i++) {
			dx = 85 * Math.cos(i * this.sudut2rad * 30);
			dy = 85 * Math.sin(i * this.sudut2rad * 30);
			this.ctx.beginPath();
			this.ctx.arc(120 + dx, 120 + dy, 3, 0, 2 * Math.PI);
			this.ctx.stroke();
		}
	}

	public get canvas(): HTMLCanvasElement {
		return this._canvas;
	}
	public set canvas(value: HTMLCanvasElement) {
		this._canvas = value;
	}

}

// new Jam();