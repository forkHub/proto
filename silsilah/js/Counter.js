class Counter {
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
}
export var id = new Counter();
