import { BaseComponent } from "../ha/BaseComponent.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
import { AnggotaObj } from "../ent/AnggotaObj.js";
import { Item } from "./Item.js";
import { Util } from "../Util.js";
export class DaftarAnggotaPage extends BaseComponent {
    constructor() {
        super();
        this.client = new FireBaseClient();
        Util.loadingStart();
        window.onload = () => {
            this._elHtml = Util.getEl('div.cont');
            this.init().then(() => {
                Util.loadingEnd();
            }).catch((e) => {
                console.log(e);
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
    }
    async init() {
        await this.client.init();
        this.anggota = await this.client.anggota.get();
        this.anggotaRenderAr = this.anggota.slice();
        this.renderList(this.anggota);
        this.cariInput.oninput = () => {
            this.anggotaRenderAr = this.anggota.filter((item) => {
                return item.namaLengkap.toLocaleLowerCase().indexOf(this.cariInput.value.toLowerCase()) > -1;
            });
            this.renderList(this.anggotaRenderAr);
        };
        this.formSearch.onsubmit = () => {
            return false;
        };
        this.formTambahAnggota.onsubmit = () => {
            try {
                let anggota = new AnggotaObj();
                anggota.namaLengkap = this.inputNama.value;
                Util.loadingStart();
                this.client.anggota.insert(anggota).then((id) => {
                    console.log('success ' + id);
                    Util.bukaEditProfile(id, window.top.location.href);
                    return false;
                }).catch((e) => {
                    console.log(e);
                    console.log(e.message);
                    Util.alertMsg(e.message);
                    return false;
                });
                return false;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        };
    }
    reload() {
        window.top.location.href = Util.urlDaftarAnggota + "?r=" + Math.floor(Math.random() * 1000);
    }
    renderList(items) {
        this.listCont.innerText = '';
        items.sort((item1, item2) => {
            if (item1.namaLengkap.charCodeAt(0) > item2.namaLengkap.charCodeAt(0))
                return 1;
            if (item1.namaLengkap.charCodeAt(0) < item2.namaLengkap.charCodeAt(0))
                return -1;
            return 0;
        });
        items.forEach((item) => {
            let view = new Item();
            console.log(item);
            view.id = item.id;
            view.namaP.innerHTML = item.namaLengkap + " (" + item.nama + ")";
            view.attach(this.listCont);
            view.elHtml.onclick = () => {
                console.log(view.elHtml.querySelectorAll('div.group-tbl'));
                this.listCont.querySelectorAll('div.group-tbl').forEach((item) => {
                    item.classList.add('sembunyi');
                });
                view.groupTbl.classList.remove('sembunyi');
            };
            view.silsilahTbl.onclick = () => {
                window.top.location.href = Util.urlHome + "?id=" + item.id;
            };
            view.editTbl.onclick = (e) => {
                e.stopPropagation();
                console.log(view);
                Util.bukaEditProfile(view.id, window.top.location.href);
            };
            view.hapusTbl.onclick = (e) => {
                e.stopPropagation();
                console.log(view);
                Util.loadingStart();
                this.client.anggota.hapus(view.id).then(() => {
                    this.reload();
                }).catch((e) => {
                    Util.loadingEnd();
                    console.log(e);
                    Util.alertMsg(e.message);
                });
            };
        });
    }
    get listCont() {
        return this.getEl('div.list-item-cont');
    }
    get inputNama() {
        return this.getEl('form.form-anggota-baru input[name="nama"]');
    }
    get simpanTbl() {
        return this.getEl('form.form-anggota-baru button.simpan');
    }
    get tambahTbl() {
        return this.getEl('button.tambah');
    }
    get formTambahAnggota() {
        return this.getEl('form.form-anggota-baru');
    }
    get formSearch() {
        return this.getEl('form.search');
    }
    get cariInput() {
        return this.getEl('input.search');
    }
}
new DaftarAnggotaPage();
