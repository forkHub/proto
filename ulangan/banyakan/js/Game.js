import { Dom } from "./src/Dom.js";
import { Feedback } from "./src/Feedback.js";
import { Selesai } from "./src/Selesai.js";
import { Template } from "./src/Template.js";
import { Banyakan } from "./src/banyakan/Banyakan.js";
import { Puluhan } from "./src/puluhan/Puluhan.js";
import { Menu } from "./Menu.js";
export class Game {
    constructor() {
        this._dom = null;
        this._feedback = null;
        this._selesai = null;
        this._template = null;
        this._banyakan = null;
        this._cont = null;
        this._puluhan = null;
        this._menu = null;
        Game._inst = this;
        this._template = new Template();
        this._dom = new Dom();
        this._feedback = new Feedback();
        this._selesai = new Selesai();
        this._banyakan = new Banyakan();
        this._puluhan = new Puluhan();
        this._menu = new Menu();
        window.onload = () => {
            this.init();
        };
    }
    init() {
        this._cont = document.body.querySelector('div.cont');
        this._banyakan.init();
        this._selesai.init();
        this._feedback.init();
        this._puluhan.init();
        //this._cont.appendChild(this._banyakan.pageCont.elHtml);
        this._menu.init();
        this._menu.attach(this._cont);
        //debug
    }
    debug() {
        this._menu.puluhanClick();
        this._puluhan.soalTerjawab = 10;
        this._puluhan.kirimClick();
        this._puluhan.feedbackOnClick();
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
    get cont() {
        return this._cont;
    }
    get puluhan() {
        return this._puluhan;
    }
}
new Game();
