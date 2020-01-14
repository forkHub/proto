export class Acak {
    constructor(max) {
        this.idx = 0;
        this.angkas = [];
        this._max = 0;
        this._offset = 0;
        this._max = max;
        this.resetArray();
        this.acak();
    }
    get2(kecuali) {
        let res = 0;
        let ketemu = false;
        while (true) {
            res = this.get();
            ketemu = true;
            for (let i = 0; i < kecuali.length; i++) {
                if (kecuali[i] == res)
                    ketemu = false;
            }
            if (ketemu)
                return res;
        }
    }
    test() {
        this._max = 10;
        for (let i = 0; i < 100; i++) {
            let res = this.get();
            if (res >= 10)
                throw new Error();
        }
        this.max = 1;
        for (let i = 0; i < 1000; i++) {
            let res = this.get();
            if (res >= 1)
                throw new Error(res + '');
        }
        //TODO:test acak kecuali
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
    get offset() {
        return this._offset;
    }
    set offset(value) {
        this._offset = value;
    }
}
