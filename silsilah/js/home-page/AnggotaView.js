import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
import { Foto } from "./Foto.js";
export class AnggotaView extends BaseComponent {
    constructor() {
        super();
        this._viewAr = [];
        this.viewAnakAr = [];
        this.anaks = [];
        this.dataAnakDimuat = false;
        this.dataPasanganDimuat = false;
        this.dataDimuat = false;
        this.sudahDirender = false;
        this.fotoDimuat = false;
        // this.server;
        this._elHtml = Util.getTemplate('div#anggota');
    }
    init(client) {
        this._viewAr.push(this);
        this.server = client;
    }
    async memuat() {
        if (this.dataDimuat)
            return;
        await this.memuatDataAnak();
        await this.memuatFoto();
        await this.memuatDataPasangan();
        await this.memuatDataOrtu();
        this.dataDimuat = true;
    }
    async memuatFoto() {
        if (this.fotoDimuat)
            return;
        this.fotoDimuat = true;
        this.foto = await this.server.foto.getById(this.anggota.idFoto);
        console.log('memuat foto ' + this.anggota.nama + '/foto ' + this.foto);
    }
    async render() {
        if (this.sudahDirender)
            return;
        await this.renderAnak();
        await this.renderPasangan();
        this.sudahDirender = true;
    }
    renderHubung(idx) {
        console.log('render hubung ' + idx);
        if (idx == 0) {
            this.hubung.classList.add('kanan');
        }
        else if (idx == 1) {
            this.hubung.classList.add('tengah');
        }
        else if (idx == 2) {
            this.hubung.classList.add('kiri');
        }
        else if (idx == 3) {
            this.hubung2.style.display = 'table';
        }
    }
    async renderOrtu() {
        let foto;
        if (!this.ortu) {
            foto = new Foto();
            foto.pNama.innerText = "belum ada data";
            foto.attach(this.ortuCont);
            foto.lihatTbl.style.display = 'none';
            foto.utamaTbl.style.display = 'none';
            this.renderHubung(3);
        }
        else {
            foto = new Foto();
            foto.anggota = this.ortu;
            foto.pNama.innerText = this.ortu.nama;
            foto.img.src = this.fotoOrtu ? this.fotoOrtu.photoUrl : Util.defImage;
            foto.attach(this.ortuCont);
            foto.elHtml.onclick = () => {
                window.top.location.href = Util.urlHome + '?id=' + this.ortu.id;
            };
            foto.lihatTbl.style.display = 'none';
            foto.utamaTbl.style.display = 'none';
            this.renderHubung(3);
        }
    }
    renderFoto() {
        this._fotoSaya = new Foto();
        this._fotoSaya.pNama.innerText = this._anggota.nama;
        this._fotoSaya.anggota = this._anggota;
        this._fotoSaya.attach(this.sayaCont);
        this._fotoSaya.img.src = this.foto ? this.foto.photoUrl : Util.defImage;
        console.group('render foto');
        console.log('nama ' + this._anggota.nama);
        console.log('foto ' + this.foto);
        console.groupEnd();
        this._fotoSaya.elHtml.onclick = () => {
            Util.loadingStart();
            this.fotoClick().then(() => {
                Util.loadingEnd();
            }).catch((e) => {
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
    }
    async fotoClick() {
        console.log('click foto saya, tampilkan pasangan dan anak');
        await this.memuat();
        await this.render();
        if (this._fotoPasangan) {
            this._fotoPasangan.elHtml.classList.toggle('tampil');
            if (this._fotoPasangan.elHtml.classList.contains('tampil')) {
                this._fotoPasangan.fotoCont.style.float = 'left';
                this._fotoSaya.fotoCont.style.float = 'right';
            }
            else {
                this._fotoPasangan.fotoCont.style.float = 'none';
                this._fotoSaya.fotoCont.style.float = 'none';
            }
        }
        //TODO: pakai query
        for (let i = 0; i < this.viewAnakAr.length; i++) {
            this.viewAnakAr[i].elHtml.classList.toggle('tampil');
        }
        //hubung3
        this.hubung3.style.display = 'none';
        if (this.anaks && this.anaks.length > 0 && this._fotoPasangan && this._fotoPasangan.elHtml.classList.contains('tampil')) {
            this.hubung3.style.display = 'table';
        }
        this.sembunyikanTombolEditDanUtama();
        this._fotoSaya.lihatTbl.style.display = 'inline';
        this._fotoSaya.utamaTbl.style.display = 'inline';
    }
    sembunyikanTombolEditDanUtama() {
        document.body.querySelectorAll('button.edit').forEach((item) => {
            item.style.display = 'none';
        });
        document.body.querySelectorAll('button.utama').forEach((item) => {
            item.style.display = 'none';
        });
    }
    async renderAnak() {
        let view;
        let anak;
        for (let i = 0; i < this.anaks.length; i++) {
            anak = this.anaks[i];
            view = new AnggotaView();
            view.init(this.server);
            view.elHtml.classList.remove('tampil');
            view.viewAr = this._viewAr;
            view.anggota = anak;
            await view.memuatFoto();
            view.renderFoto();
            if (i == 0) {
                if (this.anaks.length > 1) {
                    view.renderHubung(0);
                }
                else {
                    view.renderHubung(3);
                }
            }
            else if (i == this.anaks.length - 1) {
                view.renderHubung(2);
            }
            else {
                view.renderHubung(1);
            }
            view.attach(this.anakCont);
            this.viewAnakAr.push(view);
        }
    }
    async memuatDataOrtu() {
        let rel = await this.server.relasi.getByAnakId(this.anggota.id);
        if (!rel)
            return;
        this.ortu = await this.server.anggota.getByDoc(rel.anak1);
        if (this.ortu) {
            this.fotoOrtu = await this.server.foto.getById(this.ortu.idFoto);
        }
        // console.log('memuat data ortu, hasil ' + this.ortu + ',id ' + this.anggota.orangTuaId);
    }
    async memuatDataPasangan() {
        if (this.dataPasanganDimuat)
            return;
        this.pasangan = await this.server.getPasangan(this._anggota.id);
        this.dataPasanganDimuat = true;
    }
    async memuatDataAnak() {
        if (this.dataAnakDimuat)
            return;
        this.anaks = await this.server.getAnak(this._anggota);
        this.dataAnakDimuat = true;
    }
    async renderPasangan() {
        if (!this.pasangan)
            return;
        this._fotoPasangan = new Foto();
        this._fotoPasangan.pNama.innerText = this.pasangan.nama;
        this._fotoPasangan.elHtml.classList.remove('tampil');
        this._fotoPasangan.anggota = this.pasangan;
        this._fotoPasangan.init();
        this._fotoPasangan.attach(this.sayaCont);
        //TODO: paka queryselector buat togle
        this._fotoPasangan.elHtml.onclick = () => {
            for (let i = 0; i < this._viewAr.length; i++) {
                this._viewAr[i].fotoSaya.lihatTbl.classList.remove('tampil');
            }
            this._fotoPasangan.lihatTbl.classList.add('tampil');
            this.sembunyikanTombolEditDanUtama();
            this._fotoPasangan.lihatTbl.style.display = 'inline';
            this._fotoPasangan.utamaTbl.style.display = 'inline';
        };
    }
    get ortuCont() {
        return this.getEl('div.ortu-cont');
    }
    get sayaCont() {
        return this.getEl('div.saya-cont');
    }
    get anakCont() {
        return this.getEl('div.anak-cont');
    }
    get hubung() {
        return this.getEl('div.hubung');
    }
    get hubung2() {
        return this.getEl('div.hubung2');
    }
    get hubung3() {
        return this.getEl('div.hubung3');
    }
    set viewAr(value) {
        this._viewAr = value;
    }
    get fotoSaya() {
        return this._fotoSaya;
    }
    get fotoPasangan() {
        return this._fotoPasangan;
    }
    get anggota() {
        return this._anggota;
    }
    set anggota(value) {
        this._anggota = value;
        if (!value)
            throw new Error();
    }
}
