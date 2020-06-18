export class FotoObj {
    constructor() {
        this._thumbUrl = '';
        this._photoUrl = '';
        this._id = '';
        this._idPhoto = '';
        this._idThumb = '';
    }
    get idPhoto() {
        return this._idPhoto;
    }
    set idPhoto(value) {
        this._idPhoto = value;
    }
    get idThumb() {
        return this._idThumb;
    }
    set idThumb(value) {
        this._idThumb = value;
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
