"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DaftarBarangPage extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='daftar-barang-page'>
				<h1>Daftar Barang</h1>
				<button type='button' class='btn btn-primary tambah'>Tambah Data</button>
				<br/>
				<br/>
				<div class='cont'>
					
				</div>
			</div>			
		`;
        this.build();
    }
    init() {
        this.form = App.form;
        this.tambahTbl.onclick = () => {
            this.tambahClick();
        };
    }
    tambahClick() {
        this.detach();
        this.form.view.attach(App.cont);
        this.form.editMode = false;
        this.form.default();
        this.form.resetTinyMCE();
    }
    barangEditlick(item) {
        console.log(item);
        this.detach();
        App.form.view.attach(App.cont);
        App.form.objToForm(item);
        App.form.view.gambarHtml.src = item.thumb;
        App.form.editMode = true;
        this.form.resetTinyMCE();
    }
    barangHapusClick(item) {
        let hasil = confirm("Hapus Data?");
        if (hasil) {
            console.log('hapus data');
            Util.Ajax('post', '/barang/hapus/' + item.id, null).then((hasil) => {
                console.log(hasil);
                App.dialog.p.innerHTML = "Berhasil";
                App.dialog.tampil();
                App.dialog.okTbl.onclick = () => {
                    window.top.location.href = Util.urlToko;
                };
            }).catch((e) => {
                App.dialog.p.innerHTML = e;
                App.dialog.tampil();
            });
        }
    }
    load2() {
        return __awaiter(this, void 0, void 0, function* () {
            Util.Ajax("post", "/barang/baca", null).then((str) => {
                let barangAr = JSON.parse(str);
                this.cont.innerHTML = '';
                console.log('load ' + barangAr.length);
                console.group('load str');
                console.log(str);
                console.groupEnd();
                barangAr.forEach((data) => {
                    let view = new ItemBarangView();
                    let item = BarangController.responseToObj(data);
                    console.group('data');
                    console.log(data);
                    console.groupEnd();
                    console.group('item');
                    console.log(item);
                    console.groupEnd();
                    view.namaP.innerHTML = item.nama + " (" + (item.publish ? "dipublish" : "draft") + ")";
                    view.gbr.src = item.thumb;
                    view.attach(this.cont);
                    view.editTbl.onclick = () => {
                        this.barangEditlick(item);
                    };
                    view.hapusTbl.onclick = () => {
                        this.barangHapusClick(item);
                    };
                });
            }).catch((e) => {
                if (Util.resp.code == 401) {
                    this.detach();
                    App.login.attach(App.cont);
                }
                else {
                    App.dialog.tampil2(e.message);
                }
            });
        });
    }
    /*
    async load(): Promise<void> {
        let str: string = await App.Ajax("get", "/barang/baca", null);
        let barangAr: BarangObj[] = JSON.parse(str);

        this.cont.innerHTML = '';

        console.log('load ' + barangAr.length);
        console.group('load str');
        console.log(str);
        console.groupEnd();

        barangAr.forEach((data: BarangObj) => {
            let view: ItemBarangView = new ItemBarangView();
            let item: BarangObj = BarangController.responseToObj(data);

            console.group('data');
            console.log(data);
            console.groupEnd();

            console.group('item');
            console.log(item);
            console.groupEnd();

            view.namaP.innerHTML = item.nama;
            // view.deskripsiP.innerHTML = item.deskripsi;
            // view.hargaP.innerHTML = item.harga + '';
            view.gbr.src = item.thumb;

            view.attach(this.cont);

            view.editTbl.onclick = () => {
                this.barangEditlick(item);
            }
            view.hapusTbl.onclick = () => {
                this.barangHapusClick(item);
            }
        })

    }
    */
    get tambahTbl() {
        return this.getEl('button.tambah');
    }
    get cont() {
        return this.getEl('div.cont');
    }
}
class ItemBarangView extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='item-barang'>
				<div class='atas cont'>
					<img class='gbr' src="">
					<div class='deskripsi'>
						<p class='nama'></p>
						<div class='bawah'>
							<button type='button' class='btn btn-sm btn-primary edit'>Edit</button>
							<button type='button' class='btn btn-sm btn-danger hapus'>Hapus</button>
						</div>
					</div>
				</div>
				<hr/>
			</div>
		`;
        this.build();
    }
    get editTbl() {
        return this.getEl('button.edit');
    }
    get hapusTbl() {
        return this.getEl('button.hapus');
    }
    get gbr() {
        return this.getEl('img');
    }
    get namaP() {
        return this.getEl('div.deskripsi p.nama');
    }
}
