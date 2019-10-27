export class Global {
    constructor() {
        this._data = Data;
        this._mainChar = null;
        this._viewPort = null;
        this._cont = null;
    }
    get cont() {
        return this._cont;
    }
    set cont(value) {
        this._cont = value;
    }
    get viewPort() {
        return this._viewPort;
    }
    set viewPort(value) {
        this._viewPort = value;
    }
    get mainChar() {
        return this._mainChar;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    set mainChar(value) {
        if (this._mainChar)
            throw new Error();
        this._mainChar = value;
    }
    static getInst() {
        console.log('global get inst');
        console.log(Data);
        if (this._inst)
            return this._inst;
        this._inst = new Global();
        return this._inst;
    }
}
Global._inst = null;
// }
