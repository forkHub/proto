import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
export class EditFoto extends BaseComponent {
    constructor() {
        super();
    }
    async init(client, anggota, pilihFoto) {
        this.anggota = anggota;
        this.client = client;
        this.pilihFoto = pilihFoto;
        this._elHtml = Util.getEl('div.edit-foto');
        this.editTbl.onclick = () => {
            Util.loadingStart();
            this.editTblClick2().then(() => {
                Util.loadingEnd();
            }).catch((e) => {
                console.log(e);
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
        this.hapusTbl.onclick = () => {
            Util.loadingStart();
            this.hapusPhoto().then(() => {
                Util.loadingEnd();
                // window.top.location.reload();
            }).catch((e) => {
                Util.alertMsg(e.message);
            });
        };
        await this.loadImage();
    }
    async hapusPhoto() {
        this.client.foto.hapus(this.fotoObj);
    }
    async editTblClick2() {
        // window.top.lo
        Util.bukaUploadPhoto2(this.anggota.id, window.top.location.href);
    }
    async editTblClick() {
        console.log('edit foto click');
        await this.pilihFoto.render();
        this.pilihFoto.elHtml.style.display = 'flex';
        this.pilihFoto.fotoDipilih = (foto) => {
            console.log('foto dipilih');
            Util.loadingStart();
            this.fotoDipilih(foto).then(() => {
                Util.loadingEnd();
                window.top.location.reload();
            }).catch((e) => {
                console.log(e);
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
        this.pilihFoto.batalBtn.onclick = () => {
            this.pilihFoto.detach();
        };
    }
    async fotoDipilih(foto) {
        this.img.src = foto.photoUrl;
        this.anggota.idFoto = foto.id;
        await this.client.anggota.update(this.anggota);
    }
    async loadImage() {
        console.group('load photo');
        console.log('id foto ' + this.anggota.idFoto);
        console.log('foto obj:');
        console.log(this.fotoObj);
        await this.client.foto.getById(this.anggota.idFoto).then((item) => {
            if (item) {
                this.fotoObj = item;
                this.img.src = item.photoUrl;
                this.editTbl.style.display = 'none';
                this.hapusTbl.style.display = 'block';
            }
            else {
                this.editTbl.style.display = 'block';
                this.hapusTbl.style.display = 'none';
            }
        });
        console.log('hasil:');
        console.log(this.fotoObj);
        console.groupEnd();
    }
    get img() {
        return this.getEl('img');
    }
    get editTbl() {
        return this.getEl('button.edit');
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
}
