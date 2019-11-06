"use strict";
var fg;
(function (fg) {
    class Updater {
        constructor() {
            // this.date = new Date();
            // console.log('updater constructor');
            this.lists = [];
            requestAnimationFrame(() => {
                this.update();
            });
        }
        update() {
            try {
                // console.log('update ' + Math.random());
                for (let i = 0; i < this.lists.length; i++) {
                    this.lists[i].update();
                }
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        this.update();
                    });
                }, 100);
            }
            catch (e) {
                console.log(e);
            }
        }
        getTime() {
            return new Date().getTime();
        }
        subscribe(item) {
            this.lists.push(item);
        }
        unsubscribe(item) {
            let i;
            for (i = 0; i < this.lists.length; i++) {
                if (this.lists[i] == item) {
                    this.lists.splice(i, 1);
                }
            }
        }
    }
    fg.Updater = Updater;
})(fg || (fg = {}));
