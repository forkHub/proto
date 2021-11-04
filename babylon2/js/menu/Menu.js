import { app } from "../App.js";
import { Akar } from "./Akar.js";
import { Edit } from "./Edit.js";
import { ItemDipilih } from "./ItemDipilih.js";
import { ObjBaru } from "./ObjBaru.js";
export class Menu {
    constructor() {
        this.akar = new Akar();
        this.objBaru = new ObjBaru();
        this.itemDipilih = new ItemDipilih();
        this.edit = new Edit();
        this.hal = [];
    }
    pop() {
        this.hal.pop();
        if (this.hal.length > 0) {
            this.ganti(this.hal[this.hal.length - 1]);
        }
    }
    popAll() {
        while (this.hal.length > 0) {
            this.hal.pop();
        }
        this.bersihkanCont();
    }
    bersihkanCont() {
        while (app.hal.tombolCont.firstChild) {
            app.hal.tombolCont.removeChild(app.hal.tombolCont.firstChild);
        }
    }
    ganti(hal) {
        this.bersihkanCont();
        app.hal.tombolCont.appendChild(hal.view);
        hal.reset();
        this.hal.push(hal);
    }
}
