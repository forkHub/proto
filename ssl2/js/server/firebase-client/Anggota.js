import { AnggotaObj } from "../../ent/AnggotaObj.js";
// import { Util } from "../../Util.js";
// import { Util } from "../../Util.js";
export class Anggota {
    constructor() {
        this.nama = 'silsilah-nama';
    }
    async init(db) {
        console.log('anggota init, db' + db);
        this.db = db;
        return Promise.resolve();
    }
    async update(anggota) {
        return this.db.collection(this.nama).doc(anggota.id).set(this.toObj(anggota));
    }
    async hapus(id) {
        if (!id || id == '')
            return;
        for (let i = 0; i < 3; i++) {
            await this.db.collection(this.nama).doc(id).delete().then(() => {
                return;
            }).catch((e) => {
                console.log('error');
                console.log(e.message);
            });
        }
        return;
    }
    async get() {
        let snapshot;
        let res = [];
        snapshot = await this.db.collection(this.nama).get();
        snapshot.forEach((item) => {
            res.push(this.fromObj(item.data(), item.id));
        });
        return res;
    }
    async getByDoc(key) {
        let doc;
        if ('' == key)
            return null;
        if (null == key)
            return null;
        doc = await this.db.collection(this.nama).doc(key).get();
        console.log('anggota: get by doc, hasil');
        console.log(doc.data());
        if (!doc.data())
            return null;
        return this.fromObj(doc.data(), key);
    }
    async getByKey(key, value, err = false) {
        let res = [];
        let snapshot;
        console.group('anggota: get by key, key ' + key + '/value ' + value);
        console.log('this db ' + this.db);
        if (key == "id") {
            let anggotaObj = await this.getByDoc(value);
            console.log('get by key, hasil');
            console.log(anggotaObj);
            console.groupEnd();
            if (anggotaObj) {
                return [anggotaObj];
            }
            else {
                if (err) {
                    throw new Error('anggota tidak ditemukan');
                }
                else {
                    return [];
                }
            }
        }
        snapshot = await this.db.collection(this.nama)
            .where(key, "==", value)
            .get();
        snapshot.forEach((item) => {
            let anggota = new AnggotaObj();
            anggota = this.fromObj(item.data(), item.id);
            res.push(anggota);
        });
        if (err) {
            if (!res)
                throw new Error('user tidak ditemukan');
            if (res.length == 0)
                throw new Error('user tidak ditemukan');
        }
        console.groupEnd();
        return res;
    }
    fromObj(obj, id) {
        let hasil = new AnggotaObj();
        hasil.id = id;
        hasil.nama = obj.nama ? obj.nama : '';
        hasil.namaLengkap = obj.namaLengkap || '';
        hasil.idFoto = obj.idFoto ? obj.idFoto : '';
        // hasil.orangTuaId = obj.orangTuaId ? obj.orangTuaId : '';
        hasil.alamat = obj.alamat || '';
        hasil.facebook = obj.facebook || '';
        hasil.instagram = obj.instagram || '';
        hasil.wa = obj.wa || '';
        hasil.linkedin = obj.linkedin || '';
        hasil.tglLahir = obj.tglLahir;
        hasil.tglMeninggal = obj.tglMeninggal;
        hasil.jkl = obj.jkl;
        return hasil;
    }
    toObj(data) {
        let obj = {
            id: data.id,
            nama: data.nama,
            idFoto: data.idFoto ? data.idFoto : "",
            // orangTuaId: data.orangTuaId ? data.orangTuaId : "",
            alamat: data.alamat,
            facebook: data.facebook,
            instagram: data.instagram,
            linkedin: data.linkedin,
            namaLengkap: data.namaLengkap,
            tglLahir: data.tglLahir,
            tglMeninggal: data.tglMeninggal,
            wa: data.wa,
            jkl: data.jkl
        };
        return obj;
    }
    async insert(anggota) {
        let docRef = null;
        // let anggota2: AnggotaObj[] = null;
        // anggota2 = await this.getByKey('nama', anggota.nama, false);
        // if (anggota2 && anggota2.length > 0) throw new Error('duplicate ' + anggota.nama);
        docRef = await this.db.collection(this.nama).add(this.toObj(anggota));
        return docRef.id;
    }
}
