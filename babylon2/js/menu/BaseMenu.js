import { Label, Pemisah } from "./view/Input.js";
export class BaseMenu {
    constructor() {
        this.view = document.body.querySelector('template').content.querySelector('menu').cloneNode(true);
    }
    reset() {
    }
    label(str, view) {
        let label = new Label(str);
        label.attach(view);
    }
    pemisah(view) {
        let p = new Pemisah();
        p.attach(view);
    }
}
