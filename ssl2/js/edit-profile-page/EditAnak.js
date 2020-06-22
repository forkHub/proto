import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
import { ItemAnak } from "./ItemAnak.js";
export class EditAnak extends BaseComponent {
    constructor() {
        super();
        this.client = new FireBaseClient();
    }
    async init(client, rel, anaks) {
        this.client = client;
        this._rel = rel;
        this._elHtml = Util.getEl('div.anak-anak');
        this.renderAnak(anaks);
    }
    // async ambilDataAnak(): Promise<AnggotaObj[]> {
    // 	let anaks: AnggotaObj[] = [];
    // 	console.group('ambil data anak');
    // 	console.log(this._rel);
    // 	if (!this._rel) return [];
    // 	for (let i: number = 0; i < this._rel.anaks.length; i++) {
    // 		let anak: AnggotaObj = await this.client.anggota.getByDoc(this._rel.anaks[i]);
    // 		if (!anak) {
    // 			anak = new AnggotaObj();
    // 			anak.nama = 'error';
    // 			anak.namaLengkap = 'error';
    // 			anak.jkl = 'L';
    // 			anak.id = this._rel.anaks[i];
    // 		}
    // 		anaks.push(anak);
    // 	}
    // 	console.log('anaks');
    // 	console.log(anaks);
    // 	console.groupEnd();
    // 	return anaks;
    // }
    renderAnak(anaks) {
        console.log('render anak');
        console.log(anaks);
        for (let i = 0; i < anaks.length; i++) {
            let view = new ItemAnak();
            let anak = anaks[i];
            view.namaP.innerHTML = anak.namaLengkap;
            view.hapusTbl.onclick = () => {
                console.log('hapus tbl click');
                Util.loadingStart();
                this.anakHapus(anak).then(() => {
                    window.top.location.reload();
                }).catch((e) => {
                    console.log(e);
                    Util.loadingEnd();
                    Util.alertMsg(e.message);
                });
            };
            view.atasTbl.onclick = () => {
                console.log('atas tbl click');
                Util.loadingStart();
                this.anakGeserAtas(anak).then(() => {
                    Util.loadingEnd();
                    window.top.location.reload();
                }).catch((e) => {
                    console.log(e);
                    Util.loadingEnd();
                    Util.alertMsg(e.message);
                });
            };
            view.bawahTbl.onclick = () => {
                console.log('bawah tbl click');
                Util.loadingStart();
                this.anakGeserBawah(anak).then(() => {
                    window.top.location.reload();
                }).catch((e) => {
                    console.log(e);
                    Util.loadingEnd();
                    Util.alertMsg(e.message);
                });
            };
            view.attach(this.anakCont);
        }
    }
    async simpan() {
        console.log('simpan relasi');
        await this.client.relasi.update(this._rel);
    }
    async anakGeserAtas(anggota) {
        let idx = this._rel.anaks.indexOf(anggota.id);
        console.group('anak geser atas');
        console.log(this._rel.anaks);
        console.log('idx ' + idx);
        if (idx > 0) {
            let idx2 = this._rel.anaks[idx];
            this._rel.anaks[idx] = this._rel.anaks[idx - 1];
            this._rel.anaks[idx - 1] = idx2;
            console.log('getser atas');
            await this.simpan();
        }
        console.log(this._rel.anaks);
        console.groupEnd();
    }
    async anakGeserBawah(anggota) {
        let idx = this._rel.anaks.indexOf(anggota.id);
        console.group('anak geser bawah');
        console.log(this._rel.anaks);
        console.log('idx ' + idx);
        if (idx < this._rel.anaks.length - 1) {
            let idx2 = this._rel.anaks[idx];
            this._rel.anaks[idx] = this._rel.anaks[idx + 1];
            this._rel.anaks[idx + 1] = idx2;
            await this.simpan();
        }
        console.log(this._rel.anaks);
        console.groupEnd();
    }
    async anakHapus(anggota) {
        let idx = 0;
        console.group('anak hapus ' + anggota.id);
        idx = this._rel.anaks.indexOf(anggota.id);
        console.log('id ' + anggota.id);
        console.log('index ' + idx);
        if (idx >= 0) {
            this._rel.anaks.splice(idx, 1);
        }
        // await this.client.anggota.hapus(anggota.id);
        await this.client.relasi.update(this._rel);
        console.groupEnd();
        window.top.location.reload();
    }
    get anakCont() {
        return this.getEl('div.anak-cont');
    }
    get tambahTbl() {
        return this.getEl('button.tambah');
    }
    get rel() {
        return this._rel;
    }
}
