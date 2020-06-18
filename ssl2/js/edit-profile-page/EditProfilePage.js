import { Util } from "../Util.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
import { Profile } from "./Profile.js";
import { EditFoto } from "./EditFoto.js";
import { PilihFoto } from "./PilihFoto.js";
import { EditAnak } from "./EditAnak.js";
import { ItemAnakDipilih } from "./ItemAnakDipilih.js";
import { RelPasanganObj } from "../ent/RelPasanganObj.js";
import { Pasangan } from "./Pasangan.js";
export class EditProfilePage {
    constructor() {
        this.server = new FireBaseClient();
        this.id = '';
        this.urlBalik = '';
        // window.onload = () => {
        Util.loadingStart();
        this.init().then(() => {
            Util.loadingEnd();
        }).catch((e) => {
            console.log(e.message);
            console.log(e);
            Util.loadingEnd();
            Util.alertMsg(e.message, false);
        });
        // }
    }
    async tambahPasangan() {
        this.pilihAnakFragment.style.display = 'flex';
        let anggotaAr;
        console.group('Tambah pasangan');
        anggotaAr = await this.server.anggota.get();
        console.log('jumlah anggota ' + anggotaAr.length);
        console.log('anggota:');
        console.log(anggotaAr);
        console.groupEnd();
        this.pilihAnggotaListCont.innerHTML = '';
        this.pilihJudul.innerHTML = 'Pilih Pasangan';
        anggotaAr.sort((item1, item2) => {
            if (item1.namaLengkap.charCodeAt(0) > item2.namaLengkap.charCodeAt(0))
                return 1;
            if (item1.namaLengkap.charCodeAt(0) < item2.namaLengkap.charCodeAt(0))
                return -1;
            return 0;
        });
        for (let i = 0; i < anggotaAr.length; i++) {
            let anggota = anggotaAr[i];
            let view = new ItemAnakDipilih();
            view.namaP.innerHTML = anggota.namaLengkap;
            view.anggota = anggota;
            view.attach(this.pilihAnggotaListCont);
            view.elHtml.onclick = () => {
                Util.loadingStart();
                this.pasanganDipilih(view).then(() => {
                    window.top.location.reload();
                }).catch((e) => {
                    console.log(e);
                    Util.loadingEnd();
                    Util.alertMsg(e.message);
                });
            };
        }
    }
    async pasanganDipilih(view) {
        console.group('pasangan dipilih');
        console.log('data anggota');
        console.log(view.anggota);
        // console.log('relasi ');
        // console.log(rel);
        let rel = new RelPasanganObj();
        rel.anak1 = this.anggota.id;
        rel.anak2 = view.anggota.id;
        // if ("" != rel.anak1 && rel.anak2 == "") {
        // 	rel.anak2 = view.anggota.id;
        // }
        // if ("" != rel.anak2 && "" == rel.anak1) {
        // 	rel.anak1 = view.anggota.id;
        // }
        await this.server.relasi.insert(rel);
        console.groupEnd();
    }
    async ambilDataRelasi() {
        let rel;
        console.group('ambil data relasi');
        console.log('data anggota');
        console.log(this.anggota);
        rel = await this.server.relasi.getByAnggotaId(this.anggota.id);
        console.log('hasil rel');
        console.log(rel);
        console.groupEnd();
        return rel;
    }
    async init() {
        await this.server.init();
        this.id = Util.getQuery('id');
        this.urlBalik = decodeURIComponent(Util.getQuery('url_balik'));
        if (this.id && this.id.length > 0) {
            let res = await this.server.anggota.getByKey("id", this.id);
            this.anggota = res[0];
        }
        else {
            throw new Error('user tidak ditemukan');
        }
        let linkStr = Util.urlLink + "?id=" + this.id + "&nama=" + window.encodeURIComponent(this.anggota.namaLengkap);
        this.link.href = linkStr;
        this.link.innerHTML = linkStr;
        this.rel = await this.ambilDataRelasi();
        this.pilihFoto = new PilihFoto();
        this.pilihFoto.init(this.server);
        this.editFoto = new EditFoto();
        await this.editFoto.init(this.server, this.anggota, this.pilihFoto);
        this.profile = new Profile();
        await this.profile.init(this.anggota, this.server);
        this.editAnak = new EditAnak();
        await this.editAnak.init(this.server, this.rel);
        this.pasangan = new Pasangan();
        await this.pasangan.init(this.anggota, this.rel, this.server);
        this.pasangan.tambahTbl.onclick = () => {
            Util.loadingStart();
            this.tambahPasangan().then(() => {
                Util.loadingEnd();
            }).catch((e) => {
                console.log(e.message);
                console.group();
                console.log(e);
                console.groupEnd();
                Util.alertMsg(e.message);
            });
        };
        this.editAnak.tambahTbl.onclick = () => {
            console.log('fragment anak tambah tbl click');
            Util.loadingStart();
            this.anakTambahForm().then(() => {
                Util.loadingEnd();
            }).catch((e) => {
                console.log(e);
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
        this.tutupBtn.onclick = () => {
            if (this.urlBalik) {
                window.top.location.href = this.urlBalik;
            }
        };
        this.pilihAnakTutupTbl.onclick = () => {
            this.pilihAnakFragment.style.display = 'none';
        };
    }
    async anakTambahForm() {
        this.pilihAnakFragment.style.display = 'flex';
        let anggotaAr;
        console.group('anak tambah form');
        console.log('list anggota');
        anggotaAr = await this.server.anggota.get();
        console.log('hasil, length ' + anggotaAr.length);
        console.log(anggotaAr);
        console.log('edit anak');
        console.log(this.editAnak);
        console.groupEnd();
        this.pilihAnggotaListCont.innerHTML = '';
        this.pilihJudul.innerHTML = 'Pilih Anak';
        anggotaAr.sort((item1, item2) => {
            if (item1.namaLengkap.charCodeAt(0) > item2.namaLengkap.charCodeAt(0))
                return 1;
            if (item1.namaLengkap.charCodeAt(0) < item2.namaLengkap.charCodeAt(0))
                return -1;
            return 0;
        });
        for (let i = 0; i < anggotaAr.length; i++) {
            let anggota = anggotaAr[i];
            let view = new ItemAnakDipilih();
            view.namaP.innerHTML = anggota.namaLengkap;
            view.anggota = anggota;
            view.attach(this.pilihAnggotaListCont);
            view.elHtml.onclick = () => {
                Util.loadingStart();
                this.anakDipilih(view).then(() => {
                    // Util.loadingEnd();
                    window.top.location.reload();
                }).catch((e) => {
                    console.log(e);
                    Util.loadingEnd();
                    Util.alertMsg(e.message);
                });
            };
        }
    }
    async anakDipilih(view) {
        console.group('anak dipilih, id ');
        console.log('id');
        console.log(view.anggota.id);
        if (!this.editAnak.rel) {
            throw new Error('data pasangan belum ada');
        }
        this.editAnak.rel.anaks.push(view.anggota.id);
        // view.anggota.orangTuaId = this.editAnak.rel.anak1;
        await this.editAnak.simpan();
        // await this.server.anggota.update(view.anggota);
        view.elHtml.onclick = null;
        this.pilihAnakFragment.style.display = 'none';
        console.log(this.editAnak.rel);
        console.groupEnd();
        // window.top.location.reload();
    }
    get pilihAnakFragment() {
        return Util.getEl('div.pilih-anak');
    }
    get pilihJudul() {
        return Util.getEl('div.pilih-anak p.judul');
    }
    get pilihAnggotaListCont() {
        return Util.getEl('div.pilih-anak div.list-cont');
    }
    get tutupBtn() {
        return Util.getEl('button.tutup');
    }
    get pilihAnakTutupTbl() {
        return Util.getEl('div.pilih-anak button.tutup');
    }
    get link() {
        return Util.getEl('a.link-silsilah');
    }
}
new EditProfilePage();
