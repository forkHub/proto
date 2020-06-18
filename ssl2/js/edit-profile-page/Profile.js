import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
export class Profile extends BaseComponent {
    constructor() {
        super();
    }
    async init(anggota, server) {
        this.server = server;
        this.anggota = anggota;
        this.inputNama.value = anggota.nama;
        this.inputAlamat.value = anggota.alamat;
        this.inputNamaLengkap.value = anggota.namaLengkap;
        this.setInputJKL(anggota.jkl);
        this.inputTglLahir.value = Util.date2Input(anggota.tglLahir);
        this.inputTglMeninggal.value = Util.date2Input(anggota.tglMeninggal);
        this.inputFacebook.value = anggota.facebook;
        this.inputWA.value = anggota.wa;
        this.inputLinkedIn.value = anggota.linkedin;
        this.inputInstagram.value = anggota.instagram;
        this._elHtml = Util.getEl('div.cont form.profile');
        this.form.onsubmit = () => {
            try {
                Util.loadingStart();
                this.simpanClick().then(() => {
                    window.top.location.reload();
                }).catch((e) => {
                    console.log(e);
                    Util.loadingEnd();
                    Util.alertMsg(e.message);
                });
            }
            catch (e) {
                Util.alertMsg(e.message);
            }
            return false;
        };
    }
    async simpanClick() {
        console.log('jkl');
        // console.log(this.inputJKL);
        // console.log(this.inputJKL.value);
        this.anggota.nama = this.inputNama.value;
        this.anggota.alamat = this.inputAlamat.value;
        this.anggota.namaLengkap = this.inputNamaLengkap.value;
        this.anggota.jkl = this.getInputJKL();
        this.anggota.facebook = this.inputFacebook.value;
        this.anggota.instagram = this.inputInstagram.value;
        this.anggota.linkedin = this.inputLinkedIn.value;
        this.anggota.wa = this.inputWA.value;
        this.anggota.tglLahir = Util.Input2Date(this.inputTglLahir.value);
        this.anggota.tglMeninggal = Util.Input2Date(this.inputTglMeninggal.value);
        console.log('simpan profile');
        console.log(this.anggota);
        await this.server.anggota.update(this.anggota);
    }
    get simpanTbl() {
        return Util.getEl('form.profile button.ok');
    }
    get inputNama() {
        return Util.getEl('form.profile input.nama');
    }
    get inputNamaLengkap() {
        return Util.getEl('form.profile input.nama-lengkap');
    }
    get inputAlamat() {
        return Util.getEl('form.profile textarea.alamat');
    }
    get inputTglLahir() {
        return Util.getEl('form.profile input.tgl-lahir');
    }
    get inputTglMeninggal() {
        return Util.getEl('form.profile input.tgl-meninggal');
    }
    get inputWA() {
        return Util.getEl('form.profile input.wa');
    }
    get inputFacebook() {
        return Util.getEl('form.profile input.facebook');
    }
    get inputLinkedIn() {
        return Util.getEl('form.profile input.linkedin');
    }
    get inputInstagram() {
        return Util.getEl('form.profile input.instagram');
    }
    get form() {
        return Util.getEl('form.profile');
    }
    setInputJKL(value) {
        document.querySelectorAll('input[name="jkl"]').forEach((item) => {
            if (item.getAttribute("value") == value) {
                item.setAttribute("checked", 'true');
            }
        });
    }
    getInputJKL() {
        let res;
        res = document.querySelector('input[name="jkl"]:checked').getAttribute('value');
        // document.querySelectorAll("input[name='jkl']").forEach((item: Element) => {
        // 	if (item.getAttribute("checked")) {
        // 		res = item.getAttribute("value");
        // 	}
        // 	else {
        // 		console.log(item.getAttribute("checked"));
        // 	}
        // });
        return res;
    }
}
