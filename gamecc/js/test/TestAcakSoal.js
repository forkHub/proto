"use strict";
var fg;
(function (fg) {
    class TestAcakSoal {
        // private _soalManager: fg.SoalManager = new SoalManager();
        constructor() {
            this._acak = new fg.pages.acak.AcakSoal();
            this._acak.render(document.body);
            this._acak.updater = new fg.Updater();
            this._acak.reset();
            this._acak.mulaiClick = () => {
                console.log('mulai click');
            };
        }
    }
    fg.TestAcakSoal = TestAcakSoal;
})(fg || (fg = {}));
