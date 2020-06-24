import { Loading } from "./Loading.js";
import { Alert } from "./Alert.js";
import { AnggotaObj } from "./ent/AnggotaObj.js";
import { FotoObj } from "./ent/FotoObj.js";
export class Util {
    static bukaEditProfile(id, url) {
        Util.loadingStart();
        window.top.location.href = Util.urlEditProfile + "?id=" + id + "&url_balik=" + window.encodeURIComponent(url);
    }
    static bukaViewProfile(id, urlBalik) {
        Util.loadingStart();
        window.top.location.href = Util.urlViewProfile + "?id=" + id + "&url_balik=" + window.encodeURIComponent(urlBalik);
    }
    static anakError() {
        let anak;
        anak = new AnggotaObj();
        anak.nama = '[-----]';
        anak.namaLengkap = '[-----]';
        anak.jkl = 'L';
        anak.id = '';
        anak.isDefault = true;
        return anak;
    }
    static fotoError() {
        let foto = new FotoObj();
        foto.thumbUrl = Util.defImage;
        foto.photoUrl = Util.defImage;
        return foto;
    }
    reloadPage() {
    }
    static bukaHome(id) {
        Util.loadingStart();
        window.top.location.href = Util.urlHome + '?id=' + id;
    }
    static bukaUploadPhoto2(idAnggota, urlBalik) {
        window.top.location.href = Util.urlUploadPhoto + "?id=" + idAnggota + "&url_balik=" + window.encodeURIComponent(urlBalik);
    }
    static getEl(query) {
        let el;
        el = document.body.querySelector(query);
        if (el) {
            return el;
        }
        else {
            console.log(document.body);
            console.log(query);
            throw new Error('query not found ');
        }
    }
    static alertMsg(msg, tbl = true, fn = null) {
        Util.loadingEnd();
        this.alert.text.innerHTML = msg;
        this.alert.attach(document.body);
        if (tbl) {
            this.alert.okTbl.style.display = 'block';
        }
        else {
            this.alert.okTbl.style.display = 'none';
        }
        this.alert.okTbl.onclick = () => {
            this.alert.detach();
            if (fn) {
                fn();
            }
        };
    }
    static padding(str) {
        str = "00" + str;
        return str.slice(str.length - 2, str.length);
    }
    static date2Input(dateP) {
        let date = (new Date(dateP));
        let res;
        let month = (date.getMonth() + 1) + '';
        let day = (date.getDate()) + '';
        if (dateP == 0)
            return '';
        res = date.getFullYear() + '-' + Util.padding(month) + '-' + Util.padding(day);
        return res;
    }
    static now() {
        let date = new Date();
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    }
    static Input2Date(str) {
        let date = new Date(str);
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    }
    static loadingStart() {
        Util.loading.attach(window.document.body);
    }
    static loadingEnd() {
        Util.loading.detach();
    }
    static getAllEl(target, query) {
        let hasil = null;
        hasil = target.querySelectorAll(query);
        if (hasil && hasil.length > 0) {
            return hasil;
        }
        else {
            console.log(target);
            console.log(query);
            throw new Error('query not found ');
            return null;
        }
    }
    static getTemplate(query) {
        let template = document.body.querySelector('template').content;
        return template.querySelector(query).cloneNode(true);
    }
    static getQuery(key) {
        let urlParam = new URLSearchParams(window.location.search);
        return urlParam.get(key);
    }
    static getLocalSession() {
    }
}
Util.urlHome = "./home2.html";
Util.urlEditProfile = './edit-profile.html';
Util.urlViewProfile = './view-profile-page.html';
Util.urlDaftarAnggota = './daftar-anggota.html';
Util.urlMenu = './admin.html';
Util.urlFoto = './foto-upload.html';
Util.urlUploadPhoto = './foto-upload2.html';
Util.urlLink = 'https://hagarden.netlify.app/ssl2/index.html';
Util.defImage = "./imgs/kucing.png";
Util.imgSalah = "./imgs/profile_salah.png";
Util.redirect_edit_relasi = 'rer';
Util.paramUrlBalik = 'url_balik';
Util.loading = new Loading();
Util.alert = new Alert();
