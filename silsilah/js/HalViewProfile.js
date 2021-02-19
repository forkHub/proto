import { BaseComponent } from "./BaseComponent.js";
import { editProfile } from "./HalEditProfile.js";
class ViewProfile {
    constructor() {
        this._view = new View();
        this._view.tblTutup.onclick = (e) => {
            console.log('view profile tutup');
            e.stopPropagation();
            this._view.detach();
            this._selesai();
        };
        this._view.tblSimpan.onclick = (e) => {
            // console.log('ok click');
            e.stopPropagation();
            this._view.detach();
            this._selesai();
        };
        this._view.tblEdit.onclick = (e) => {
            e.stopPropagation();
            this._view.detach();
            editProfile.tampil(this.anggota);
            editProfile.selesai = () => {
                this._selesai();
            };
        };
    }
    tampil(anggota) {
        this._view.inputNama.value = anggota.nama;
        this.anggota = anggota;
        this._view.attach(document.body);
    }
    set selesai(value) {
        this._selesai = value;
    }
    get view() {
        return this._view;
    }
}
class View extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='edit-profile'>
				<div>
					<div class='kotak'>
						<div class='tutup'>
							<button class='tutup'>&times;</button>
						</div>
						<div class='judul'>
							Lihat Profile
						</div>
						<br/>
						<div>
							<label>Nama:</label><br/>
							<input type='text' class='nama' placeholder='nama' readonly enabled=false/><br/>
							<br/>
							<button class='simpan'>OK</button>
							<button class='edit'>Edit</button>
						</div>
					</div>
				</div>
			</div>
		`;
        this.build();
    }
    get tblTutup() {
        return this.getEl('button.tutup');
    }
    get inputNama() {
        return this.getEl('input.nama');
    }
    get tblSimpan() {
        return this.getEl('button.simpan');
    }
    get tblEdit() {
        return this.getEl('button.edit');
    }
}
export var viewProfile = new ViewProfile();
