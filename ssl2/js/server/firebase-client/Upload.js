export class Upload {
    async init() {
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
    upload(dataUrl) {
        let storage = firebase.storage();
        let storageRef = storage.ref();
        let fileRef;
        let name = this.createName();
        console.log(name);
        try {
            fileRef = storageRef.child('silsilah/' + name);
        }
        catch (error) {
            console.log(error);
        }
        console.log('file ref' + fileRef);
        return fileRef.putString(dataUrl, 'data_url');
    }
}
