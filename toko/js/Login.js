"use strict";
class Login extends BaseComponent {
	constructor() {
		super();
		this.dialog = new Dialog();
		this._elHtml = document.body.querySelector('div.form-login');
		this.form.onsubmit = () => {
			return this.formOnSubmit();
		};
		this.dialog.init();
	}
	formOnSubmit() {
		try {
			let data = {
				user: this.userName.value,
				password: this.password.value
			};
			Util.Ajax("POST", "/auth/login", JSON.stringify(data)).then(() => {
				window.top.location.href = '/toko';
			}).catch((_e) => {
				console.log(Util.resp);
				if (401 == Util.resp.code) {
					this.dialog.tampil2('Username atau password salah');
				}
				else {
					this.dialog.tampil2(Util.resp.message);
				}
			});
		}
		catch (e) {
			this.dialog.tampil2(Util.resp.message);
		}
		return false;
	}
	get form() {
		return this.getEl('form');
	}
	get userName() {
		return this.getEl('input.user-name');
	}
	get password() {
		return this.getEl('input.password');
	}
}
// window.onload = () => {
// 	new Login();
// }
