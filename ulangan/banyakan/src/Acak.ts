
export class Acak {
	private idx: number = 0;
	private angkas: Array<number> = [];
	private _max: number = 0;
	private _offset: number = 0;

	constructor(max: number) {
		this._max = max;
		this.resetArray();
		this.acak();
	}

	get2(kecuali: Array<number>): number {
		let res: number = 0;
		let ketemu: boolean = false;

		while (true) {
			res = this.get();

			ketemu = true;
			for (let i: number = 0; i < kecuali.length; i++) {
				if (kecuali[i] == res) ketemu = false;
			}

			if (ketemu) return res;
		}
	}

	test(): void {
		this._max = 10;
		for (let i: number = 0; i < 100; i++) {
			let res: number = this.get();
			if (res >= 10) throw new Error();
		}

		this.max = 1;
		for (let i: number = 0; i < 1000; i++) {
			let res: number = this.get();
			if (res >= 1) throw new Error(res + '');
		}

		//TODO:test acak kecuali

	}

	get(): number {
		this.idx++;
		if (this.idx >= this.angkas.length - 1) {
			this.acak();
			this.idx = 0;
			// console.log('reset');
		}

		return this.angkas[this.idx];
	}

	acak(): void {
		let i: number = 0;
		let ax: number = 0;
		let bx: number = 0;
		let max: number = 0;
		let c: number = 0;

		max = this._max * 10;

		for (i = 0; i < max; i++) {
			ax = Math.floor(Math.random() * this._max);
			bx = Math.floor(Math.random() * this._max);

			c = this.angkas[ax];
			this.angkas[ax] = this.angkas[bx];
			this.angkas[bx] = c;
		}
	}

	resetArray(): void {
		this.angkas = [];
		for (let i = 0; i < this._max; i++) {
			this.angkas.push(i);
		}
	}

	public get max(): number {
		return this._max;
	}

	public set max(value: number) {
		this._max = value;
		this.resetArray();
		this.acak();
	}
	public get offset(): number {
		return this._offset;
	}
	public set offset(value: number) {
		this._offset = value;
	}

}
