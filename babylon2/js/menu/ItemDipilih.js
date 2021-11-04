import { app } from "../App.js";
// import { IMenu } from "../Type.js";
import { BaseMenu } from "./BaseMenu.js";
export class ItemDipilih extends BaseMenu {
    // readonly view: HTMLDivElement;
    constructor() {
        super();
        // this.view = document.body.querySelector('template').content.querySelector('menu').cloneNode(true) as HTMLDivElement;
        this.view.appendChild(app.tombolDef.buat);
        this.view.appendChild(app.tombol.buat('hapus ...', () => {
            let ok = window.confirm('hapus?');
            if (ok) {
                app.objH.hapus(app.itemDipilih);
            }
        }));
        this.view.appendChild(app.tombol.buat('edit ...', () => {
            console.debug('edit');
            app.menu.ganti(app.menu.edit);
        }));
    }
}
