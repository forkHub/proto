import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
import { List } from "./List.js";
export class EditRelasi extends BaseComponent {
    // private rel: RelPasanganObj;
    constructor() {
        super();
        /*
        window.onload = () => {
            this.server.init().then(() => {
                let id: string = Util.getQuery('id');

                console.log('id ') + id;

                if (id) {
                    return this.server.relasi.getById(id);
                }
                else {
                    return new RelPasanganObj();
                }

            }).then((rel: RelPasanganObj) => {
                this.rel = rel;

                this._elHtml = Util.getEl('div.cont div.form');
                console.log(this._elHtml);

                this.anggota1Tbl.onclick = () => {
                    console.log('anggota 1 tbl click');

                    this.input = this.nama1Input;
                    this.inputId = this.id1input;
                    this.detach();
                    this.server.anggota.get().then((list: AnggotaObj[]) => {
                        this.renderList(list);
                    });
                }

                this.anggota2Tbl.onclick = () => {
                    console.log('anggota 2 click');
                    this.input = this.nama2Input;
                    this.inputId = this.id2input;
                    this.detach();
                    this.server.anggota.get().then((list: AnggotaObj[]) => {
                        this.renderList(list);
                    });
                }

                this.simpanTbl.onclick = () => {
                    this.rel.anak1 = (this.id1input.value);
                    this.rel.anak2 = (this.id2input.value);

                    this.server.relasi.insert(rel).then((id: string) => {
                        console.log('relasi baru berhasil di insert, id ' + id)
                    }).catch((e) => {
                        console.log(e);
                    });
                }
            });

        }
        */
    }
    renderList(list) {
        let daftarAnggota = new List();
        daftarAnggota.attach(this.cont);
        daftarAnggota.render(list);
        daftarAnggota.okTbl.onclick = () => {
            //TODO: validate item yang sama
            console.log('');
            this.input.value = daftarAnggota.itemDipilih.anggota.nama;
            this.inputId.value = daftarAnggota.itemDipilih.anggota.id + '';
            daftarAnggota.detach();
            daftarAnggota.destroy();
            this.attach(this.cont);
        };
    }
    get simpanTbl() {
        return this.getEl('button.simpan');
    }
    get anggota1Tbl() {
        return this.getEl('button.anggota1');
    }
    get anggota2Tbl() {
        return this.getEl('button.anggota2');
    }
    get nama1Input() {
        return this.getEl('input.nama1');
    }
    get nama2Input() {
        return this.getEl('input.nama2');
    }
    get id1input() {
        return this.getEl('input.id1');
    }
    get id2input() {
        return this.getEl('input.id2');
    }
    get cont() {
        return Util.getEl('div.cont');
    }
}
new EditRelasi();
