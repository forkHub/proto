export class Puluhan {
    constructor() {
        this.puluhan = 0;
        this.satuan = 0;
        this.jumlah = 0;
        this.max = 0;
        this.jumlahEl = null;
        this.puluhanEl = null;
        this.satuanEl = null;
        this.kirimBtn = null;
        this.feedbackBenar = null;
        this.feedbackSalah = null;
        window.onload = () => {
            this.init();
        };
    }
    init() {
        console.log('init');
        this.jumlahEl = document.querySelector('div.cont span.jml');
        this.puluhanEl = document.querySelector('div.cont input#puluhan');
        this.satuanEl = document.querySelector('div.cont input#satuan');
        this.kirimBtn = document.querySelector('div.cont button.kirim');
        this.feedbackBenar = document.querySelector('div.feedback.benar');
        this.feedbackSalah = document.querySelector('div.feedback.salah');
        console.log(this.jumlahEl);
        console.log(this.puluhanEl);
        console.log(this.satuanEl);
        this.resetSoal();
        this.kirimBtn.onclick = () => {
            console.log('kirim klik');
            if (this.checkBenar()) {
                console.log('benar');
                this.feedbackBenar.style.display = 'block';
            }
            else {
                console.log('salah');
                this.feedbackSalah.style.display = 'block';
            }
        };
    }
    ambilAngka() {
        this.puluhan = (Math.floor(Math.random() * (this.max - 1)) + 1) * 10;
        this.satuan = Math.floor(Math.random() * this.max);
        this.jumlah = this.puluhan + this.satuan;
        console.log('reset');
        console.log('puluhan ' + this.puluhan + '/satuan ' + this.satuan + '/jumlah ' + this.jumlah);
    }
    resetSoal() {
        this.ambilAngka();
        this.jumlahEl.innerHTML = this.jumlah + '';
        this.feedbackHide();
    }
    feedbackHide() {
        console.log('feedback hide');
        this.feedbackBenar.style.display = 'none';
        this.feedbackSalah.style.display = 'none';
    }
    checkBenar() {
        if (this.puluhanEl.value == '')
            return false;
        if (this.satuanEl.value == '')
            return false;
        if (parseInt(this.puluhanEl.value) != this.puluhan)
            return false;
        if (parseInt(this.satuanEl.value) != this.satuan)
            return false;
        return true;
    }
}
