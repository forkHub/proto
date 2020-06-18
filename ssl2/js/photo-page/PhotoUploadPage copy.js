import { BaseComponent } from "../ha/BaseComponent.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
import { FotoObj } from "../ent/FotoObj.js";
import { Item } from "./Item.js";
import { Util } from "../Util.js";
export class PhotoUploadPage extends BaseComponent {
    constructor() {
        super();
        window.onload = () => {
            Util.loadingStart();
            this.init().then(() => {
                Util.loadingEnd();
            }).catch((e) => {
                console.log(e);
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
    }
    async init() {
        this._elHtml = document.body;
        this.uploadTbl.style.display = 'none';
        this.initInput(this.canvas, this.canvasThumb, this.input);
        this.firebase = new FireBaseClient();
        await this.firebase.init();
        await this.loadImage();
        this.form.onsubmit = () => {
            let data = new FotoObj();
            Util.loadingStart();
            this.firebase.foto.upload(this.canvas).then((url) => {
                console.log('download url ' + url);
                data.photoUrl = url.url;
                data.idPhoto = url.name;
                return this.firebase.foto.upload(this.canvasThumb);
            }).then((url) => {
                console.log('download thumb url ' + url);
                data.thumbUrl = url.url;
                data.idThumb = url.name;
                return this.firebase.foto.fotoInsert(data);
            }).then((id) => {
                console.log('foto insert, id ' + id);
                window.top.location.reload();
            }).catch((error) => {
                console.log('upload error');
                console.log(error);
                Util.loadingEnd();
                Util.alertMsg(error.message);
            });
            return false;
        };
    }
    initInput(canvas, canvasThumb, input) {
        input.onchange = () => {
            let file = input.files[0];
            let reader = new FileReader();
            let ctx = canvas.getContext('2d');
            let ctx2 = canvasThumb.getContext('2d');
            let image = new Image();
            this.uploadTbl.style.display = 'none';
            reader.onload = () => {
                image.onload = () => {
                    let ratio = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
                    let w2 = image.naturalWidth * ratio;
                    let h2 = image.naturalHeight * ratio;
                    let x = 0 + (canvas.width - w2) / 2;
                    let y = 0 + (canvas.height - h2) / 2;
                    ctx.drawImage(image, x, y, w2, h2);
                    //TODO: gambar ke canvas 2
                    ratio = Math.min(canvasThumb.width / image.naturalWidth, canvasThumb.height / image.naturalHeight);
                    w2 = image.naturalWidth * ratio;
                    h2 = image.naturalHeight * ratio;
                    x = 0 + (canvasThumb.width - w2) / 2;
                    y = 0 + (canvasThumb.height - h2) / 2;
                    ctx2.drawImage(image, x, y, w2, h2);
                    this.uploadTbl.style.display = 'block';
                };
                image.src = (reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };
    }
    async loadImage() {
        let foto;
        console.group('load image');
        foto = await this.firebase.foto.get();
        foto.forEach((item) => {
            let view = new Item();
            view.img.src = item.thumbUrl;
            view.foto = item;
            view.attach(this.listCont);
            view.hapusTbl.onclick = () => {
                Util.loadingStart();
                this.hapusFoto(view.foto).then(() => {
                    window.top.location.reload();
                }).catch((e) => {
                    Util.loadingEnd();
                    Util.alertMsg(e.message);
                    console.log(e);
                });
            };
            console.log('view');
            console.log(view);
        });
        console.groupEnd();
    }
    async hapusFoto(foto) {
        console.group('hapus foto');
        await this.firebase.foto.hapus(foto).then(() => {
            console.log('success');
            console.groupEnd();
        }).catch((e) => {
            console.log('error');
            console.log(e);
        });
    }
    get listCont() {
        return this.getEl('div.list-cont');
    }
    get form() {
        return this.getEl('form');
    }
    get input() {
        return this.getEl('input');
    }
    get canvas() {
        return this.getEl('canvas.foto');
    }
    get canvasThumb() {
        return this.getEl('canvas.thumb');
    }
    get uploadTbl() {
        return this.getEl('input.upload');
    }
}
new PhotoUploadPage();
