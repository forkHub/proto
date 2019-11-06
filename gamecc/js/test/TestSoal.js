"use strict";
var fg;
(function (fg) {
    var test;
    (function (test) {
        class TestSoal {
            constructor() {
                let soal = new fg.pages.Soal();
                let soalManager = new fg.SoalManager();
                soal = new fg.pages.Soal();
                soal.dialog = new ha.comm.Dialog();
                soal.timer.updater = new fg.Updater();
                soal.timer.max = 50;
                soal.soal = soalManager.getSoalBelumDijawab(soalManager.getCategoryList()[0].cat);
                soal.user = fg.User.default();
                soal.photoAvatarController = fg.FotoAvatarController.default();
                soal.onFinish = () => {
                    console.log('soal finish');
                };
                soal.render(document.body);
                soal.dialog.render(document.body);
                soal.dialog.hide();
                soal.mulai();
            }
        }
        test.TestSoal = TestSoal;
    })(test = fg.test || (fg.test = {}));
})(fg || (fg = {}));
