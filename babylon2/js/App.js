import { Tombol } from "./comp/Tombol.js";
import { Util } from "./comp/Util.js";
import { Db } from "./Db.js";
import { DefObj3DData } from "./DefObj.js";
import { halDepan } from "./HalDepan.js";
import { Id } from "./Id.js";
import { Menu } from "./menu/Menu.js";
import { Obj3DHandler } from "./Obj3DHandler.js";
import { Playground } from "./PlayGround.js";
import { Pohon } from "./pohon/Pohon.js";
import { Primitif } from "./Primitif.js";
import { TombolDef } from "./TombolDef.js";
class App {
    constructor() {
        this.p = new Playground();
        this.objH = new Obj3DHandler();
        this.defData = new DefObj3DData();
        this.id = new Id();
        this.prim = new Primitif();
        this.pohon = new Pohon();
        this.hal = halDepan;
        this.tombol = new Tombol();
        this.db = new Db();
        this._tombolDef = new TombolDef();
    }
    init() {
        this._tombolDef.init();
        this.p.init();
        this.objH.buatAkar();
        this._menu = new Menu();
        if (!this.reload()) {
            this.testBuatDataAwal();
        }
    }
    testBuatDataAwal() {
        this.objH.reset();
        this.objH.tambahAnak(this.objH.akar, this.defData.defBola());
        this.objH.tambahAnak(this.objH.akar, this.defData.defTanah());
        // this.db.simpan();
    }
    reload() {
        console.debug('reload');
        try {
            let data = this.db.load();
            console.debug('data');
            console.debug(data);
            if (!data)
                return false;
            let dataObj = JSON.parse(data);
            console.debug('data obj');
            console.debug(dataObj);
            this.objH.buatObjDariData(dataObj.data);
            this.id.id = dataObj.id;
        }
        catch (e) {
            Util.error(e);
            return false;
        }
        return true;
    }
    get menu() {
        return this._menu;
    }
    get itemDipilih() {
        return this._itemDipilih;
    }
    set itemDipilih(value) {
        this._itemDipilih = value;
    }
    get tombolDef() {
        return this._tombolDef.data;
    }
}
export var app = new App();
window.onload = () => {
    app.init();
};
