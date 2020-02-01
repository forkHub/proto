import { BaseComponent } from "./BaseComponent.js";
import { Bar } from "./Bar.js";
import { Feedback, FeedbackEnum } from "./Feedback.js";
import { Selesai } from "./Selesai.js";
import { Game } from "./Game.js";
// import { Game } from "./Game.js";

export class BaseSoal extends BaseComponent implements IBaseSoal {
	protected jmlSoal: number = 10;			//jumlah soal satu sesi
	protected soalIdx: number = 0;			//soal aktif sekarang
	protected _nilai: number = 0;			//nilai
	protected gambar: boolean = true;		//pakai gambar
	protected angkaMulai: number = 1;		//angka minimum untuk soal
	protected angkaMax: number = 10;		//angka maximum untuk soal
	protected jmlKotak: number = 3;			//jumlah kotak untuk pilihan jawaban

	protected _cont: HTMLDivElement = null;
	protected onSelesai: Function = null;
	protected query: Array<Query> = [];
	protected bar: Bar = null;
	protected _feedback: Feedback = null;
	protected selesai: Selesai = null;
	protected barCont: HTMLDivElement = null	//container bar, TODO: propagate

	constructor() {
		super();
		this.selesai = new Selesai();
		this._feedback = new Feedback();
		this.bar = new Bar();
	}

	getUrl(): void {
		let url: string = window.location.search.slice(1);
		let kv: Array<string> = [];
		let kv2: Array<string> = [];

		console.log('url ' + url);

		if (url && url.length > 0) {
			kv = url.split('&');

			console.log('kv');
			console.log(kv);

			if (kv && kv.length > 0) {
				for (let i: number = 0; i < kv.length; i++) {
					kv2 = kv[i].split('=');

					console.log('kv[i]');
					console.log(kv[i]);
					console.log('kv2');
					console.log(kv2);
					console.log('');

					if (2 == kv2.length) {
						this.query.push(new Query(kv2[0], kv2[1]));
					}
				}
			}
		}
	}

	init(): void {
		this.barCont = this.getEl('div.bar-cont') as HTMLDivElement;
		this.bar.attach(this.barCont);
		this.bar.onClick = () => {
			this.detach();
			Game.inst.menu.attach(Game.inst.cont);
		}

		this.selesai.init();
		this.selesai.onMulaiClick = () => {
			this.mulai();
		}

		this.selesai.onMenuClick = () => {
			this.detach();
			Game.inst.menu.attach(Game.inst.cont);
		}

		this._feedback.init();
	}

	setConfig(config: IConfig): void {
		if (config.angkaMulai) {
			this.angkaMulai = config.angkaMulai;
		}

		if (config.gambar) {
			this.gambar = config.gambar;
		}

		if (config.jmlAngka) {
			this.jmlKotak = config.jmlAngka;
		}
	}

	reset(): void {

	}

	mulai(): void {
		this.nilai = 0;
		this.soalIdx = 0;
		this.bar.persen = 0;
		this.reset();
	}

	check(): boolean {
		return true;
	}

	userJawab(): void {
		this.soalIdx++;
		this.bar.persen2(this.soalIdx, this.jmlSoal);
		if (this.check()) {
			this.nilai++;
			this.feedbackBenarShow(Game.inst.cont);
		}
		else {
			this.feedbackSalahShow(Game.inst.cont);
		}
	}

	feedbackClick(cont: HTMLDivElement): void {
		console.log('feedback click, nilai ' + this.nilai);
		this._feedback.detach();

		if (this.soalIdx >= this.jmlSoal) {
			this.selesai.attach(cont);
			this.selesai.nilai = this.nilai;
		}
		else {
			this.reset();
		}
	}

	feedbackSalahShow(cont: HTMLDivElement): void {
		this._feedback.attach(cont);
		this._feedback.label = "Jawaban Salah";
		this._feedback.type = FeedbackEnum.SALAH;
		this._feedback.onClick = () => {
			this.feedbackClick(cont);
		}
	}

	feedbackBenarShow(cont: HTMLDivElement): void {
		this._feedback.attach(cont);
		this._feedback.label = 'Jawaban Benar';
		this._feedback.type = FeedbackEnum.BENAR;
		this._feedback.onClick = () => {
			this.feedbackClick(cont);
		}
	}

	public get cont(): HTMLDivElement {
		return this._cont;
	}
	public set cont(value: HTMLDivElement) {
		this._cont = value;
	}

	protected get nilai(): number {
		return this._nilai;
	}
	protected set nilai(value: number) {
		this._nilai = value;
		// try {
		// 	throw new Error();
		// }
		// catch (e) {
		// 	console.log(e.getStackTrace());
		// }
	}

}

interface IConfig {
	jmlAngka?: number;
	gambar?: boolean;
	angkaMulai?: number;
}

export class Query {
	private _key: string = '';
	public get key(): string {
		return this._key;
	}

	private _value: string = '';
	public get value(): string {
		return this._value;
	}

	constructor(key: string, value: string) {
		this._key = key;
		this._value = value;
	}
}

export interface IBaseSoal {
	init(): void;
	reset(): void;
	mulai(): void;
	feedbackClick(cont: HTMLDivElement): void;
	feedbackBenarShow(cont: HTMLDivElement): void;
	feedbackSalahShow(cont: HTMLDivElement): void;
	setConfig(config: IConfig): void;
}