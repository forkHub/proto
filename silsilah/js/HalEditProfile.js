import { BaseComponent } from "./BaseComponent.js";
class EditProfile {
    constructor() {
        this._view = new View();
        this._view.tblTutup.onclick = () => {
            this.anggota.nama = this.anggotaLama.nama;
            this._view.detach();
            this._selesai();
        };
        this._view.tblSimpan.onclick = () => {
            this.anggota.nama = this._view.inputNama.value;
            this._view.detach();
            this._selesai();
        };
    }
    set selesai(value) {
        this._selesai = value;
    }
    get view() {
        return this._view;
    }
    set view(value) {
        this._view = value;
    }
    tampil(anggota) {
        console.log(this.anggotaLama);
        this._view.inputNama.value = anggota.nama;
        this.anggotaLama.nama = anggota.nama;
        this.anggotaLama.id = anggota.id;
        this.anggota = anggota;
        this._view.attach(document.body);
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
							Edit Profile
						</div>
						<br/>
						<div>
							<label>Nama:</nama><br/>
							<input type='text' class='nama' placeholder='nama'/><br/>
							<br/>
							<button class='simpan'>OK</button>
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
}
export var editProfile = new EditProfile();
