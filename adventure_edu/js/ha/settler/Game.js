///<reference path="./easel.d.ts"/>
import { Map } from './Map.js';
import { Global } from './Global.js';
import { MainChar } from './mainChar/MainChar.js';
import { ViewPort } from './ViewPort.js';
import { Debug } from './Debug.js';
export class Game {
    constructor() {
        this.stage = null;
        this._mainChar = null;
        this._map = new Map();
        this.layerPetak = new createjs.Container();
        this.layerObj = new createjs.Container();
        this._cont = new createjs.Container();
        this.viewPort = null;
        Game._inst = this;
        window.onload = () => {
            this.init();
            window.onresize = () => {
                this.onResize();
            };
            setTimeout(() => {
                this.onResize();
            }, 1000);
            this.onResize();
        };
    }
    onResize() {
        let canvas = document.querySelector('canvas');
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let gw = ww / 640;
        let gh = wh / 480;
        let ratio = Math.min(gw, gh);
        let cw = parseInt(canvas.style.width);
        let ch = parseInt(canvas.style.height);
        cw = 640 * ratio;
        ch = 480 * ratio;
        canvas.style.width = cw + 'px';
        canvas.style.height = ch + 'px';
        // canvas.style.top = ((window.innerHeight / 2) - (ch / 2)) + 'px';
        // canvas.style.left = ((window.innerWidth / 2) - (cw / 2)) + 'px';
        this._debug.write('window innerwidth ' + window.innerWidth);
        this._debug.write('canvas innerwidth ' + canvas.style.width);
    }
    init() {
        Global.getInst().mainChar = new MainChar();
        this._mainChar = Global.getInst().mainChar;
        this._mainChar.init();
        this._mainChar.pos.x = 2 * 32;
        this._mainChar.pos.y = 2 * 32;
        this._mainChar.updateView();
        this._mainChar.map = this._map;
        this.initStage();
        this._map.init();
        this._map.collectData();
        this.drawWall();
        this.stage.addChild(this._cont);
        this._cont.addChild(this.layerPetak);
        this.gambarPetak();
        this._cont.addChild(this.layerObj);
        this.layerObj.addChild(this._mainChar.view);
        this.stage.update();
        this._debug = new Debug();
        this.viewPort = new ViewPort();
        this.viewPort.init();
    }
    test() {
    }
    gambarPetak() {
        console.log('gambar petak');
        console.log(this._map.petakList);
        for (let i = 0; i < this._map.petakList.length; i++) {
            console.log(this._map.petakList[i]);
            this.layerPetak.addChild(this._map.petakList[i].view);
        }
    }
    initStage() {
        this.stage = new createjs.Stage("canvas");
        this.stage.on("click", this.stageOnClick.bind(this));
        //background
        let shape = new createjs.Shape();
        shape.graphics.beginFill("#eeeeee");
        shape.graphics.rect(0, 0, 320, 240);
        this.stage.addChild(shape);
        createjs.Ticker.on("tick", this.update.bind(this));
    }
    stageOnClick(evt) {
        console.log('stage on click');
        this._mainChar.perintahTunggu.reset();
        this._mainChar.perintahTunggu.aktif = true;
        this._mainChar.perintahTunggu.tx = Math.floor((evt.stageX - this.cont.x) / 32);
        this._mainChar.perintahTunggu.ty = Math.floor((evt.stageY - this.cont.y) / 32);
    }
    update(evt) {
        this._mainChar.update();
        this.stage.update(evt);
        this._map.update();
        this.viewPort.update();
    }
    drawWall() {
        let bmp;
        for (let j = 0; j < this._map.height; j++) {
            for (let i = 0; i < this._map.width; i++) {
                if (this._map.getCellValue(i, j) == 1) {
                    bmp = new createjs.Bitmap(document.querySelector("img#box"));
                    bmp.x = i * 32;
                    bmp.y = j * 32;
                    this.layerObj.addChild(bmp);
                }
            }
        }
    }
    get map() {
        return this._map;
    }
    set map(value) {
        this._map = value;
    }
    get mainChar() {
        return this._mainChar;
    }
    set mainChar(value) {
        this._mainChar = value;
    }
    static get inst() {
        return Game._inst;
    }
    get debug() {
        return this._debug;
    }
    get cont() {
        return this._cont;
    }
}
Game.ST_IDLE = 'IDLE';
Game.ST_AKSI = 'AKSI';
Game.ST_AKSI_SELESAI = 'AKSI SELESAI';
let game = new Game();
console.log(game);
