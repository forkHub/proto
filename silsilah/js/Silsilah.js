import { data } from "./Data.js";
import { db } from "./Db.js";
import { anggotaController } from "./AnggotaController..js";
window.onload = () => {
    db.load();
    data.anggotaAwal = db.getById(1);
    console.log(data.anggotaAwal);
    anggotaController.normalise(data.anggotaAwal);
    anggotaController.populate(data.anggotaAwal);
    anggotaController.renderAnggota(data.anggotaAwal, document.body, -1);
    anggotaController.updateViewToggle(data.anggotaAwal);
    window.document.body.onclick = () => {
        console.log('window on click');
        anggotaController.resetMenuPopUp();
    };
    console.log(JSON.stringify(new Date(2020, 1, 1)));
};
