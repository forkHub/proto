import { anggotaController } from "./AnggotaController.";
import { data } from "./Data";
import { db } from "./Db";
import { viewProfile } from "./HalViewProfile";
import { render } from "./Render";
class AnggotaEvent {
    setEvent(foto, anggota) {
        foto.elHtml.onclick = (e) => {
            e.stopPropagation();
            render.resetMenuPopUp();
            console.log('foto on click');
            console.log('anggota populate status ' + anggota.populate);
            if (!anggota.populate) {
                anggotaController.populate(anggota);
                anggota.buka = true;
                //render
                render.renderAnak(anggota);
                if (anggota.pasanganObj) {
                    render.renderPasangan(anggota);
                }
            }
            else {
                anggota.buka = !anggota.buka;
            }
            render.updateViewToggle(anggota);
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
            if (anggota.pasanganObj) {
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
            // console.log('status pasangan ' + anggota.stPasangan);
            if (!anggota.stPasangan) {
                //hapus suami
                if (anggota.induk) {
                    anggotaController.hapusAnak(anggota.induk, anggota);
                    render.renderAnak(anggota.induk);
                    render.updateViewToggle(anggota.induk);
                    db.hapus(anggota.id);
                }
                else {
                    //TODO: info tidak bisa hapus anggota awal
                }
            }
            else {
                //hapus istri
                let suami = anggota.pasanganObj;
                anggota.viewFoto.detach();
                suami.pasanganObj = null;
                anggota.pasanganObj = null;
                db.hapus(anggota.id);
                render.updateViewToggle(suami);
            }
            render.resetMenuPopUp();
        };
        foto.profileTbl.onclick = (e) => {
            e.stopPropagation();
            render.resetMenuPopUp();
            viewProfile.tampil(anggota);
            viewProfile.selesai = () => {
                foto.namaDiv.innerHTML = anggota.nama;
                db.update(anggota.id, anggota);
            };
        };
        foto.tambahPasanganTbl.onclick = (e) => {
            e.stopPropagation();
            render.resetMenuPopUp();
            let pasangan = db.buatAnggotaObj();
            pasangan.stPasangan = true;
            pasangan.populate = true;
            pasangan.pasanganObj = anggota;
            anggota.pasanganObj = pasangan;
            anggota.buka = true;
            db.baru(anggota.pasanganObj);
            render.renderPasangan(anggota);
            render.updateViewToggle(anggota);
        };
        foto.tambahAnakTbl.onclick = (e) => {
            e.stopPropagation();
            render.resetMenuPopUp();
            let anak = db.buatAnggotaObj();
            anak.induk = anggota;
            anggota.buka = true;
            anggota.populate = true;
            db.baru(anak);
            anggota.anak2.push(anak);
            render.renderAnak(anggota);
            render.updateViewToggle(anggota);
            render.updateViewToggle(anak);
        };
        foto.debugTbl.onclick = (e) => {
            e.stopPropagation();
            render.resetMenuPopUp();
            console.log(anggota);
        };
    }
}
export var aevent = new AnggotaEvent();
