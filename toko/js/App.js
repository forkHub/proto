"use strict";
class App {
    constructor() {
        App.dialog.init();
        App.form.init();
        App.daftarBarang.init();
        App.daftarBarang.attach(App.cont);
        App.upload.init();
        App.login.init();
        App.daftarBarang.load2();
    }
    static get cont() {
        return App.getEl('div.container');
    }
    static getEl(query) {
        let el;
        el = document.body.querySelector(query);
        if (el) {
            return el;
        }
        else {
            console.log(document.body);
            console.log(query);
            throw new Error('query not found ');
        }
    }
}
App.form = new FormBarangPage();
App.dialog = new Dialog();
App.daftarBarang = new DaftarBarangPage();
App.upload = new PhotoUploadPage();
App.login = new Login2();
window.onload = () => {
    console.log('window onload');
    new App();
};
