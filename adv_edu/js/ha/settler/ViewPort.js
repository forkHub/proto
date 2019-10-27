import { Global } from "./Global.js";
// import { Debug } from "./Debug.js";
import { Game } from "./Game.js";
export class ViewPort {
    // private debug: Debug;
    get mainChar() {
        return this._mainChar;
    }
    set mainChar(value) {
        this._mainChar = value;
    }
    get cont() {
        return this._cont;
    }
    set cont(value) {
        this._cont = value;
    }
    constructor() {
        Global.getInst().viewPort = this;
    }
    init() {
        // this.debug = Game.inst.debug;
        this._mainChar = Game.inst.mainChar;
        this._cont = Game.inst.cont;
    }
    update() {
        this.x = this._mainChar.pos.x - 160;
        this.y = this._mainChar.pos.y - 120;
        this.cont.x = -this.x;
        this.cont.y = -this.y;
        // this.debug.clear();
        // this.debug.write('main char pos ' + this._mainChar.pos.x + '/' + this._mainChar.pos.y);
        // this.debug.write('cont pos ' + this._cont.x + '/' + this._cont.y);
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
}
