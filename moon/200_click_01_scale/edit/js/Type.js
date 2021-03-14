"use strict";
class CError extends Error {
    constructor(code, msg) {
        super(msg);
        this._code = code;
    }
    get code() {
        return this._code;
    }
}
