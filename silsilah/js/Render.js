import { Foto, Hubung, KotakView, data } from "./Data.js";
// import { db } from "./Db.js";
// import { viewProfile } from "./HalViewProfile.js";
class Render {
    /**
     * Render foto
     *
     * @param anggota
     * @param view
     */
    renderFoto(anggota, view) {
        let foto = new Foto();
        anggota.viewFoto = foto;
        foto.namaDiv.innerHTML = anggota.nama;
        foto.attach(view);
    }
    resetMenuPopUp() {
        if (data.menuAktif)
            data.menuAktif.style.display = null;
        if (data.popupAktif)
            data.popupAktif.style.display = null;
        data.menuAktif = null;
        data.popupAktif = null;
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
    renderContainer(hubung) {
        let view = new KotakView();
        let hubungView = new Hubung();
        hubungView.attach(view.hubungCont);
        this.renderHubung(hubungView, hubung);
        return view;
    }
    /**
     * Render anak
     * Hanya merender yang sudah di populate saja
     *
     * @param ortu
     */
    renderAnak(ortu) {
        ortu.view.anakCont.innerHTML = '';
        ortu.anak2.forEach((anak, idx) => {
            let l = ortu.anak2.length;
            if (l == 1) {
                this.renderAnggota(anak, ortu.view.anakCont, 0);
            }
            else if (l == 2) {
                if (idx == 0) {
                    this.renderAnggota(anak, ortu.view.anakCont, 1);
                }
                else {
                    this.renderAnggota(anak, ortu.view.anakCont, 3);
                }
            }
            else {
                if (idx == 0) {
                    this.renderAnggota(anak, ortu.view.anakCont, 1);
                }
                else if (idx == (l - 1)) {
                    this.renderAnggota(anak, ortu.view.anakCont, 3);
                }
                else {
                    this.renderAnggota(anak, ortu.view.anakCont, 2);
                }
            }
            this.updateViewToggle(anak);
        });
    }
    updateViewToggle(anggota) {
        console.log('update view toggle');
        //status terbuka
        if (anggota.buka) {
            console.log('anggota buka');
            //ada anak
            if (anggota.view && anggota.view.anakCont) {
                console.log('render anak');
                anggota.view.anakCont.style.display = 'table';
            }
            //punya pasangan
            if (anggota.pasanganObj) {
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
            console.log('status tutup');
            if (anggota.view && anggota.view.anakCont) {
                console.log('tutup anak');
                anggota.view.anakCont.style.display = 'none';
            }
            //punya pasangan
            if (anggota.pasanganObj) {
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
    renderPasangan(anggota) {
        let pasangan = anggota.pasanganObj;
        if (pasangan) {
            pasangan.pasanganObj = anggota;
            anggota.view.istriCont.innerHTML = '';
            this.renderFoto(pasangan, anggota.view.istriCont);
        }
    }
    /**
     * Render anggota
     * @param anggota
     * @param cont
     * @param hubung
     */
    renderAnggota(anggota, cont, hubung = -1) {
        let viewLayout = this.renderContainer(hubung);
        viewLayout.attach(cont);
        anggota.view = viewLayout;
        this.renderFoto(anggota, viewLayout.suamiCont);
        // this.renderPasangan(anggota);
        // this.renderAnak(anggota);
    }
}
export var render = new Render();
