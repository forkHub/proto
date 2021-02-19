import { data, Foto, Hubung, KotakView } from "./Data.js";
import { db } from "./Db.js";
import { viewProfile } from "./HalViewProfile.js";
class AnggotaController {
    constructor() {
    }
    normalise(anggota) {
        anggota.buka = false;
        anggota.populate = false;
        //TODO: dep
        if (anggota.pasangan) {
            anggota.stPasangan = false;
            anggota.pasangan.pasangan = anggota;
            anggota.pasangan.stPasangan = true;
        }
        if (!anggota.anak2)
            anggota.anak2 = [];
        //TODO: dep
        anggota.anak2.forEach((item) => {
            item.induk = anggota;
            this.normalise(item);
        });
    }
    populate(anggota) {
        if (anggota.populate)
            return;
        if (anggota.pasanganId && !anggota.pasangan) {
            anggota.pasangan = db.getById(anggota.pasanganId);
            this.normalise(anggota.pasangan);
            if (anggota.view) {
                this.renderFoto(anggota.pasangan, anggota.view.istriCont);
                this.updateViewToggle(anggota);
                this.updateViewToggle(anggota.pasangan);
            }
        }
        anggota.anak2 = [];
        anggota.anak2 = db.getByInduk(anggota.id).slice();
        anggota.anak2.forEach((item) => {
            this.normalise(item);
        });
        anggota.populate = true;
        if (anggota.view) {
            this.renderAnak(anggota);
        }
        console.log('populate');
    }
    renderAnak(anggota) {
        anggota.view.anakCont.innerHTML = '';
        anggota.anak2.forEach((item, idx) => {
            item.induk = anggota;
            let l = anggota.anak2.length;
            if (l == 1) {
                this.renderAnggota(item, anggota.view.anakCont, 0);
            }
            else if (l == 2) {
                if (idx == 0) {
                    this.renderAnggota(item, anggota.view.anakCont, 1);
                }
                else {
                    this.renderAnggota(item, anggota.view.anakCont, 3);
                }
            }
            else {
                if (idx == 0) {
                    this.renderAnggota(item, anggota.view.anakCont, 1);
                }
                else if (idx == (l - 1)) {
                    this.renderAnggota(item, anggota.view.anakCont, 3);
                }
                else {
                    this.renderAnggota(item, anggota.view.anakCont, 2);
                }
            }
            this.updateViewToggle(item);
        });
    }
    hapusAnak(anggota, anak) {
        for (let i = 0; i < anggota.anak2.length; i++) {
            if (anggota.anak2[i] == anak) {
                let anakHapus = anggota.anak2.splice(i, 1)[0];
                db.hapus(anakHapus.id);
            }
        }
    }
    resetMenuPopUp() {
        if (data.menuAktif)
            data.menuAktif.style.display = null;
        if (data.popupAktif)
            data.popupAktif.style.display = null;
        data.menuAktif = null;
        data.popupAktif = null;
    }
    toggle(anggota) {
        anggota.buka = !anggota.buka;
        if (anggota.buka) {
            anggota;
        }
        else {
        }
    }
    updateViewToggle(anggota) {
        //status terbuka
        if (anggota.buka) {
            //ada anak
            if (anggota.view && anggota.view.anakCont) {
                anggota.view.anakCont.style.display = 'table';
            }
            //punya pasangan
            if (anggota.pasangan) {
                //suami
                if (!anggota.stPasangan) {
                    anggota.view.istriCont.style.display = 'table-cell';
                    anggota.view.suamiCont.style.textAlign = 'right';
                }
                else {
                    //istri
                }
            }
            //jomblo
            else {
                //suami
                if (!anggota.stPasangan) {
                    anggota.view.istriCont.style.display = 'none';
                    anggota.view.suamiCont.style.textAlign = 'center';
                }
                //istri error
                else {
                }
            }
        }
        //anggota tutup
        else {
            if (anggota.view && anggota.view.anakCont) {
                anggota.view.anakCont.style.display = 'none';
            }
            //punya pasangan
            if (anggota.pasangan) {
                //suami
                if (!anggota.stPasangan) {
                    anggota.view.istriCont.style.display = 'none';
                    anggota.view.suamiCont.style.textAlign = 'center';
                    // anggota.view.istriCont.classList.remove('normal');
                    // anggota.view.istriCont.classList.add('sembunyi');
                }
                //istri
                else {
                }
            }
            //jomblo
            else {
                if (anggota.view) {
                    anggota.view.istriCont.style.display = 'none';
                    anggota.view.suamiCont.style.textAlign = 'center';
                }
            }
        }
    }
    renderFoto(anggota, view) {
        let foto = new Foto();
        anggota.viewFoto = foto;
        foto.namaDiv.innerHTML = anggota.nama;
        foto.attach(view);
        foto.elHtml.onclick = (e) => {
            e.stopPropagation();
            this.resetMenuPopUp();
            console.log('foto on click');
            if (!anggota.populate) {
                this.populate(anggota);
                anggota.buka = true;
            }
            else {
                anggota.buka = !anggota.buka;
            }
            this.updateViewToggle(anggota);
        };
        foto.tombolMenuBtn.onclick = (e) => {
            e.stopPropagation();
            console.log('foto button click');
            foto.menuPopupDiv.style.display = 'block';
            if (data.popupAktif) {
                data.popupAktif.style.display = 'none';
            }
            data.popupAktif = foto.menuPopupDiv;
            foto.tambahPasanganTbl.style.display = 'block';
            foto.tambahAnakTbl.style.display = 'block';
            if (anggota.pasangan) {
                foto.tambahPasanganTbl.style.display = 'none';
            }
            if (anggota.stPasangan) {
                foto.tambahPasanganTbl.style.display = 'none';
                foto.tambahAnakTbl.style.display = 'none';
            }
        };
        foto.hapusTbl.onclick = (e) => {
            e.stopPropagation();
            console.log('hapus tombol');
            console.log('status pasangan ' + anggota.stPasangan);
            if (!anggota.stPasangan) {
                //hapus suami
                this.hapusAnak(anggota.induk, anggota);
                this.renderAnak(anggota.induk);
                db.hapus(anggota.id);
                // db.simpan();
            }
            else {
                //hapus istri
                let suami = anggota.pasangan;
                anggota.viewFoto.detach();
                suami.pasangan = null;
                anggota.pasangan = null;
                db.hapus(anggota.id);
                // db.simpan();
                this.updateViewToggle(suami);
            }
            this.resetMenuPopUp();
        };
        foto.profileTbl.onclick = (e) => {
            e.stopPropagation();
            this.resetMenuPopUp();
            viewProfile.tampil(anggota);
            viewProfile.selesai = () => {
                foto.namaDiv.innerHTML = anggota.nama;
                db.update(anggota.id, anggota);
            };
        };
        foto.tambahPasanganTbl.onclick = (e) => {
            e.stopPropagation();
            this.resetMenuPopUp();
            let pasangan = db.buatAnggotaObj();
            pasangan.stPasangan = true;
            pasangan.pasangan = anggota;
            anggota.pasangan = pasangan;
            anggota.buka = true;
            this.renderFoto(anggota.pasangan, anggota.view.istriCont);
            db.baru(anggota.pasangan);
            this.updateViewToggle(anggota);
        };
        foto.tambahAnakTbl.onclick = (e) => {
            e.stopPropagation();
            this.resetMenuPopUp();
            let anak = db.buatAnggotaObj();
            anak.induk = anggota;
            anggota.anak2.push(anak);
            anggota.buka = true;
            this.renderAnak(anggota);
            db.baru(anak);
            this.updateViewToggle(anggota);
        };
        foto.debugTbl.onclick = (e) => {
            e.stopPropagation();
            this.resetMenuPopUp();
            console.log(anggota);
        };
    }
    renderHubung(view, hubung) {
        view.kanan.classList.remove('border-kanan', 'border-kiri', 'border-atas', 'border-bawah');
        view.kiri.classList.remove('border-kanan', 'border-kiri', 'border-atas', 'border-bawah');
        if (hubung == -1) {
        }
        else if (hubung == 0) {
            view.kanan.classList.add('border-kiri');
            view.kiri.classList.add('border-kanan');
        }
        else if (hubung == 1) {
            view.kiri.classList.add('border-kanan');
            view.kanan.classList.add('border-atas');
            view.kanan.classList.add('border-kiri');
        }
        else if (hubung == 2) {
            view.kiri.classList.add('border-kanan');
            view.kiri.classList.add('border-atas');
            view.kanan.classList.add('border-atas');
            view.kanan.classList.add('border-kiri');
        }
        else if (hubung == 3) {
            view.kiri.classList.add('border-atas');
            view.kiri.classList.add('border-kanan');
            view.kanan.classList.add('border-kiri');
        }
    }
    renderContainer(anggota, hubung) {
        let view = new KotakView();
        let hubungView = new Hubung();
        anggota.view = view;
        hubungView.attach(view.hubungCont);
        this.renderHubung(hubungView, hubung);
        return view;
    }
    renderAnggota(anggota, cont, hubung) {
        let viewLayout = this.renderContainer(anggota, hubung);
        viewLayout.attach(cont);
        this.renderFoto(anggota, viewLayout.suamiCont);
        //render info istri
        let pasangan = anggota.pasangan;
        if (pasangan) {
            pasangan.pasangan = anggota;
            this.renderFoto(pasangan, viewLayout.istriCont);
        }
        this.renderAnak(anggota);
        this.updateViewToggle(anggota);
    }
}
export var anggotaController = new AnggotaController();
