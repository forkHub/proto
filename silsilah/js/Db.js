import { id } from "./Counter.js";
import { file2 } from "./Data.js";
class Db {
    constructor() {
        this.counter = new CounterDb();
        this.anggotaAr = [];
        this.counter;
    }
    load() {
        let dataStr = window.localStorage.getItem(file2);
        let dbObj;
        console.log(dataStr);
        if (!dataStr || dataStr == '') {
            dbObj = {
                anggota: [this.buatAnggotaObj()],
                ctr: 1,
                awal: null
            };
            dbObj.awal = 1;
            id.id = 0;
            dbObj.anggota[0].id = id.id;
        }
        else {
            dbObj = JSON.parse(dataStr);
            id.id = dbObj.ctr;
        }
        this.anggotaAr = [];
        dbObj.anggota.forEach((item) => {
            this.anggotaAr.push(item);
        });
        console.log(dbObj);
        return dbObj;
    }
    buatAnggotaObj() {
        console.log('buat anggota');
        return {
            indukId: 0,
            nama: 'nama',
            anak2: [],
            stPasangan: false,
            buka: true
        };
    }
    cariAwal() {
        let hasil;
        this.anggotaAr.forEach((item) => {
            if (item.indukId == 0)
                hasil = item;
        });
        return hasil;
    }
    toObj(anggota) {
        console.group('anggota to obj, id ' + anggota.id);
        let hasil = {
            id: anggota.id,
            nama: anggota.nama,
            anak2: [],
            stPasangan: anggota.stPasangan ? true : false,
        };
        if (anggota.induk) {
            hasil.indukId = anggota.induk.id;
        }
        if (anggota.pasanganObj) {
            console.log('ada pasangan');
            hasil.pasanganId = anggota.pasanganObj.id;
        }
        console.log('anggota');
        console.log(anggota);
        console.log('hasil:');
        console.log(hasil);
        console.groupEnd();
        return hasil;
    }
    getByInduk(id) {
        let hasil = [];
        this.anggotaAr.forEach((item) => {
            if (item.indukId == id)
                hasil.push(item);
        });
        return hasil;
    }
    baru(anggota) {
        anggota.id = id.id;
        this.anggotaAr.push(anggota);
        console.log('anggota insert');
        console.log(anggota);
        this.simpan();
    }
    hapus(id) {
        for (let i = 0; i < this.anggotaAr.length; i++) {
            if (this.anggotaAr[i].id == id) {
                this.anggotaAr.splice(i, 1);
                this.simpan();
                return;
            }
        }
        throw Error('gak ketemu ' + id);
    }
    update(id, data) {
        let anggota = this.getById(id);
        anggota.nama = data.nama;
        this.simpan();
    }
    getById(id) {
        let hasil;
        this.anggotaAr.forEach((item) => {
            if (item.id == id)
                hasil = item;
        });
        return hasil;
    }
    simpan() {
        console.log('simpan');
        let idb = {
            anggota: [],
            ctr: id.id,
            awal: null
        };
        this.anggotaAr.forEach((item) => {
            idb.anggota.push(this.toObj(item));
        });
        window.localStorage.setItem(file2, JSON.stringify(idb));
    }
}
class CounterDb {
    load() {
    }
    simpan() {
    }
}
export var db = new Db();
