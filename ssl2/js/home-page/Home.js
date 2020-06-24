import { AnggotaView } from "./AnggotaView.js";
import { Util } from "../Util.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
// import { IFBUser } from "../IFirebase.js";
export class Home {
    constructor() {
        this._viewAr = [];
        window.onload = () => {
            Util.loadingStart();
            this.init().then(() => {
                Util.loadingEnd();
            }).catch((e) => {
                console.log(e);
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
    }
    async init() {
        let id = (Util.getQuery('id'));
        this.client = new FireBaseClient();
        await this.client.init();
        // this.adminTbl.onclick = () => {
        // 	console.log('admin tbl click');
        // 	window.top.location.href = Util.urlMenu;
        // }
        if (id) {
            await this.renderById(id);
        }
        else {
        }
    }
    // async renderDefault(): Promise<void> {
    // 	console.log('render default');
    // 	let anggotaAr: AnggotaObj[] = await this.client.anggota.getByKey('nama', 'ayah');
    // 	if (anggotaAr[0]) {
    // 		await this.render(anggotaAr[0], this.cont);
    // 	}
    // 	else {
    // 		console.log('anggota is null')
    // 	}
    // }
    async renderById(id) {
        let anggota;
        try {
            anggota = await this.client.anggota.getByDoc(id);
            await this.render(anggota, this.cont);
        }
        catch (e) {
            throw new Error('data tidak ditemukan');
        }
    }
    async render(anggota, cont) {
        let view;
        view = new AnggotaView();
        view.init(this.client);
        view.viewAr = this._viewAr;
        view.anggota = anggota;
        let foto = await this.client.foto.getByIdOrDefault(anggota.id);
        anggota.fotoUrl = foto.photoUrl;
        anggota.thumbUrl = foto.photoUrl;
        await view.memuatDataOrtu(anggota.id);
        await view.memuatDataPasangan(anggota.id);
        await view.memuatDataAnak();
        view.renderSaya();
        view.renderOrtu();
        await view.fotoDiClick();
        view.attach(cont);
    }
    get cont() {
        return Util.getEl('div.cont');
    }
}
new Home();
