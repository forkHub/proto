export class Template {
    constructor() {
        this.template = null;
        this.template = document.body.querySelector('template').content;
    }
    getEl(query) {
        return this.template.querySelector(query).cloneNode(true);
    }
    get angka1() {
        return this.getEl('div.angka.satu');
    }
    get angka2() {
        return this.getEl('div.angka.dua');
    }
    get selesai() {
        return this.getEl('div.selesai');
    }
}
