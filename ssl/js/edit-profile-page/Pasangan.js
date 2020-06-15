import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
export class Pasangan extends BaseComponent {
    constructor() {
        super();
    }
    async init(anggota, rel, client) {
        console.log('Pasangan init');
        this._elHtml = Util.getEl('div.cont div.pasangan');
        let pasangan = await this.getPasangan(anggota, rel, client);
        if (pasangan) {
            this.namaInput.value = pasangan.namaLengkap;
            this.tambahTbl.style.display = 'none';
            this.hapusTbl.style.display = 'block';
        }
        else {
            this.tambahTbl.style.display = 'block';
            this.hapusTbl.style.display = 'none';
        }
        this.hapusTbl.onclick = () => {
            console.log('hapus tombol di click');
            Util.loadingStart();
            this.hapusPasangan2(rel, client).then(() => {
                Util.loadingEnd();
                // window.top.location.reload();
            }).catch((e) => {
                console.log(e.message);
                console.log(e);
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
    }
    async hapusPasangan2(rel, client) {
        if (rel) {
            await client.relasi.hapus(rel);
        }
        else {
            throw new Error('data tidak ditemukan');
        }
    }
    // async hapusPasangan(rel: RelPasanganObj, anggota: AnggotaObj, client: FireBaseClient): Promise<void> {
    // 	console.group('hapus pasangan');
    // 	console.log(rel);
    // 	console.log(anggota);
    // 	if (rel.anak1 && rel.anak1 == anggota.id) {
    // 		console.log('hapus anak 2');
    // 		rel.anak2 = '';
    // 		await client.relasi.update(rel);
    // 	}
    // 	if (rel.anak2 && rel.anak2 == anggota.id) {
    // 		console.log('hapus anak 1');
    // 		rel.anak1 = '';
    // 		await client.relasi.update(rel);
    // 	}
    // 	console.log('sukses');
    // 	console.groupEnd();
    // }
    async getPasangan(anggota, rel, client) {
        console.group('ambil data pasangan');
        console.log('data anggota');
        console.log(anggota);
        console.log('data relasi');
        console.log(rel);
        if (!rel)
            return null;
        if (rel.anak1 && anggota.id == rel.anak1 && rel.anak2) {
            let pasangan = (await client.anggota.getByDoc(rel.anak2));
            console.log('hasil, pasangan:');
            console.log(pasangan);
            console.groupEnd();
            return pasangan;
        }
        if (rel.anak2 && anggota.id == rel.anak2 && rel.anak1) {
            let pasangan = (await client.anggota.getByDoc(rel.anak1));
            console.log('hasil, pasangan:');
            console.log(pasangan);
            console.groupEnd();
            return pasangan;
        }
        console.log('hasil tidak ditemukan');
        console.groupEnd();
        return null;
    }
    get namaInput() {
        return this.getEl('input.nama');
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
    get tambahTbl() {
        return this.getEl('button.tambah');
    }
}
