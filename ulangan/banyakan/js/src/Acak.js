export class Acak {
    constructor(max) {
        this.idx = 0;
        this.angkas = [];
        this._max = 0;
        this._max = max;
        this.resetArray();
        this.acak();
    }
    get() {
        this.idx++;
        if (this.idx >= this.angkas.length - 1) {
            this.acak();
            this.idx = 0;
            // console.log('reset');
        }
        return this.angkas[this.idx];
    }
    acak() {
        let i = 0;
        let ax = 0;
        let bx = 0;
        let max = 0;
        let c = 0;
        max = this._max * 10;
        for (i = 0; i < max; i++) {
            ax = Math.floor(Math.random() * this._max);
            bx = Math.floor(Math.random() * this._max);
            c = this.angkas[ax];
            this.angkas[ax] = this.angkas[bx];
            this.angkas[bx] = c;
        }
    }
    resetArray() {
        this.angkas = [];
        for (let i = 0; i < this._max; i++) {
            this.angkas.push(i);
        }
    }
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = value;
        this.resetArray();
        this.acak();
    }
}
