import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
import { Foto } from "./Foto.js";
export class AnggotaView extends BaseComponent {
    constructor() {
        super();
        this._viewAr = [];
        this.viewAnakAr = [];
        this.anaks = [];
        this.sudahDirender = false;
        this.errMsg = [];
        this.anakSudahDimuat = false;
        this.pasanganSudahDimuat = false;
        // this.server;
        this._elHtml = Util.getTemplate('div#anggota');
    }
    init(client) {
        this._viewAr.push(this);
        this.server = client;
    }
    async memuatDataRelPasangan(id) {
        console.group('memuat data relasi pasangan');
        if (this.relPasangan) {
            console.log('relasi sudah dimuat');
            console.groupEnd();
            return;
        }
        try {
            console.log('start');
            this.relPasangan = await this.server.relasi.getByAnggotaId(id);
            console.log('hasil:');
            console.log(this.relPasangan);
        }
        catch (e) {
            console.log('error');
            console.log(e);
        }
        console.log('memuat data rel pasangan selesai');
        console.groupEnd();
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
        if (this.ortu.isDefault) {
            foto = new Foto();
            foto.pNama.innerText = this.ortu.nama;
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
    renderSaya() {
        this._fotoSaya = new Foto();
        this._fotoSaya.pNama.innerText = this._anggota.nama;
        this._fotoSaya.anggota = this._anggota;
        this._fotoSaya.attach(this.sayaCont);
        this._fotoSaya.img.src = this._anggota.thumbUrl;
        console.group('render foto');
        console.log('nama ' + this._anggota.nama);
        console.log('foto ' + this.foto);
        console.groupEnd();
        this._fotoSaya.elHtml.onclick = () => {
            Util.loadingStart();
            this.fotoDiClick().then(() => {
                Util.loadingEnd();
            }).catch((e) => {
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
    }
    async fotoDiClick() {
        console.group('click foto saya, tampilkan pasangan dan anak');
        console.log('memuat data pasangan');
        await this.memuatDataPasangan(this._anggota.id);
        console.log('memuat data anak');
        await this.memuatDataAnak();
        console.log('check sudah di render');
        if (!this.sudahDirender) {
            this.sudahDirender = true;
            console.log('render pasangan');
            await this.renderPasangan();
            console.log('render anak');
            await this.renderAnak();
        }
        else {
            console.log('sudah di render');
        }
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
        console.log('click foto selesai');
        console.groupEnd();
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
            view.renderSaya();
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
    async getAnggota(id, msg = 'gagal meload data') {
        let hasil;
        try {
            hasil = await this.server.anggota.getByDoc(id);
            if (!hasil) {
                hasil = Util.anakError();
                this.errMsg.push(msg);
            }
        }
        catch (e) {
            hasil = Util.anakError();
            this.errMsg.push(msg);
        }
        return hasil;
    }
    async memuatDataOrtu(id) {
        let rel;
        try {
            rel = await this.server.relasi.getByAnakId(id);
            if (rel) {
                this.ortu = await this.getAnggota(rel.anak1, 'Tidak bisa memuat data orang tua');
            }
            else {
                this.ortu = Util.anakError();
                this.ortu.nama = 'Tidak ada data';
                this.errMsg.push('tidak bisa memuat data orang tua');
            }
        }
        catch (e) {
            this.ortu = Util.anakError();
            this.errMsg.push('tidak bisa memuat data orang tua');
        }
        if (this.ortu && ("" != this.ortu.idFoto)) {
            let foto = await this.server.foto.getByIdOrDefault(this.ortu.idFoto);
            this.ortu.fotoUrl = foto.photoUrl;
            this.ortu.thumbUrl = foto.thumbUrl;
        }
    }
    async memuatDataPasangan(id) {
        console.group('memuat data pasangan');
        if (this.pasanganSudahDimuat) {
            console.log('pasangan sudah dimuat');
            console.groupEnd();
            return;
        }
        this.pasanganSudahDimuat = true;
        let idPas;
        await this.memuatDataRelPasangan(id);
        if (!this.relPasangan) {
            console.log('relasi pasangan tidak ditemukan');
            console.groupEnd();
            return;
        }
        if (this.relPasangan.anak1 == id)
            idPas = this.relPasangan.anak2;
        if (this.relPasangan.anak2 == id)
            idPas = this.relPasangan.anak1;
        this.pasangan = await this.getAnggota(idPas);
        let foto = await this.server.foto.getByIdOrDefault(this.pasangan.id);
        this.pasangan.fotoUrl = foto.photoUrl;
        this.pasangan.thumbUrl = foto.thumbUrl;
        console.log('memuat data pasangan selesai');
        console.groupEnd();
    }
    async memuatDataAnak() {
        console.group('memuat data anak');
        if (!this.relPasangan) {
            console.log('rel pasangan tidak ada');
            console.groupEnd();
            return;
        }
        if (this.anakSudahDimuat) {
            console.log('data sudah dimuat');
            console.groupEnd();
            return;
        }
        this.anakSudahDimuat = true;
        this.anaks = [];
        for (let i = 0; i < this.relPasangan.anaks.length; i++) {
            let anak = await this.getAnggota(this.relPasangan.anaks[i]);
            if ("" != anak.idFoto) {
                let fotoObj = await this.server.foto.getByIdOrDefault(anak.idFoto);
                anak.fotoUrl = fotoObj.photoUrl;
                anak.thumbUrl = fotoObj.thumbUrl;
            }
            else {
                console.log('default image');
                anak.fotoUrl = Util.defImage;
                anak.thumbUrl = Util.defImage;
            }
            this.anaks.push(anak);
        }
        console.groupEnd();
    }
    // async memuatDataFoto(id: string): Promise<void> {
    // 	let foto: FotoObj = await this.getFotoObj(id);
    // 	this._anggota.fotoUrl = foto.photoUrl;
    // 	this._anggota.thumbUrl = foto.thumbUrl;
    // }
    async renderPasangan() {
        if (!this.pasangan)
            return;
        this._fotoPasangan = new Foto();
        this._fotoPasangan.pNama.innerText = this.pasangan.nama;
        this._fotoPasangan.elHtml.classList.remove('tampil');
        this._fotoPasangan.anggota = this.pasangan;
        this._fotoPasangan.img.src = this.pasangan.thumbUrl;
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
