import { RelPasanganObj } from "../../ent/RelPasanganObj.js";
export class Relasi {
    constructor() {
        this.db = null;
        this.nama = 'silsilah_relasi';
    }
    async hapus(rel) {
        console.log('relasi hapus:');
        console.log(rel);
        await this.db.collection(this.nama).doc(rel.id).delete();
    }
    async init(db) {
        this.db = db;
        return Promise.resolve();
    }
    async update(_rel) {
        await this.db.collection(this.nama).doc(_rel.id).set(this.toObj(_rel));
    }
    async getByAnakId(id) {
        let querySnapshot;
        let hasil = null;
        console.group('get by anak');
        querySnapshot = await this.db.collection(this.nama).where('anaks', 'array-contains', id).get();
        querySnapshot.forEach((item) => {
            hasil = this.fromObj(item.data(), item.id);
        });
        return hasil;
    }
    async getByAnggotaId(id) {
        let querySnapshot = await this.db.collection(this.nama).where('anak1', '==', id).get();
        let hasil = null;
        console.group('get by anak');
        querySnapshot.forEach((item) => {
            hasil = this.fromObj(item.data(), item.id);
        });
        if (hasil) {
            console.log('hasil:');
            console.log(hasil);
            console.groupEnd();
            return hasil;
        }
        querySnapshot = await this.db.collection(this.nama).where('anak2', '==', id).get();
        querySnapshot.forEach((item) => {
            hasil = this.fromObj(item.data(), item.id);
        });
        console.log('hasil:');
        console.log(hasil);
        console.groupEnd();
        return hasil;
    }
    async insert(rel) {
        let docRef = await this.db.collection(this.nama).add(this.toObj(rel));
        return docRef.id;
    }
    toObj(rel) {
        return {
            id: rel.id,
            anak1: rel.anak1,
            anak2: rel.anak2,
            anakStr: JSON.stringify(rel.anaks),
            anaks: rel.anaks
        };
    }
    fromObj(rel, id) {
        let hasil = new RelPasanganObj();
        let anaks = JSON.parse(rel.anakStr);
        if (!id)
            throw new Error();
        if ("" == id)
            throw new Error();
        hasil.id = id;
        hasil.anak1 = rel.anak1 ? rel.anak1 : "";
        hasil.anak2 = rel.anak2 ? rel.anak2 : "";
        hasil.anaks = anaks ? anaks : [];
        hasil.anakStr = rel.anakStr;
        return hasil;
    }
}
