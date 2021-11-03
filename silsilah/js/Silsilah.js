import { data } from "./Data.js";
import { db } from "./Db.js";
import { anggotaController } from "./AnggotaController..js";
import { render } from "./Render.js";
window.onload = () => {
    db.load();
    data.anggotaAwal = db.getById(1);
    console.log(data.anggotaAwal);
    anggotaController.default(data.anggotaAwal);
    anggotaController.populate(data.anggotaAwal);
    render.renderAnggota(data.anggotaAwal, document.body);
    render.renderPasangan(data.anggotaAwal);
    render.renderAnak(data.anggotaAwal);
    render.updateViewToggle(data.anggotaAwal);
    window.document.body.onclick = () => {
        console.log('window on click');
        render.resetMenuPopUp();
    };
    console.log(JSON.stringify(new Date(2020, 1, 1)));
};
