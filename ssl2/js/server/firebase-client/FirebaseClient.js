import { Anggota } from "./Anggota.js";
import { Foto } from "./Foto.js";
import { Relasi } from "./Relasi.js";
export class FireBaseClient {
    constructor() {
        this._anggota = new Anggota();
        this._foto = new Foto();
        this._relasi = new Relasi();
        this.db = null;
    }
    async init() {
        var firebaseConfig = {
            apiKey: "AIzaSyD8BI905B0DldnX6pgYJGK7X5J5jqy2NdU",
            authDomain: "blog-1513057469147.firebaseapp.com",
            databaseURL: "https://blog-1513057469147.firebaseio.com",
            projectId: "blog-1513057469147",
            storageBucket: "blog-1513057469147.appspot.com",
            messagingSenderId: "592396008462",
            appId: "1:592396008462:web:b9432343573f25d3cb505f",
            measurementId: "G-FDL2EWZ65Q"
        };
        await firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        this._auth = firebase.auth();
        await this._anggota.init(this.db);
        await this._foto.init(this.db);
        await this._relasi.init(this.db);
        console.log('firebase complete');
    }
    async login(username, password, persistence) {
        await this._auth.setPersistence(persistence);
        return await this._auth.signInWithEmailAndPassword(username, password);
    }
    async getAnak(anggota) {
        let rel;
        let anaks = [];
        rel = await this.relasi.getByAnggotaId(anggota.id);
        if (!rel)
            return [];
        for (let i = 0; i < rel.anaks.length; i++) {
            let anak = await this._anggota.getByDoc(rel.anaks[i]);
            if (anak) {
                anaks.push(anak);
            }
            else {
                //error
            }
        }
        return anaks;
    }
    async getPasangan(anakId) {
        let rel = await this._relasi.getByAnggotaId(anakId);
        if (!rel)
            return null;
        if (rel.anak1 == anakId) {
            return await this._anggota.getByDoc(rel.anak2);
        }
        else if (rel.anak2 == anakId) {
            return await this._anggota.getByDoc(rel.anak1);
        }
        else {
            return null;
        }
    }
    get foto() {
        return this._foto;
    }
    get anggota() {
        return this._anggota;
    }
    get relasi() {
        return this._relasi;
    }
    get auth() {
        return this._auth;
    }
}
