import { FotoObj } from "../../ent/FotoObj.js";
import { Util } from "../../Util.js";
export class Foto {
    constructor() {
        this.storage = null;
        this.nama = 'silsilah_foto';
        this.dir = 'silsilah/';
    }
    async hapus(foto) {
        await this.db.collection(this.nama).doc(foto.id).delete().catch((e) => {
            console.log(e);
        });
        await this.hapusGbr(foto.idPhoto).catch((e) => {
            console.log(e);
        });
        await this.hapusGbr(foto.idThumb).catch((e) => {
            console.log(e);
        });
    }
    async fotoInsert(foto) {
        let id = await this.db.collection(this.nama).add(this.toObj(foto));
        return id.id;
    }
    async getByIdOrDefault(id) {
        let hasil;
        try {
            hasil = await this.getById(id);
            if (!hasil) {
                hasil = Util.fotoError();
            }
        }
        catch (e) {
            console.log(e);
            hasil = Util.fotoError();
        }
        return hasil;
    }
    async getById(id) {
        let docSnapshot;
        let hasil = null;
        try {
            console.group('foto get by id, id ' + id);
            docSnapshot = await this.db.collection(this.nama).doc(id).get();
            if (!docSnapshot.data()) {
                console.log('no data');
                console.groupEnd();
                return null;
            }
            hasil = this.fromObj(docSnapshot.data(), id);
            console.log('hasil:');
            console.log(hasil);
            console.groupEnd();
            return hasil;
        }
        catch (e) {
            // console.log(e);
            console.groupEnd();
            throw new Error(e.message);
        }
    }
    async get() {
        let res = [];
        try {
            let qSnapshot = await this.db.collection(this.nama).get();
            console.log('get');
            qSnapshot.forEach((item) => {
                res.push(this.fromObj(item.data(), item.id));
            });
        }
        catch (e) {
            console.log(e.message);
            res = [];
        }
        return res;
    }
    async hapusGbr(id) {
        let ref = this.storage.ref();
        ref = ref.child(this.dir + id);
        await ref.delete().then(() => {
            console.log('hapus gambar ' + id + ' berhasil');
        });
    }
    fromObj(obj, id) {
        let rel = new FotoObj();
        console.log('form obj');
        console.log(obj);
        rel.id = id;
        rel.photoUrl = obj.photoUrl;
        rel.thumbUrl = obj.thumbUrl;
        rel.idPhoto = obj.idPhoto;
        rel.idThumb = obj.idThumb;
        return rel;
    }
    toObj(rel) {
        return {
            id: rel.id,
            photoUrl: rel.photoUrl,
            thumbUrl: rel.thumbUrl,
            idPhoto: rel.idPhoto,
            idThumb: rel.idThumb
        };
    }
    async init(db) {
        this.db = db;
        this.storage = firebase.storage();
        return Promise.resolve();
    }
    createName() {
        let hasil = 'foto';
        for (let i = 0; i < 10; i++) {
            hasil += Math.floor(Math.random() * 10);
        }
        let date = new Date();
        hasil += '_' + Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        return hasil;
    }
    async upload(canvas) {
        console.log('upload');
        return new Promise((resolve, reject) => {
            let name = this.createName();
            let uploadTask = this.getUploadTask(canvas.toDataURL(), name);
            uploadTask.on('state_changed', null, (error) => {
                console.log('rejected');
                reject(error);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve({ name: name, url: downloadURL });
                });
            });
        });
    }
    getUploadTask(dataUrl, name) {
        let storageRef = this.storage.ref();
        let fileRef;
        console.log(name);
        try {
            fileRef = storageRef.child('silsilah/' + name);
        }
        catch (error) {
            console.log('error');
            console.log(error);
        }
        console.log('file ref' + fileRef);
        return fileRef.putString(dataUrl, 'data_url');
    }
}
