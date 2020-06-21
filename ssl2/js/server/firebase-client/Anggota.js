import { AnggotaObj } from "../../ent/AnggotaObj.js";
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
        return await this.db.collection(this.nama).doc(anggota.id).set(this.toObj(anggota));
    }
    async hapus(id) {
        await this.db.collection(this.nama).doc(id).delete();
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
        try {
            console.group('get by doc');
            doc = await this.db.collection(this.nama).doc(key).get();
            console.log('anggota: get by doc, hasil');
            console.log(doc.data());
            if (!doc.data()) {
                console.log('undefined');
                console.groupEnd();
                return null;
            }
            console.groupEnd();
            return this.fromObj(doc.data(), key);
        }
        catch (e) {
            console.log(e);
            console.groupEnd();
            throw new Error(e.message);
        }
    }
    async getByKey(key, value) {
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
                return [];
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
        console.groupEnd();
        return res;
    }
    fromObj(obj, id) {
        let hasil = new AnggotaObj();
        hasil.id = id;
        hasil.nama = obj.nama ? obj.nama : '';
        hasil.namaLengkap = obj.namaLengkap || '';
        hasil.idFoto = obj.idFoto ? obj.idFoto : '';
        hasil.alamat = obj.alamat || '';
        hasil.facebook = obj.facebook || '';
        hasil.instagram = obj.instagram || '';
        hasil.wa = obj.wa || '';
        hasil.linkedin = obj.linkedin || '';
        hasil.tglLahir = obj.tglLahir || 0;
        hasil.tglMeninggal = obj.tglMeninggal || 0;
        hasil.jkl = obj.jkl || 'L';
        hasil.keterangan = obj.keterangan || '';
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
            jkl: data.jkl,
            keterangan: data.keterangan
        };
        return obj;
    }
    async insert(anggota) {
        let docRef = null;
        docRef = await this.db.collection(this.nama).add(this.toObj(anggota));
        return docRef.id;
    }
}
