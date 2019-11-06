"use strict";
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var acak;
        (function (acak) {
            class AcakSoal extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this.counterCategory = 0;
                    this.counterCategoryMax = 0;
                    this._catNo = 0;
                    this.counterGlobal = 0;
                    this.counterGlobalMax = 30;
                    this._catList = [];
                    this._template = `
                <div class='acak-soal' style='position:absolute'>
                    <p class='judul'>Mengacak Soal</p>
                    <br/>
                    <br/>
                    <span class='acak'></span>
                    <br/>
                    <br/>
                    <div class='button'>
                        <button class='start normal'>Acak</button>
                        <button class='mulai normal'>Mulai Kerjakan Soal</button>
                    </div>
                </div>
            `;
                }
                init() {
                    let updater = fg.App.inst.updater;
                    let data = fg.App.inst.data;
                    let soal = fg.App.inst.soal;
                    this.soalManager = fg.App.inst.soalManager;
                    this._catList = this.soalManager.getCategoryList();
                    this.updater = updater;
                    this.render(data.contKanan);
                    this.hide();
                    this.mulaiClick = () => {
                        this.soalManager.catCr = this._catList[this.catNo].cat;
                        this.hide();
                        soal.show();
                        soal.soal = this.soalManager.getSoalBelumDijawab(this.soalManager.catCr);
                        ;
                        soal.mulai();
                        soal.user = data.userCr;
                    };
                }
                reset() {
                    this.show(this.tombolAcakEl);
                    this.hide(this.tombolMulaiEl);
                    this.counterCategory = 0;
                    this.counterGlobal = 0;
                    this.counterCategoryMax = 0;
                    this._catNo = 0;
                    this._catList = this.soalManager.getCategoryList();
                    this.updateCatLabel();
                    if (this._catList.length == 1) {
                        this._catNo = 0;
                        console.log('acak finish dengan jumlah cat 1');
                        this.updateCatLabel();
                        this.acakFinish();
                    }
                }
                updateCatLabel() {
                    this.spanEl.innerText = this._catList[this.catNo].cat.label + ' (' + this._catList[this.catNo].jml + ' soal)';
                }
                update() {
                    this.counterCategory++;
                    if (this.counterCategory > this.counterCategoryMax) {
                        this.counterCategory = 0;
                        this.counterCategoryMax += .08;
                        this._catNo++;
                        if (this.catNo >= this._catList.length) {
                            this._catNo = 0;
                        }
                    }
                    this.counterGlobal++;
                    if (this.counterGlobal > this.counterGlobalMax) {
                        this.acakFinish();
                    }
                    this.updateCatLabel();
                }
                acakFinish() {
                    this._updater.unsubscribe(this);
                    this.show(this.tombolMulaiEl);
                    this.hide(this.tombolAcakEl);
                }
                tombolMulaiClick() {
                    this._mulaiClick();
                }
                tombolStartAcakClick() {
                    console.log('AcakSoal.tombol start acak click');
                    this.tombolAcakEl.innerText = 'Mulai';
                    this.hide(this.tombolAcakEl);
                    this._updater.subscribe(this);
                }
                onRender() {
                    this.spanEl = this.getEl('span.acak');
                    this.tombolAcakEl = this.getEl('button');
                    this.tombolAcakEl.addEventListener('click', this.tombolStartAcakClick.bind(this));
                    this.tombolMulaiEl = this.getEl('button.mulai');
                    this.tombolMulaiEl.addEventListener('click', this.tombolMulaiClick.bind(this));
                    this.hide(this.tombolMulaiEl);
                    // this.spanEl.innerText = this._catList[this.catNo].cat.label + ' (' + this._catList[this.catNo].jml + ')';
                    this.updateCatLabel();
                }
                set mulaiClick(value) {
                    this._mulaiClick = value;
                }
                // public set catList(value: Array<ICategoryAktif>) {
                // 	this._catList = value;
                // }
                // public get catList(): Array<ICategoryAktif> {
                // 	return this._catList;
                // } 
                get catNo() {
                    return this._catNo;
                }
                set updater(value) {
                    this._updater = value;
                }
            }
            acak.AcakSoal = AcakSoal;
        })(acak = pages.acak || (pages.acak = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
