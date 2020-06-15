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
                // this.client.auth.onAuthStateChanged((user: IFBUser) => {
                // 	console.group('auth status:');
                // 	console.log(user.uid); 
                // 	console.groupEnd();
                // })
            }).catch((e) => {
                console.log(e);
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
    }
    async init() {
        let id = (Util.getQuery('id'));
        let def = Util.getQuery('def') == "1";
        this.client = new FireBaseClient();
        await this.client.init();
        this.adminTbl.onclick = () => {
            console.log('admin tbl click');
            window.top.location.href = Util.urlMenu;
        };
        if (id) {
            await this.renderById(id);
        }
        if (def) {
            await this.renderDefault();
        }
    }
    async renderDefault() {
        console.log('render default');
        let anggotaAr = await this.client.anggota.getByKey('nama', 'ayah', false);
        if (anggotaAr[0]) {
            await this.render(anggotaAr[0], this.cont);
        }
        else {
            console.log('anggota is null');
        }
    }
    async renderById(id) {
        let anggota;
        anggota = await this.client.anggota.getByDoc(id);
        if (!anggota) {
            throw new Error('data tidak ditemukan');
        }
        await this.render(anggota, this.cont);
    }
    async render(anggota, cont) {
        let view;
        view = new AnggotaView();
        view.init(this.client);
        view.viewAr = this._viewAr;
        view.anggota = anggota;
        await view.memuat();
        view.renderFoto();
        await view.render();
        view.renderOrtu();
        await view.fotoClick();
        view.attach(cont);
    }
    get cont() {
        return Util.getEl('div.cont');
    }
    get adminTbl() {
        return Util.getEl('button.admin');
    }
}
new Home();
