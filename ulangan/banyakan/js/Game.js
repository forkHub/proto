import { Dom } from "./src/Dom";
import { Feedback } from "./src/Feedback";
import { Selesai } from "./src/Selesai";
import { Template } from "./src/Template";
import { Banyakan } from "./src/banyakan/Banyakan";
import { Acak } from "./src/Acak";
export class Game {
    constructor() {
        this._dom = null;
        this._feedback = null;
        this._selesai = null;
        this._template = null;
        this._banyakan = null;
        this._acak = null;
        Game._inst = this;
        this._dom = new Dom();
        this._feedback = new Feedback();
        this._selesai = new Selesai();
        this._template = new Template();
        this._banyakan = new Banyakan();
        this._acak = new Acak(10);
    }
    init() {
    }
    static get inst() {
        return Game._inst;
    }
    get dom() {
        return this._dom;
    }
    get feedback() {
        return this._feedback;
    }
    get selesai() {
        return this._selesai;
    }
    get template() {
        return this._template;
    }
    get banyakan() {
        return this._banyakan;
    }
    get acak() {
        return this._acak;
    }
}
