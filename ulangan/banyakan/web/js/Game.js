import { Dom } from "./Dom.js";
// import { Feedback } from "./Feedback.js";
import { Selesai } from "./Selesai.js";
import { Template } from "./Template.js";
// import { Banyakan } from "./banyakan/Banyakan.js";
import { Puluhan } from "./puluhan/Puluhan.js";
import { Menu } from "./menu/Menu.js";
import { BandingkanTanda } from "./tanda/BandingkanTanda.js";
// import { Debug } from "./Debug.js";
import { Acak } from "./Acak.js";
import { JumlahPilih } from "./jumlah/JumlahPilih.js";
import { Pola } from "./pola/Pola.js";
// import { JenisSoal } from "./EnumSoal.js";
export class Game {
    constructor() {
        this._dom = null;
        // private _feedback: Feedback = null;
        this._selesai = null;
        this._template = null;
        // private _banyakan: Banyakan = null;
        this._cont = null;
        this._puluhan = null;
        this._menu = null;
        this._simbol = null;
        this._jumlahPilih = null;
        this._pola = null;
        Game._inst = this;
        this._template = new Template();
        this._dom = new Dom();
        // this._feedback = new Feedback();
        this._selesai = new Selesai();
        // this._banyakan = new Banyakan();
        this._puluhan = new Puluhan();
        this._menu = new Menu();
        this._simbol = new BandingkanTanda();
        this._jumlahPilih = new JumlahPilih();
        window.onload = () => {
            this.init();
        };
    }
    init() {
        this._cont = document.body.querySelector('div.cont');
        // this._banyakan.init();
        this._selesai.init();
        // this._feedback.init();
        this._puluhan.init();
        this._simbol.init();
        this._menu.init();
        this._menu.attach(this._cont);
        this._jumlahPilih.init();
        this.test();
        //short cut
        // this._menu.click(JenisSoal.BILANGAN_20);
    }
    test() {
        let acak = new Acak(10);
        acak.test();
    }
    debug() {
        // Debug.tanda();
    }
    getStackTrace() {
        try {
            throw new Error();
        }
        catch (e) {
            console.log(e);
        }
    }
    get menu() {
        return this._menu;
    }
    static get inst() {
        return Game._inst;
    }
    get dom() {
        return this._dom;
    }
    // public get feedback(): Feedback {
    // 	return this._feedback;
    // }
    get selesai() {
        return this._selesai;
    }
    get template() {
        return this._template;
    }
    // public get banyakan(): Banyakan {
    // 	return this._banyakan;
    // }
    get cont() {
        return this._cont;
    }
    get puluhan() {
        return this._puluhan;
    }
    get simbol() {
        return this._simbol;
    }
    set simbol(value) {
        this._simbol = value;
    }
    get jumlahPilih() {
        return this._jumlahPilih;
    }
    set jumlahPilih(value) {
        this._jumlahPilih = value;
    }
    get pola() {
        if (null == this._pola) {
            this._pola = new Pola();
        }
        return this._pola;
    }
}
new Game();
