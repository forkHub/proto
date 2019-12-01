import { Dom } from "./src/Dom"
import { Feedback } from "./src/Feedback";
import { Selesai } from "./src/Selesai";
import { Template } from "./src/Template";
import { Banyakan } from "./src/banyakan/Banyakan";
import { Acak } from "./src/Acak";

export class Game {
	private _dom: Dom = null;
	private _feedback: Feedback = null;
	private _selesai: Selesai = null;
	private _template: Template = null;
	private _banyakan: Banyakan = null;
	private _acak: Acak = null;

	private static _inst: Game;

	constructor() {
		Game._inst = this;

		this._dom = new Dom();
		this._feedback = new Feedback();
		this._selesai = new Selesai();
		this._template = new Template();
		this._banyakan = new Banyakan();
		this._acak = new Acak(10);
	}

	init(): void {

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
	public get acak(): Acak {
		return this._acak;
	}
}