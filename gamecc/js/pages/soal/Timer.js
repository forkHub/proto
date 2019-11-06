"use strict";
var fg;
(function (fg) {
    class Timer {
        constructor() {
            this._waktuAwal = 0;
            this._max = 60;
            this._waktuAwal = this.waktuSekarang();
        }
        stop() {
            this._updater.unsubscribe(this);
        }
        mulai() {
            this._updater.subscribe(this);
            this._waktuAwal = this.waktuSekarang();
        }
        waktuSekarang() {
            return new Date().getTime();
        }
        waktuTerlewat() {
            let hasil;
            hasil = Math.floor(((new Date().getTime()) - this._waktuAwal) / 1000);
            return hasil;
        }
        waktuDisplay(n) {
            return Math.max(this._max - n, 0) + '';
        }
        update() {
            if (this._element) {
                this._element.innerText = 'Waktu: ' + this.waktuDisplay(this.waktuTerlewat());
            }
            if (this.waktuTerlewat() > this._max) {
                this.stop();
                this._waktuHabis();
            }
        }
        get element() {
            return this._element;
        }
        set element(value) {
            this._element = value;
        }
        get waktu() {
            return this._waktuAwal;
        }
        get max() {
            return this._max;
        }
        set max(value) {
            this._max = value;
        }
        set updater(value) {
            this._updater = value;
        }
        get waktuHabis() {
            return this._waktuHabis;
        }
        set waktuHabis(value) {
            this._waktuHabis = value;
        }
    }
    fg.Timer = Timer;
})(fg || (fg = {}));
