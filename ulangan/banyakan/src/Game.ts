import { Dom } from "./Dom.js"
import { Feedback } from "./Feedback.js";
import { Selesai } from "./Selesai.js";
import { Template } from "./Template.js";
import { Banyakan } from "./banyakan/Banyakan.js";
import { Puluhan } from "./puluhan/Puluhan.js";
import { Menu } from "./Menu.js";
import { BandingkanTanda } from "./tanda/BandingkanTanda.js";
import { Debug } from "./Debug.js";
import { Acak } from "./Acak.js";
import { JumlahPilih } from "./jumlah/Jumlah.js";
import { Pola } from "./pola/Pola.js";
// import { JenisSoal } from "./EnumSoal.js";


export class Game {
	private _dom: Dom = null;
	private _feedback: Feedback = null;
	private _selesai: Selesai = null;
	private _template: Template = null;
	private _banyakan: Banyakan = null;
	private _cont: HTMLDivElement = null;
	private _puluhan: Puluhan = null;
	private _menu: Menu = null;
	private _simbol: BandingkanTanda = null;
	private _jumlahPilih: JumlahPilih = null;
	private _pola: Pola = null;

	private static _inst: Game;

	constructor() {
		Game._inst = this;

		this._template = new Template();
		this._dom = new Dom();
		this._feedback = new Feedback();
		this._selesai = new Selesai();
		this._banyakan = new Banyakan();
		this._puluhan = new Puluhan();
		this._menu = new Menu();
		this._simbol = new BandingkanTanda();
		this._jumlahPilih = new JumlahPilih();

		window.onload = () => {
			this.init();
		}

	}

	init(): void {
		this._cont = document.body.querySelector('div.cont') as HTMLDivElement;
		this._banyakan.init();
		this._selesai.init();
		this._feedback.init();
		this._puluhan.init();

		this._simbol.init();

		this._menu.init();
		this._menu.attach(this._cont);
		this._jumlahPilih.init();

		this.test();

		//short cut
		// this._menu.click(JenisSoal.BILANGAN_20);
	}

	test(): void {
		let acak: Acak = new Acak(10);
		acak.test();
	}

	debug() {
		Debug.tanda();
	}

	getStackTrace(): void {
		try {
			throw new Error();
		}
		catch (e) {
			console.log(e);
		}
	}

	public get menu(): Menu {
		return this._menu;
	}
	public static get inst(): Game {
		return Game._inst;
	}
	public get dom(): Dom {
		return this._dom;
	}
	public get feedback(): Feedback {
		return this._feedback;
	}
	public get selesai(): Selesai {
		return this._selesai;
	}
	public get template(): Template {
		return this._template;
	}
	public get banyakan(): Banyakan {
		return this._banyakan;
	}
	public get cont(): HTMLDivElement {
		return this._cont;
	}
	public get puluhan(): Puluhan {
		return this._puluhan;
	}
	public get simbol(): BandingkanTanda {
		return this._simbol;
	}
	public set simbol(value: BandingkanTanda) {
		this._simbol = value;
	}
	public get jumlahPilih(): JumlahPilih {
		return this._jumlahPilih;
	}
	public set jumlahPilih(value: JumlahPilih) {
		this._jumlahPilih = value;
	}
	public get pola(): Pola {
		if (null == this._pola) {
			this._pola = new Pola();
		}
		return this._pola;
	}
}

new Game();