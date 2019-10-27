import { Petak } from './Petak.js';
import { Global } from './Global.js';
export class Map {
    constructor() {
        this._map = []; // = Data.map;
        this._petakList = [];
    }
    init() {
        this._map = Global.getInst().data.map;
        console.log('Map init');
        console.log(this._map);
        // console.log(this._map.map);
    }
    update() {
        let i;
        for (i = 0; i < this._petakList.length; i++) {
            this._petakList[i].update();
        }
    }
    getCellValue(i, j) {
        let char = this._map[j].charAt(i);
        if (char == "X") {
            return Map.TEMBOK;
        }
        else if (char == 'P') {
            return Map.PETAK;
        }
        return 0;
    }
    collectData() {
        let ctr = 0;
        let i = 0;
        let j = 0;
        for (i = 0; i < this._map[0].length; i++) {
            for (j = 0; j < this._map.length; j++) {
                ctr++;
                if (this.getCellValue(i, j) == Map.PETAK) {
                    let petak = new Petak();
                    petak.init();
                    petak.view.x = i * 32;
                    petak.view.y = j * 32;
                    this._petakList.push(petak);
                }
            }
        }
        console.log('collect data ');
        console.log('ctr ' + ctr);
        console.log('map 0 length ' + this._map[0].length + '/map length ' + this._map.length);
    }
    isPassable(x, y) {
        if (x < 0) {
            return false;
        }
        if (y < 0) {
            return false;
        }
        if (x >= this._map[y].length) {
            return false;
        }
        if (y >= this._map.length) {
            return false;
        }
        if (this._map[y].charAt(x) == " ") {
            return true;
        }
        else {
            return false;
        }
    }
    get width() {
        return this._map[0].length;
    }
    get height() {
        return this._map.length;
    }
    get petakList() {
        return this._petakList;
    }
}
Map.TEMBOK = 1;
Map.PETAK = 2;
