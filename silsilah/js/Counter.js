class Counter {
    constructor() {
        this._id = 0;
    }
    get id() {
        console.log('get id' + this._id);
        this._id++;
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
}
export var id = new Counter();
