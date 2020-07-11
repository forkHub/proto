"use strict";
///<reference path='Input.ts'/>
class App {
    constructor() {
    }
    init() {
        App.input.init();
        App.input.render();
    }
}
App.input = new Input();
App.data = new Data();
App.db = new Db();
App.MODE_EDIT = 1;
App.MODE_BARU = 2;
window.onload = () => {
    (new App()).init();
};
