import { Util } from "./Util.js";
import { FireBaseClient } from "./server/firebase-client/FirebaseClient.js";
export class Login {
    constructor() {
        this.client = new FireBaseClient();
        window.onload = () => {
            Util.loadingStart();
            this.init().then(() => {
                Util.loadingEnd();
                console.log('test');
                // console.log(firebase);
                // firebase.auth.Auth;
            }).catch((e) => {
                Util.alertMsg(e.message);
            });
        };
    }
    async init() {
        let id = '';
        let nama = '';
        //TODO: set default later
        id = Util.getQuery('id') || 'KxpUGabpITtGAEyHDJcL';
        nama = Util.getQuery('nama') || 'Baihaqi Sofwan';
        if (nama)
            nama = window.decodeURIComponent(nama);
        this.spanNama.innerHTML = nama;
        console.log('login click');
        await this.client.init();
        this.loginBtn.onclick = () => {
            Util.loadingStart();
            this.loginClick().then(() => {
                if (this.uid == "7S9TWZXggIPLWX6R8RGH0E7EOZ52") {
                    window.top.location.href = './admin.html';
                }
                else {
                    console.log('buka home');
                    // console.log(this.uid);
                    Util.bukaHome(id);
                }
            }).catch((e) => {
                Util.alertMsg(e.message);
            });
        };
        this.tblTamu.onclick = () => {
            Util.bukaHome(id);
        };
    }
    async loginClick() {
        console.log('client login');
        await this.client.login(this.inputUsername.value, this.inputPassword.value, firebase.auth.Auth.Persistence.SESSION).then((data) => {
            // console.log(data);
            // console.log(data.credential ? data.credential.providerId : "");
            // console.log(data.credential ? data.credential.signInMethod : "");
            // console.log(data.user.displayName);
            // console.log(data.user.email);
            // console.log(data.user.uid);
            this.uid = data.user.uid;
        });
    }
    get inputUsername() {
        return Util.getEl('input.username');
    }
    get inputPassword() {
        return Util.getEl('input.password');
    }
    get loginBtn() {
        return Util.getEl('button.login');
    }
    get tblTamu() {
        return Util.getEl('button.tamu');
    }
    get spanNama() {
        return Util.getEl('span.nama');
    }
}
new Login();
