export class Debug {
    constructor() {
        this.cont = document.querySelector('div#debug');
    }
    clear() {
        this.cont.innerHTML = '';
    }
    write(str) {
        this.cont.innerHTML += ("<p>" + str + "</p>");
    }
}
