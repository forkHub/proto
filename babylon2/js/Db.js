import { app } from "./App.js";
export class Db {
    simpan() {
        let obj = {
            data: app.objH.simpan(),
            id: app.id.toDbo()
        };
        window.localStorage.setItem('ha.b4.simpan', JSON.stringify(obj));
    }
    load() {
        return window.localStorage.getItem('ha.b4.simpan');
    }
}
