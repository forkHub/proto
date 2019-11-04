export class Counter {
    constructor() {
        this.pencetBtn = null;
        this.settingBtn = null;
        this.aktifBtn = null;
        this.resetBtn = null;
        this.hitungP = null;
        this.menuDiv = null;
        this.counter = 0;
        this.batasctr = 0;
        window.onload = () => {
            this.init();
        };
    }
    init() {
        console.log("init");
        this.hitungP = document.body.querySelector('div.cont p.counter');
        this.menuDiv = document.body.querySelector("div.cont div.menu");
        this.pencetBtn = document.body.querySelector('div.cont button.pencet');
        this.pencetBtn.onclick = () => {
            this.counter++;
            this.batasctr++;
            this.hitungP.innerText = this.counter + '';
            if (this.batasctr >= 100) {
                this.batasctr = 0;
                this.pencetBtn.disabled = true;
            }
            // console.log(this.counter);
            // console.log(this.hitungP.innerText);
        };
        this.settingBtn = document.body.querySelector('div.cont div.setting button.setting');
        this.settingBtn.onclick = () => {
            if (this.menuDiv.style.display == "block") {
                this.menuDiv.style.display = "none";
            }
            else {
                this.menuDiv.style.display = "block";
            }
        };
        this.aktifBtn = document.body.querySelector('div.cont div.setting div.menu button.aktif');
        this.aktifBtn.onclick = () => {
            this.menuDiv.style.display = "none";
            this.pencetBtn.disabled = false;
        };
        this.resetBtn = document.body.querySelector('div.cont div.menu button.reset');
        this.resetBtn.onclick = () => {
            this.menuDiv.style.display = "none";
            this.counter = 0;
            this.batasctr = 0;
            this.pencetBtn.disabled = false;
            this.hitungP.innerText = 0 + '';
        };
    }
}
new Counter();
