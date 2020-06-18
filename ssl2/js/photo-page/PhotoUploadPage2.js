import { BaseComponent } from "../ha/BaseComponent.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
import { FotoObj } from "../ent/FotoObj.js";
// import { Item } from "./Item.js";
import { Util } from "../Util.js";
export class PhotoUploadPage2 extends BaseComponent {
    constructor() {
        super();
        this.anggota = null;
        this.canvasImg2 = document.createElement('canvas');
        this.ctxImg2 = this.canvasImg2.getContext('2d');
        this.canvasThumb2 = document.createElement('canvas');
        this.ctxThumb2 = this.canvasThumb2.getContext('2d');
        this.rotasi = 0;
        Util.loadingStart();
        window.onload = () => {
            this.canvasImg2.width = 128;
            this.canvasImg2.height = 128;
            this.canvasThumb2.width = 32;
            this.canvasThumb2.height = 32;
            this.init().then(() => {
                Util.loadingEnd();
            }).catch((e) => {
                console.log(e);
                Util.loadingEnd();
                Util.alertMsg(e.message);
            });
        };
    }
    async update() {
        await this.firebase.anggota.update(this.anggota);
    }
    async init() {
        this._elHtml = document.body;
        this.uploadTbl.style.display = 'none';
        this.rotasiTbl.style.display = 'none';
        this.id = Util.getQuery('id');
        this.urlBalik = Util.getQuery('url_balik');
        this.initInput(this.canvas, this.canvasThumb, this.input);
        this.firebase = new FireBaseClient();
        await this.firebase.init();
        await this.loadDataAnggota(this.id);
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
                console.log('update anggota');
                this.anggota.idFoto = id;
                // console.log('hapus foto lama ' + this.idFoto);
                return this.update();
            }).then(() => {
                window.top.location.href = this.urlBalik;
            }).catch((error) => {
                console.log('upload error');
                console.log(error);
                Util.loadingEnd();
                Util.alertMsg(error.message);
            });
            return false;
        };
        this.rotasiTbl.onclick = () => {
            this.rotasi += 90;
            if (this.rotasi > 360) {
                this.rotasi -= 360;
            }
            this.renderImg(this.ctx, this.rotasi, this.canvasImg2, 128 / 2, 128 / 2);
            this.renderImg(this.ctx2, this.rotasi, this.canvasThumb2, 32 / 2, 32 / 2);
        };
    }
    renderImg(ctx, sudut, img, x, y) {
        sudut = (Math.PI / 180.0) * sudut;
        ctx.clearRect(0, 0, img.width, img.height);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(sudut);
        ctx.drawImage(img, -x, -y);
        ctx.restore();
    }
    initInput(canvas, canvasThumb, input) {
        input.onchange = () => {
            let file = input.files[0];
            let reader = new FileReader();
            let image = new Image();
            this.ctx = canvas.getContext('2d');
            this.ctx2 = canvasThumb.getContext('2d');
            this.uploadTbl.style.display = 'none';
            this.rotasiTbl.style.display = 'none';
            reader.onload = () => {
                image.onload = () => {
                    let ratio = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
                    let w2 = image.naturalWidth * ratio;
                    let h2 = image.naturalHeight * ratio;
                    let x = 0 + (canvas.width - w2) / 2;
                    let y = 0 + (canvas.height - h2) / 2;
                    this.ctxImg2.drawImage(image, x, y, w2, h2);
                    this.renderImg(this.ctx, this.rotasi, this.canvasImg2, 128 / 2, 128 / 2);
                    // ctx.drawImage(this.canvasImg2, 0, 0);
                    //TODO: gambar ke canvas 2
                    ratio = Math.min(canvasThumb.width / image.naturalWidth, canvasThumb.height / image.naturalHeight);
                    w2 = image.naturalWidth * ratio;
                    h2 = image.naturalHeight * ratio;
                    x = 0 + (canvasThumb.width - w2) / 2;
                    y = 0 + (canvasThumb.height - h2) / 2;
                    this.ctxThumb2.drawImage(image, x, y, w2, h2);
                    this.renderImg(this.ctx2, this.rotasi, this.canvasThumb2, 32 / 2, 32 / 2);
                    // ctx2.drawImage(this.canvasThumb2, 0, 0);
                    // this.ctx2;
                    this.uploadTbl.style.display = 'inline';
                    this.rotasiTbl.style.display = 'inline';
                };
                image.src = (reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };
    }
    async loadDataAnggota(id) {
        this.anggota = await this.firebase.anggota.getByDoc(id);
    }
    // async loadImage(): Promise<void> {
    // 	let foto: FotoObj[];
    // 	console.group('load image');
    // 	foto = await this.firebase.foto.get();
    // 	foto.forEach((item: FotoObj) => {
    // 		let view: Item = new Item();
    // 		view.img.src = item.thumbUrl;
    // 		view.foto = item;
    // 		view.attach(this.listCont)
    // 		view.hapusTbl.onclick = () => {
    // 			Util.loadingStart();
    // 			this.hapusFoto(view.foto).then(() => {
    // 				window.top.location.reload();
    // 			}).catch((e: Error) => {
    // 				Util.loadingEnd();
    // 				Util.alertMsg(e.message);
    // 				console.log(e)
    // 			});
    // 		}
    // 		console.log('view');
    // 		console.log(view);
    // 	});
    // 	console.groupEnd();
    // }
    // async hapusFoto(foto: FotoObj): Promise<void> {
    // 	console.group('hapus foto');
    // 	await this.firebase.foto.hapus(foto).then(() => {
    // 		console.log('success');
    // 		console.groupEnd();
    // 	}).catch((e: Error) => {
    // 		console.log('error');
    // 		console.log(e);
    // 	});
    // }
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
    get rotasiTbl() {
        return this.getEl('button.rotasi');
    }
}
new PhotoUploadPage2();
