import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
export class PilihAnggota extends BaseComponent {
    constructor() {
        super();
        this.anggotaAr = [];
        this._elHtml = Util.getEl('div.cont div.pilih-anak');
    }
    init(server) {
        this.server = server;
        this.tutupTbl.onclick = () => {
            this._elHtml.style.display = 'none';
        };
        this.formSearch.onsubmit = () => {
            return false;
        };
        this.cariInput.oninput = () => {
            let anggotaRenderAr = [];
            anggotaRenderAr = this.anggotaAr.filter((item) => {
                if (item.namaLengkap.toLocaleLowerCase().indexOf(this.cariInput.value.toLowerCase()) > -1) {
                    return true;
                }
                ;
                if (item.keterangan.toLocaleLowerCase().indexOf(this.cariInput.value.toLowerCase()) > -1) {
                    return true;
                }
                ;
                return false;
            });
            this.render(anggotaRenderAr);
        };
    }
    async ambilDataSemuaAnggota() {
        return this.server.anggota.get();
    }
    render(anggotaAr) {
        this.listCont.innerHTML = '';
        for (let i = 0; i < anggotaAr.length; i++) {
            let anggota = anggotaAr[i];
            let view = new ItemPilihAnggota();
            view.namaP.innerHTML = anggota.namaLengkap + " (" + anggota.nama + ") - " + anggota.keterangan;
            view.anggota = anggota;
            view.attach(this.listCont);
            view.elHtml.onclick = () => {
                view.elHtml.onclick = null;
                this.itemOnClick(anggota);
            };
        }
    }
    itemOnClick(anggota) {
        Util.loadingStart();
        this.handler.anggotaDipilih(anggota, this.mode).then(() => {
            // window.top.location.reload();
        }).catch((e) => {
            console.log(e);
            Util.loadingEnd();
            Util.alertMsg(e.message);
        });
    }
    async tampil(judul, handler, mode) {
        // let anggotaAr: AnggotaObj[] = [];
        this._elHtml.style.display = 'flex';
        this.judulP.innerHTML = judul;
        this.handler = handler;
        this.mode = mode;
        Util.loadingStart();
        this.anggotaAr = await this.ambilDataSemuaAnggota();
        this.anggotaAr.sort((item1, item2) => {
            if (item1.namaLengkap < item2.namaLengkap)
                return -1;
            if (item1.namaLengkap > item2.namaLengkap)
                return 1;
            return 0;
        });
        this.render(this.anggotaAr);
        Util.loadingEnd();
    }
    get listCont() {
        return this.getEl('div.list-cont');
    }
    get judulP() {
        return this.getEl('p.judul');
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get formSearch() {
        return this.getEl('form.search');
    }
    get cariInput() {
        return this.getEl('input.search');
    }
}
PilihAnggota.PILIH_PASANGAN = 1;
PilihAnggota.PILIH_ANAK = 2;
export class ItemPilihAnggota extends BaseComponent {
    constructor() {
        super();
        this._elHtml = Util.getTemplate('div.item-anak-dipilih');
    }
    get namaP() {
        return this.getEl('p.nama');
    }
    get anggota() {
        return this._anggota;
    }
    set anggota(value) {
        this._anggota = value;
    }
}
