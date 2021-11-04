import { app } from "../App.js";
import { PohonItem } from "./PohonItem.js";
export class Pohon {
    buatItem(item, cont) {
        console.debug('buat item');
        console.debug(item);
        let view = new PohonItem();
        view.elHtml.setAttribute('id', item.id + '');
        view.nama.innerHTML = item.data3D.nama;
        view.obj3D = item;
        view.toggleTbl.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.toggleKlik(view);
        };
        view.nama.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.namaKlik(view);
        };
        view.attach(cont);
        console.debug('buat item');
        return view;
    }
    namaKlik(view) {
        // console.debug('nama click');
        // console.debug(document.body.querySelectorAll('pohon-item div.nama-cont'));
        document.body.querySelectorAll('pohon-item div.nama-cont').forEach((item) => {
            // console.debug(item);
            item.classList.remove('dipilih');
        });
        view.namaCont.classList.add('dipilih');
        // console.debug(view.namaCont);
        if (app.itemDipilih && app.itemDipilih.view3D.material) {
            app.itemDipilih.view3D.material.wireframe = false;
        }
        app.itemDipilih = view.obj3D;
        app.itemDipilih.view3D.material.wireframe = true;
        //buat tombol
        app.hal.tombolCont.innerHTML = '';
        if (app.itemDipilih.akar) {
            app.menu.ganti(app.menu.akar);
            // app.hal.tombolCont.appendChild(app.tombol.buat('simpan', () => {
            //     app.db.simpan();
            //     dialog.tampil('data telah disimpan');
            // }));
        }
        else {
            app.menu.ganti(app.menu.itemDipilih);
        }
        //bareng-bareng
        // app.hal.tombolCont.appendChild(app.tombol.buat('tambah anak ...', () => {
        //     console.debug('click');
        //     this.menuTambahAnakKlik();
        // }));
    }
    toggleKlik(view) {
        view.cont.classList.toggle('disp-block');
        view.cont.classList.toggle('disp-none');
    }
}
