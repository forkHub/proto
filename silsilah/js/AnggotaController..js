import { db } from "./Db.js";
class AnggotaController {
    constructor() {
    }
    /**
     * Isi dengan default value
     * @param anggota
     */
    default(anggota) {
        anggota.buka = false;
        anggota.populate = false;
        anggota.populateAnak = false;
        anggota.anak2 = [];
        anggota.stPasangan = false;
        anggota.pasanganObj = null;
        anggota.induk = null;
        anggota.indukId = 0;
        anggota.view = null;
        anggota.viewFoto = null;
        anggota.viewTambahPasangan = null;
        // //TODO: dep
        // if (anggota.pasanganObj) {
        // 	anggota.stPasangan = false;
        // 	anggota.pasanganObj.pasanganObj = anggota;
        // 	anggota.pasanganObj.stPasangan = true;
        // }
        // if (!anggota.anak2) anggota.anak2 = [];
        // //TODO: dep
        // anggota.anak2.forEach((item: IAnggota) => {
        // 	item.induk = anggota;
        // 	this.default(item);
        // });
    }
    populateAnak(anggota) {
        if (anggota.populateAnak) {
            return;
        }
        anggota.anak2 = [];
        anggota.anak2 = db.getByInduk(anggota.id).slice();
        anggota.anak2.forEach((item) => {
            this.default(item);
            item.induk = anggota;
            item.indukId = anggota.id;
        });
        anggota.populateAnak = true;
    }
    populatePasangan(anggota) {
        if (anggota.pasanganId && !anggota.pasanganObj) {
            anggota.pasanganObj = db.getById(anggota.pasanganId);
            this.default(anggota.pasanganObj);
        }
    }
    populate(anggota) {
        if (anggota.populate)
            return;
        this.populateAnak(anggota);
        this.populatePasangan(anggota);
        // //pasangan belum diload
        // if (anggota.pasanganId && !anggota.pasanganObj) {
        // 	anggota.pasanganObj = db.getById(anggota.pasanganId);
        // 	this.default(anggota.pasanganObj);
        // }
        // anggota.anak2 = [];
        // anggota.anak2 = db.getByInduk(anggota.id).slice();
        // anggota.anak2.forEach((item: IAnggota) => {
        // 	item.induk = anggota;
        // 	item.indukId = anggota.id;
        // 	this.default(item);
        // });
        anggota.populate = true;
        console.log('populate anggota selesai');
    }
    hapusAnak(anggota, anak) {
        for (let i = 0; i < anggota.anak2.length; i++) {
            if (anggota.anak2[i] == anak) {
                let anakHapus = anggota.anak2.splice(i, 1)[0];
                db.hapus(anakHapus.id);
            }
        }
    }
}
export var anggotaController = new AnggotaController();
