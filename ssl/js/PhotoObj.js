export class PhotoObj {
    constructor() {
        this._thumbUrl = '';
        this._photoUrl = '';
        this._id = '';
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get photoUrl() {
        return this._photoUrl;
    }
    set photoUrl(value) {
        this._photoUrl = value;
    }
    get thumbUrl() {
        return this._thumbUrl;
    }
    set thumbUrl(value) {
        this._thumbUrl = value;
    }
}
