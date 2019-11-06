"use strict";
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        class JmlPemain extends ha.core.BaseComponent {
            constructor() {
                super();
                this._jmlPemain = 2;
                this._template = `
                <div class='jml-pemain'>
                    <p class='judul'>Pilih Jumlah Pemain: <span class='jml'></span></p>
                    <div class='cont'>
                        <button class='jml a'>1</jml>
                        <button class='jml b'>2</jml>
                        <button class='jml c'>3</jml>
                        <button class='jml d'>4</jml>
                    </div>
                    <button class='next normal'>Selanjutnya</button>
                </div>
            `;
            }
            get jmlPemain() {
                return this._jmlPemain;
            }
            get onNextClick() {
                return this._onNextClick;
            }
            set onNextClick(value) {
                this._onNextClick = value;
            }
            //TODO: refactor
            init() {
                let data = fg.App.inst.data;
                let userManager = fg.App.inst.userManager;
                let editPemain = fg.App.inst.editPemain;
                console.log(data);
                this.render(data.cont);
                this.onNextClick = () => {
                    console.log('edit jml pemain on next click, jml Pemain ' + data.jmlPemain);
                    console.log(data.userList);
                    this.hide();
                    userManager.buatPemain(this.jmlPemain);
                    editPemain.userList = data.userList;
                    editPemain.show();
                    editPemain.onShow();
                };
            }
            onRender() {
                let i;
                let els;
                let btn;
                els = this._elHtml.querySelectorAll('button.jml');
                for (i = 0; i < 4; i++) {
                    let j = i + 1;
                    btn = els[i];
                    btn.addEventListener('click', () => {
                        this.jmlClick(j);
                    });
                }
                btn = this.getEl('button.next');
                btn.addEventListener('click', () => {
                    console.log('next click');
                    this._onNextClick();
                });
                this._jmlEl = this.getEl('span.jml');
                this._jmlEl.innerText = this._jmlPemain + '';
                if (fg.Data.inst().debug) {
                    this._jmlPemain = 4;
                    this._onNextClick();
                }
            }
            jmlClick(i) {
                // console.log('jml pemain ' + i);
                this._jmlPemain = i;
                this._jmlEl.innerText = this._jmlPemain + '';
            }
        }
        pages.JmlPemain = JmlPemain;
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
