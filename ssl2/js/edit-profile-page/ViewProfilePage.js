import { Util } from "../Util.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
export class ViewProfilePage {
    constructor() {
        this.server = new FireBaseClient();
        this.id = '';
        this.urlBalik = '';
        Util.loadingStart();
        this.init().then(() => {
            Util.loadingEnd();
        }).catch((e) => {
            console.log(e.message);
            console.log(e);
            Util.loadingEnd();
            Util.alertMsg(e.message, false);
        });
    }
    async ambilDataRelasi() {
        let rel;
        console.group('ambil data relasi');
        console.log('data anggota');
        console.log(this.anggota);
        try {
            rel = await this.server.relasi.getByAnggotaId(this.anggota.id);
        }
        catch (e) {
            console.log(e);
        }
        console.log('hasil rel');
        console.log(rel);
        console.groupEnd();
        return rel;
    }
    async populateAnggota() {
        if (this.id && this.id.length > 0) {
            let res = await this.server.anggota.getByKey("id", this.id);
            this.anggota = res[0];
            let foto = await this.server.foto.getByIdOrDefault(this.anggota.idFoto);
            this.anggota.fotoUrl = foto.photoUrl;
            let img = Util.getEl('div.cont div.edit-foto img');
            img.onerror = () => {
                img.src = Util.imgSalah;
            };
            img.src = foto.photoUrl;
        }
        else {
            throw new Error('user tidak ditemukan');
        }
    }
    populateIdDariPasangan(idAnggota, rel) {
        if (rel.anak1 == idAnggota)
            return rel.anak2;
        if (rel.anak2 == idAnggota)
            return rel.anak1;
        return null;
    }
    async renderPasangan(anggota, rel) {
        let hasil = null;
        let id;
        let nama = '';
        let btnProfile = Util.getEl('button.pasangan.profile');
        let btnSilsilah = Util.getEl('button.pasangan.silsilah');
        if (!rel) {
            return;
        }
        id = this.populateIdDariPasangan(anggota.id, rel);
        if (!id) {
            return;
        }
        (btnProfile).onclick = () => {
            Util.bukaViewProfile(id, Util.urlHome + "?id=" + id);
        };
        (btnSilsilah).onclick = () => {
            Util.bukaHome(id);
        };
        try {
            hasil = await this.server.anggota.getByDoc(id);
            if (hasil) {
                nama = hasil.namaLengkap;
                Util.getEl('p.pasangan').innerHTML = nama;
                btnProfile.style.display = 'inline';
                btnSilsilah.style.display = 'inline';
            }
            else {
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    populateUrl() {
        this.id = Util.getQuery('id');
        this.urlBalik = decodeURIComponent(Util.getQuery('url_balik'));
        console.log('url balik:');
        console.log(this.urlBalik);
    }
    normalize2(data) {
        if ('' == data)
            return 'Tidak ada data';
        return data;
    }
    normalize() {
        // if (0 == this.anggota.tglLahir)
        // if ('' == this.anggota.nama) this.anggota.nama = 'Tidak ada data';
        // if ('' == this.anggota.alamat) this.anggota.alamat = 'Tidak ada data';
        this.anggota.nama = this.normalize2(this.anggota.nama);
        this.anggota.alamat = this.normalize2(this.anggota.alamat);
        this.anggota.namaLengkap = this.normalize2(this.anggota.namaLengkap);
        this.anggota.wa = this.normalize2(this.anggota.wa);
        this.anggota.facebook = this.normalize2(this.anggota.facebook);
        this.anggota.instagram = this.normalize2(this.anggota.instagram);
        this.anggota.linkedin = this.normalize2(this.anggota.linkedin);
    }
    renderSelf() {
        Util.getEl('p.nama-lengkap').innerHTML = this.anggota.namaLengkap;
        Util.getEl('p.nama').innerHTML = this.anggota.nama;
        Util.getEl('p.jkl').innerHTML = this.anggota.jkl;
        Util.getEl('p.alamat').innerHTML = this.anggota.alamat;
        Util.getEl('p.tgl-lahir').innerHTML = Util.date2Input(this.anggota.tglLahir);
        Util.getEl('p.tgl-meninggal').innerHTML = Util.date2Input(this.anggota.tglMeninggal);
        //akun sosial
        Util.getEl('p.wa').innerHTML = this.anggota.wa;
        Util.getEl('p.instagram').innerHTML = this.anggota.instagram;
        Util.getEl('p.fb').innerHTML = this.anggota.facebook;
        Util.getEl('p.linkedin').innerHTML = this.anggota.linkedin;
    }
    async renderAnak() {
        console.group('render anak');
        if (!this.rel) {
            console.log('rel tidak ada');
            console.groupEnd();
            return;
        }
        let anaks = [];
        for (let i = 0; i < this.rel.anaks.length; i++) {
            try {
                let anak = await this.server.anggota.getByDoc(this.rel.anaks[i]);
                if (!anak) {
                    anaks.push(Util.anakError());
                }
                else {
                    anaks.push(anak);
                }
            }
            catch (e) {
                anaks.push(Util.anakError());
            }
        }
        console.log('anaks:');
        console.log(anaks);
        anaks.forEach((item) => {
            let view;
            let anakCont = Util.getEl('div.anak-cont');
            view = Util.getTemplate('div.item-anak');
            view.querySelector('p.nama').innerHTML = item.namaLengkap;
            view.querySelector('button.profile').onclick = () => {
                Util.bukaViewProfile(item.id, Util.urlHome + "?id=" + item.id);
            };
            view.querySelector('button.silsilah').onclick = () => {
                Util.bukaHome(item.id);
            };
            anakCont.appendChild(view);
        });
        if (anaks.length > 0) {
            Util.getEl('p.anak.kosong').style.display = 'none';
        }
        console.groupEnd();
    }
    populateLinkSilsilah() {
        let linkStr = Util.urlLink + "?id=" + this.id + "&nama=" + window.encodeURIComponent(this.anggota.namaLengkap);
        this.link.href = linkStr;
        this.link.innerHTML = linkStr;
    }
    async init() {
        await this.server.init();
        this.populateUrl();
        await this.populateAnggota();
        this.populateLinkSilsilah();
        this.rel = await this.ambilDataRelasi();
        this.normalize();
        this.renderSelf();
        await this.renderPasangan(this.anggota, this.rel);
        await this.renderAnak();
        this.tutupBtn.onclick = () => {
            if (this.urlBalik) {
                window.top.location.href = this.urlBalik;
            }
        };
    }
    get pasanganInput() {
        return Util.getEl('div.pasangan input.nama');
    }
    get pilihAnakFragment() {
        return Util.getEl('div.pilih-anak');
    }
    get tutupBtn() {
        return Util.getEl('button.tutup');
    }
    get link() {
        return Util.getEl('a.link-silsilah');
    }
}
new ViewProfilePage();
