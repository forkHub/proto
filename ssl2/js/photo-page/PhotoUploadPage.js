import { BaseComponent } from "../ha/BaseComponent.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
import { Item } from "./Item.js";
import { Util } from "../Util.js";
// import { IUResult } from "../server/firebase-client/Foto.js";
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
        // this.uploadTbl.style.display = 'none';
        // this.initInput(this.canvas, this.canvasThumb, this.input);
        this.firebase = new FireBaseClient();
        await this.firebase.init();
        await this.loadImage();
        // this.form.onsubmit = () => {
        // 	let data: FotoObj = new FotoObj();
        // 	Util.loadingStart();
        // 	this.firebase.foto.upload(this.canvas).then((url: IUResult) => {
        // 		console.log('download url ' + url);
        // 		data.photoUrl = url.url;
        // 		data.idPhoto = url.name;
        // 		return this.firebase.foto.upload(this.canvasThumb);
        // 	}).then((url: IUResult) => {
        // 		console.log('download thumb url ' + url);
        // 		data.thumbUrl = url.url;
        // 		data.idThumb = url.name;
        // 		return this.firebase.foto.fotoInsert(data);
        // 	}).then((id: string) => {
        // 		console.log('foto insert, id ' + id);
        // 		window.top.location.reload();
        // 	}).catch((error: any) => {
        // 		console.log('upload error');
        // 		console.log(error);
        // 		Util.loadingEnd();
        // 		Util.alertMsg(error.message);
        // 	});
        // 	return false;
        // }
    }
    // initInput(canvas: HTMLCanvasElement, canvasThumb: HTMLCanvasElement, input: HTMLInputElement): void {
    // 	input.onchange = () => {
    // 		let file: File = input.files[0];
    // 		let reader: FileReader = new FileReader();
    // 		let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    // 		let ctx2: CanvasRenderingContext2D = canvasThumb.getContext('2d');
    // 		let image: HTMLImageElement = new Image();
    // 		this.uploadTbl.style.display = 'none';
    // 		reader.onload = () => {
    // 			image.onload = () => {
    // 				let ratio: number = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    // 				let w2: number = image.naturalWidth * ratio;
    // 				let h2: number = image.naturalHeight * ratio;
    // 				let x: number = 0 + (canvas.width - w2) / 2;
    // 				let y: number = 0 + (canvas.height - h2) / 2;
    // 				ctx.drawImage(image, x, y, w2, h2);
    // 				//TODO: gambar ke canvas 2
    // 				ratio = Math.min(canvasThumb.width / image.naturalWidth, canvasThumb.height / image.naturalHeight);
    // 				w2 = image.naturalWidth * ratio;
    // 				h2 = image.naturalHeight * ratio;
    // 				x = 0 + (canvasThumb.width - w2) / 2;
    // 				y = 0 + (canvasThumb.height - h2) / 2;
    // 				ctx2.drawImage(image, x, y, w2, h2);
    // 				this.uploadTbl.style.display = 'block';
    // 			}
    // 			image.src = (reader.result) as string;
    // 		};
    // 		if (file) {
    // 			reader.readAsDataURL(file);
    // 		}
    // 	}
    // }
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
}
new PhotoUploadPage();
