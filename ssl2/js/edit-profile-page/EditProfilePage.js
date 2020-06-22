import { Util } from "../Util.js";
import { AnggotaObj } from "../ent/AnggotaObj.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
import { Profile } from "./Profile.js";
import { EditFoto } from "./EditFoto.js";
import { PilihFoto } from "./PilihFoto.js";
import { EditAnak } from "./EditAnak.js";
import { PilihAnggota } from "./PilihAnggota.js";
import { RelPasanganObj } from "../ent/RelPasanganObj.js";
import { Pasangan } from "./Pasangan.js";
export class EditProfilePage {
    constructor() {
        this.server = new FireBaseClient();
        this.id = '';
        this.urlBalik = '';
        this.pilihAnggota = new PilihAnggota();
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
    async anggotaDipilih(anggota, mode) {
        Util.loadingStart();
        if (mode == PilihAnggota.PILIH_PASANGAN) {
            let rel = new RelPasanganObj();
            rel.anak1 = this.anggota.id;
            rel.anak2 = anggota.id;
            await this.server.relasi.insert(rel);
            window.top.location.reload();
        }
        else if (PilihAnggota.PILIH_ANAK == mode) {
            console.group('anak dipilih, id ');
            console.log('id');
            console.log(anggota.id);
            if (!this.editAnak.rel) {
                throw new Error('data pasangan belum ada');
            }
            this.editAnak.rel.anaks.push(anggota.id);
            await this.editAnak.simpan();
            window.top.location.reload();
            console.groupEnd();
        }
        else {
            console.error('mode tidak ada');
        }
    }
    async ambilDataAnak(rel) {
        let anaks = [];
        console.group('ambil data anak');
        console.log(this.rel);
        if (!this.rel)
            return [];
        for (let i = 0; i < rel.anaks.length; i++) {
            let anak = await this.server.anggota.getByDoc(rel.anaks[i]);
            if (!anak) {
                anak = new AnggotaObj();
                anak.nama = 'error';
                anak.namaLengkap = 'error';
                anak.jkl = 'L';
                anak.id = rel.anaks[i];
            }
            anaks.push(anak);
        }
        console.log('anaks');
        console.log(anaks);
        console.groupEnd();
        return anaks;
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
        this.anaks = await this.ambilDataAnak(this.rel);
        this.pilihFoto = new PilihFoto();
        this.pilihFoto.init(this.server);
        this.pilihAnggota.init(this.server);
        this.editFoto = new EditFoto();
        await this.editFoto.init(this.server, this.anggota);
        this.profile = new Profile();
        await this.profile.init(this.anggota, this.server);
        this.editAnak = new EditAnak();
        await this.editAnak.init(this.server, this.rel, this.anaks);
        this.pasangan = new Pasangan();
        await this.pasangan.init(this.anggota, this.rel, this.server);
        this.pasangan.tambahTbl.onclick = () => {
            this.pilihAnggota.tampil('Pilih Pasangan', this, PilihAnggota.PILIH_PASANGAN);
        };
        this.editAnak.tambahTbl.onclick = () => {
            this.pilihAnggota.tampil('Pilih Anak', this, PilihAnggota.PILIH_ANAK);
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
    // pilihAnggotaForm(anggotaAr: AnggotaObj[], judul: string, dipilih: Function): void {
    // 	this.pilihAnakFragment.style.display = 'flex';
    // 	// let anggotaAr: AnggotaObj[];
    // 	this.pilihAnggotaListCont.innerHTML = '';
    // 	this.pilihJudul.innerHTML = judul;
    // 	anggotaAr.sort((item1: AnggotaObj, item2: AnggotaObj) => {
    // 		if (item1.namaLengkap.charCodeAt(0) > item2.namaLengkap.charCodeAt(0)) return 1;
    // 		if (item1.namaLengkap.charCodeAt(0) < item2.namaLengkap.charCodeAt(0)) return -1;
    // 		return 0;
    // 	})
    // 	for (let i: number = 0; i < anggotaAr.length; i++) {
    // 		let anggota: AnggotaObj = anggotaAr[i];
    // 		let view: ItemPilihAnggota = new ItemPilihAnggota();
    // 		view.namaP.innerHTML = anggota.namaLengkap + " (" + anggota.nama + ") - " + anggota.keterangan;
    // 		view.anggota = anggota;
    // 		view.attach(this.pilihAnggotaListCont);
    // 		view.elHtml.onclick = () => {
    // 			Util.loadingStart();
    // 			dipilih(view).then(() => {
    // 				window.top.location.reload();
    // 			}).catch((e: Error) => {
    // 				console.log(e);
    // 				Util.loadingEnd();
    // 				Util.alertMsg(e.message);
    // 			});
    // 		}
    // 	}
    // }
    // async anakDipilih(view: ItemPilihAnggota): Promise<void> {
    // 	console.group('anak dipilih, id ');
    // 	console.log('id');
    // 	console.log(view.anggota.id);
    // 	if (!this.editAnak.rel) {
    // 		throw new Error('data pasangan belum ada');
    // 	}
    // 	this.editAnak.rel.anaks.push(view.anggota.id);
    // 	await this.editAnak.simpan();
    // 	view.elHtml.onclick = null;
    // 	this.pilihAnakFragment.style.display = 'none';
    // 	console.log(this.editAnak.rel);
    // 	console.groupEnd();
    // }
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
