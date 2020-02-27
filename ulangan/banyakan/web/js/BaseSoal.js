import { BaseComponent } from "./BaseComponent.js";
import { Bar } from "./Bar.js";
import { Feedback, FeedbackEnum } from "./Feedback.js";
import { Selesai } from "./Selesai.js";
import { Game } from "./Game.js";
//TODO: acak masukkan ke base soal
export class BaseSoal extends BaseComponent {
    constructor() {
        super();
        this._jmlSoal = 10; //jumlah soal satu sesi
        this.soalIdx = 0; //soal aktif sekarang
        this._nilai = 0; //nilai
        this.gambar = true; //pakai gambar
        this.angkaMulai = 1; //angka minimum untuk soal
        this.angkaMax = 10; //angka maximum untuk soal
        this.jmlKotak = 3; //jumlah kotak untuk pilihan jawaban
        this.kirimTbl = null;
        this._cont = null;
        this.onSelesai = null;
        this.query = [];
        this.bar = null;
        this._feedback = null;
        this.selesai = null;
        this.barCont = null; //container bar, TODO: propagate
        this.selesai = new Selesai();
        this._feedback = new Feedback();
        this.bar = new Bar();
    }
    jawabanBenar() {
        console.log('base soal:jawaban benar');
        return "";
    }
    getUrl() {
        let url = window.location.search.slice(1);
        let kv = [];
        let kv2 = [];
        console.log('url ' + url);
        if (url && url.length > 0) {
            kv = url.split('&');
            console.log('kv');
            console.log(kv);
            if (kv && kv.length > 0) {
                for (let i = 0; i < kv.length; i++) {
                    kv2 = kv[i].split('=');
                    console.log('kv[i]');
                    console.log(kv[i]);
                    console.log('kv2');
                    console.log(kv2);
                    console.log('');
                    if (2 == kv2.length) {
                        this.query.push(new Query(kv2[0], kv2[1]));
                    }
                }
            }
        }
    }
    onBuild() {
        this.barCont = this.getEl('div.bar-cont');
        this.bar.attach(this.barCont);
        this.bar.onClick = () => {
            this.detach();
            Game.inst.menu.attach(Game.inst.cont);
        };
    }
    init() {
        this.selesai.init();
        this.selesai.onMulaiClick = () => {
            this.mulai();
        };
        this.selesai.onMenuClick = () => {
            this.detach();
            Game.inst.menu.attach(Game.inst.cont);
        };
        this.kirimTbl = this.getEl('button.normal.kirim');
        this.kirimTbl.onclick = () => {
            this.kirimTbl.blur();
            this.kirimClick();
        };
        this._feedback.init();
    }
    kirimClick() {
        this.userJawab();
    }
    setConfig(config) {
        if (config.angkaMulai) {
            this.angkaMulai = config.angkaMulai;
        }
        if (config.gambar) {
            this.gambar = config.gambar;
        }
        if (config.jmlAngka) {
            this.jmlKotak = config.jmlAngka;
        }
    }
    reset() {
    }
    mulai() {
        this.nilai = 0;
        this.soalIdx = 0;
        this.bar.persen = 0;
        this.reset();
    }
    check() {
        return true;
    }
    userJawab() {
        this.soalIdx++;
        this.bar.persen2(this.soalIdx, this._jmlSoal);
        if (this.check()) {
            this.nilai++;
            this.feedbackBenarShow(Game.inst.cont);
        }
        else {
            this.feedbackSalahShow(Game.inst.cont);
        }
    }
    feedbackClick(cont) {
        // console.log('feedback click, nilai ' + this.nilai);
        this._feedback.detach();
        if (this.soalIdx >= this._jmlSoal) {
            this.selesai.attach(cont);
            this.selesai.nilai = this.nilai;
        }
        else {
            this.reset();
        }
    }
    feedbackSalahShow(cont) {
        // console.log('feedback salah show');
        this._feedback.attach(cont);
        this._feedback.label = "Jawaban Salah";
        this._feedback.type = FeedbackEnum.SALAH;
        this._feedback.jawabP.innerHTML = "<b>Jawaban benar: </b>" + this.jawabanBenar();
        this._feedback.onClick = () => {
            this.feedbackClick(cont);
        };
    }
    feedbackBenarShow(cont) {
        this._feedback.attach(cont);
        this._feedback.label = 'Jawaban Benar';
        this._feedback.type = FeedbackEnum.BENAR;
        this._feedback.jawabP.innerText = "";
        this._feedback.onClick = () => {
            this.feedbackClick(cont);
        };
    }
    get cont() {
        return this._cont;
    }
    set cont(value) {
        this._cont = value;
    }
    get nilai() {
        return this._nilai;
    }
    set nilai(value) {
        this._nilai = value;
        // try {
        // 	throw new Error();
        // }
        // catch (e) {
        // 	console.log(e.getStackTrace());
        // }
    }
    get jmlSoal() {
        return this._jmlSoal;
    }
    set jmlSoal(value) {
        this._jmlSoal = value;
    }
}
export class Query {
    constructor(key, value) {
        this._key = '';
        this._value = '';
        this._key = key;
        this._value = value;
    }
    get key() {
        return this._key;
    }
    get value() {
        return this._value;
    }
}
export class Kirim extends BaseComponent {
    constructor() {
        super();
        this._template = `
		<div class='kirim-cont'>
			<button class='normal kirim'>Kirim</button>
		</div>`;
        this.build();
    }
}
