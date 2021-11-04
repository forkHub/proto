export class Id {
    constructor() {
        this._id = 0;
    }
    get id() {
        this._id++;
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    toDbo() {
        return this._id;
    }
}
