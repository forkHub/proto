import { Obj3DHandler } from "./Obj3DHandler.js";
export class DefObj3DData {
    defObj3D() {
        return {
            // nama: nama,
            posisi: new BABYLON.Vector3(0, 0, 0),
            skala: new BABYLON.Vector3(1, 1, 1)
        };
    }
    defKosong() {
        let kosong = this.defObj3D();
        kosong.type = Obj3DHandler.KOSONG;
        kosong.nama = 'pivot';
        return kosong;
    }
    defBola() {
        let obj = this.defObj3D();
        obj.type = Obj3DHandler.BOLA;
        obj.diameter = 2;
        obj.segmen = 16;
        obj.nama = 'bola';
        return obj;
    }
    defTanah() {
        let obj = this.defObj3D();
        obj.sub = 2;
        obj.pjg = 6;
        obj.lbr = 6;
        obj.type = Obj3DHandler.TANAH;
        obj.nama = 'tanah';
        return obj;
    }
}
