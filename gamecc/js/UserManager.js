"use strict";
var fg;
(function (fg) {
    class UserManager {
        resetPemain() {
            let i;
            let user;
            for (i = 0; i < this._userList.length; i++) {
                user = this._userList[i];
                user.score = 0;
            }
        }
        buatPemain(jml) {
            let i;
            let user;
            console.log('buat pemain ' + jml);
            while (this.userList.length > 0) {
                this.userList.pop();
            }
            for (i = 0; i < jml; i++) {
                user = new fg.User();
                this.userList.push(user);
            }
        }
        get userList() {
            return this._userList;
        }
        set userList(value) {
            this._userList = value;
        }
    }
    fg.UserManager = UserManager;
})(fg || (fg = {}));
