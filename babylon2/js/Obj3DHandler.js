// import { TorusKnotBuilder } from "babylonjs/Meshes/Builders/torusKnotBuilder";
import { app } from "./App.js";
export class Obj3DHandler {
    constructor() {
        this.list = [];
    }
    get mat() {
        return this._mat;
    }
    get akar() {
        return this._akar;
    }
    hapus(itemDipilih) {
        console.debug('hapus object');
        //set parent buat anak to akar
        this.cariAnak(itemDipilih.id).forEach((item) => {
            item.view3D.setParent(this._akar.view3D);
            item.view.attach(this._akar.view.cont);
            item.induk = this._akar.id;
            this.transformDari3D(item);
        });
        if (itemDipilih.view3D.material) {
            itemDipilih.view3D.material.dispose();
        }
        itemDipilih.view3D.dispose();
        itemDipilih.view.detach();
        //hapus dari list
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == itemDipilih.id) {
                this.list.splice(i, 1);
            }
        }
        //hapus struktur
        // let induk: IObj3D = this.cariInduk(this._akar, itemDipilih);
        // this.hapusAnakDariList(induk, itemDipilih);
        console.log(itemDipilih);
    }
    reset() {
        console.group('reset');
        while (this.list.length > 0) {
            let item = this.list.pop();
            if (!item.akar) {
                item.view3D.dispose();
                item.view.detach();
                console.debug('hapus ');
                console.debug(item);
            }
        }
        console.groupEnd();
    }
    cariAnak(indukId) {
        let hasil = [];
        for (let i = 0; i < this.list.length; i++) {
            let item = this.list[i];
            if (item.induk == indukId)
                hasil.push(item);
        }
        return hasil;
    }
    simpan() {
        let hasil = [];
        console.debug('simpan');
        this.list.forEach((item) => {
            if (!item.akar) {
                hasil.push(this.item2Obj(item));
            }
        });
        console.debug(hasil);
        return hasil;
    }
    buatObjDariData(data) {
        console.group('load');
        console.debug(data);
        this.reset();
        data.forEach((item) => {
            console.group('buat object 3d');
            console.debug(item);
            let obj = this.buatDefObj3D(item.data3D);
            obj.id = item.id;
            obj.akar = false;
            obj.induk = item.induk;
            this.list.push(obj);
            console.groupEnd();
        });
        //buat view
        this.buatView3DRec(this._akar);
        //buat struktur
        this.buatStrukturRek(this._akar);
        console.groupEnd();
    }
    transform23D(obj) {
        obj.view3D.position.x = obj.data3D.posisi.x;
        obj.view3D.position.y = obj.data3D.posisi.y;
        obj.view3D.position.z = obj.data3D.posisi.z;
        obj.view3D.scaling.x = obj.data3D.skala.x;
        obj.view3D.scaling.y = obj.data3D.skala.y;
        obj.view3D.scaling.z = obj.data3D.skala.z;
    }
    transformDari3D(obj) {
        obj.data3D.posisi.x = obj.view3D.position.x;
        obj.data3D.posisi.y = obj.view3D.position.y;
        obj.data3D.posisi.z = obj.view3D.position.z;
        obj.data3D.skala.x = obj.view3D.scaling.x;
        obj.data3D.skala.y = obj.view3D.scaling.y;
        obj.data3D.skala.z = obj.view3D.scaling.z;
    }
    buatStrukturRek(induk) {
        let list = this.cariAnak(induk.id);
        list.forEach((obj) => {
            obj.view = app.pohon.buatItem(obj, induk.view.cont);
            this.buatStrukturRek(obj);
        });
    }
    buatView3DRec(induk) {
        let list = this.cariAnak(induk.id);
        console.group('buat view 3d rect');
        console.debug(list);
        list.forEach((obj) => {
            console.group('buat item 3d');
            console.debug(obj);
            obj.view3D = app.prim.buatPrime(obj, app.p.scene);
            obj.view3D.setParent(induk.view3D);
            this.transform23D(obj);
            this.buatView3DRec(obj);
            console.groupEnd();
        });
        console.groupEnd();
    }
    data3D2Obj(data) {
        let hasil = {
            nama: data.nama,
            type: data.type,
            posisi: {
                x: data.posisi.x,
                y: data.posisi.y,
                z: data.posisi.z
            },
            skala: {
                x: data.skala.x,
                y: data.skala.y,
                z: data.skala.z
            }
        };
        if (data.type == Obj3DHandler.BOLA) {
            let bola = data;
            hasil.diameter = bola.diameter;
            hasil.segemen = bola.segmen;
        }
        else if (data.type == Obj3DHandler.TANAH) {
            let tanah = data;
            hasil.lbr = tanah.lbr;
            hasil.pjg = tanah.pjg;
            hasil.sub = tanah.sub;
        }
        else if (data.type == Obj3DHandler.KOSONG) {
        }
        else {
            throw Error('type salah');
        }
        return hasil;
    }
    item2Obj(item) {
        let obj = {
            id: item.id,
            // nama: item.nama,
            induk: item.induk,
            data3D: this.data3D2Obj(item.data3D),
        };
        return obj;
    }
    buatAkar() {
        let obj = this.buatDefObj3D(app.defData.defKosong());
        obj.view3D = app.prim.buatPrime(obj, app.p.scene);
        obj.view = app.pohon.buatItem(obj, app.hal.struktur);
        obj.akar = true;
        this._akar = obj;
        this.list.push(this._akar);
        // this.akar.anggota = [];
    }
    buatDefObj3D(data) {
        let hasil = this.def();
        hasil.data3D = data;
        return hasil;
    }
    def() {
        let hasil = {
            id: app.id.id,
        };
        // hasil.nama = 'def' + hasil.id
        return hasil;
    }
    tambahAnak(induk, data) {
        console.debug('tambah anak');
        console.debug(data);
        let obj3D = this.buatDefObj3D(data);
        obj3D.akar = false;
        obj3D.induk = induk.id;
        // obj3D.nama = obj3D.data3D.nama;
        //render 3d
        obj3D.view3D = app.prim.buatPrime(obj3D, app.p.scene);
        obj3D.view3D.setParent(induk.view3D);
        obj3D.view3D.position.x = data.posisi.x;
        obj3D.view3D.position.y = data.posisi.y;
        obj3D.view3D.position.z = data.posisi.z;
        obj3D.view3D.scaling.x = data.skala.x;
        obj3D.view3D.scaling.y = data.skala.y;
        obj3D.view3D.scaling.z = data.skala.z;
        //render struktur
        obj3D.view = app.pohon.buatItem(obj3D, induk.view.cont);
        induk.view.cont.classList.remove('disp-none');
        induk.view.cont.classList.add('disp-block');
        this.list.push(obj3D);
        return obj3D;
    }
    showWorldAxis(size) {
        var makeTextPlane = function (text, color, size) {
            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, app.p.scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
            var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, app.p.scene, true);
            plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", app.p.scene);
            plane.material.backFaceCulling = false;
            plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
            plane.material.diffuseTexture = dynamicTexture;
            return plane;
        };
        var axisX = BABYLON.Mesh.CreateLines("axisX", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], app.p.scene);
        axisX.color = new BABYLON.Color3(1, 0, 0);
        var xChar = makeTextPlane("X", "red", size / 10);
        xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
        var axisY = BABYLON.Mesh.CreateLines("axisY", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
        ], app.p.scene);
        axisY.color = new BABYLON.Color3(0, 1, 0);
        var yChar = makeTextPlane("Y", "green", size / 10);
        yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
        var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
        ], app.p.scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1);
        var zChar = makeTextPlane("Z", "blue", size / 10);
        zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
    }
    ;
}
Obj3DHandler.BOLA = "bola";
Obj3DHandler.TANAH = "tanah";
Obj3DHandler.KOSONG = 'kosong';
