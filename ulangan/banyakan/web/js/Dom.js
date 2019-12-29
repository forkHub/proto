export class Dom {
    static getEl(parent, str) {
        let el = null;
        el = parent.querySelector(str);
        if (!el) {
            console.log(parent);
            console.log(str);
            throw Error();
        }
        return el;
    }
}
