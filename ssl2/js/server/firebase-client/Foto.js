import { FotoObj } from "../../ent/FotoObj.js";
export class Foto {
    constructor() {
        this.storage = null;
        this.nama = 'silsilah_foto';
        this.dir = 'silsilah/';
    }
    //TODO: batch
    async hapus(foto) {
        await this.db.collection(this.nama).doc(foto.id).delete();
        await this.hapusGbr(foto.idPhoto);
        await this.hapusGbr(foto.idThumb);
    }
    async fotoInsert(foto) {
        let id = await this.db.collection(this.nama).add(this.toObj(foto));
        return id.id;
    }
    async getById(id) {
        let docSnapshot;
        console.log('foto get by id, id ' + id);
        if (!id)
            return null;
        if (0 == id.length)
            return null;
        docSnapshot = await this.db.collection(this.nama).doc(id).get();
        if (!docSnapshot.data())
            return null;
        return this.fromObj(docSnapshot.data(), id);
    }
    async get() {
        let qSnapshot = await this.db.collection(this.nama).get();
        let res = [];
        console.log('get');
        qSnapshot.forEach((item) => {
            res.push(this.fromObj(item.data(), item.id));
        });
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
        // let name: string = this.createName();
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
