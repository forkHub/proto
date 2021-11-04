import { app } from "./App.js";
export class TombolDef {
    constructor() {
        this.data = {};
    }
    init() {
        this.data.buat = app.tombol.buat('buat ...', () => {
            console.debug('edit');
            app.menu.ganti(app.menu.objBaru);
        });
    }
}
