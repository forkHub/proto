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
class PhotoUploadPage extends BaseComponent {
    // resp.status(200).send({
    // 	gbr_url: folderUnggah + gbrBesarNama,
    // 	baris_info: _rows
    // });
    constructor() {
        super();
        // private canvasImg2: HTMLCanvasElement = document.createElement('canvas');
        // private canvasThumb2: HTMLCanvasElement = document.createElement('canvas');
        // private rotasi: number = 0;
        this._selesai = null;
        this._insertedId = '';
        this._gbrUrl = '';
    }
    createName(prefix, pjg = 12) {
        let hasil = prefix;
        let karakter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let date = new Date();
        for (let i = 0; i < pjg; i++) {
            hasil += karakter.charAt(Math.floor(Math.random() * karakter.length));
        }
        hasil += date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds();
        hasil += '.png';
        console.log('nama: ' + hasil);
        return hasil;
    }
    init() {
        console.group("photo upload");
        this._elHtml = this.getTemplate('div.foto-page');
        console.group('el html');
        console.log(this._elHtml);
        console.groupEnd();
        // this.canvasImg2.width = 800;
        // this.canvasImg2.height = 600;
        // this.canvasThumb2.width = 128;
        // this.canvasThumb2.height = 128;
        // this.uploadTbl.style.display = 'none';
        // this.rotasiTbl.style.display = 'none';
        this.initInput(this.input);
        this.form.onsubmit = () => {
            this.upload();
            return false;
        };
        // this.rotasiTbl.onclick = () => {
        // 	this.rotasi += 90;
        // 	if (this.rotasi > 360) {
        // 		this.rotasi -= 360;
        // 	}
        // 	this.renderImg(this.canvasBesarHtml, this.rotasi, this.canvasImg2, 128 / 2, 128 / 2);
        // 	this.renderImg(this.canvasThumbHtml, this.rotasi, this.canvasThumb2, 32 / 2, 32 / 2);
        // }
        console.groupEnd();
    }
    loadImage3(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadImage2(file, 800, 800, "gbr_besar", this.fotoCont);
            yield this.loadImage2(file, 128, 128, "thumb", this.thumbCont);
        });
    }
    loadImage2(file, panjang, lebar, id, cont) {
        return __awaiter(this, void 0, void 0, function* () {
            let canvas;
            let img = yield loadImage(file.files[0], {
                maxWidth: panjang,
                maxHeight: lebar,
                canvas: true,
                orientation: true,
                imageSmoothingQuality: 'high'
            });
            canvas = img.image;
            canvas.setAttribute("id", id);
            cont.appendChild(canvas);
        });
    }
    populateData() {
        let formData = new FormData();
        formData.append("gbr_besar", this.canvasBesar.toDataURL());
        formData.append("gbr_kecil", this.canvasThumb.toDataURL());
        return formData;
    }
    populateJson() {
        let obj = {
            gbr_besar: this.canvasBesar.toDataURL(),
            gbr_kecil: this.canvasThumb.toDataURL(),
            gbr_besar_nama: this.createName('gbr_besar_', 8),
            gbr_kecil_nama: this.createName('gbr_kecil_', 8)
        };
        return JSON.stringify(obj);
    }
    // renderImg(canvasDest: HTMLCanvasElement, sudut: number, canvasSrc: HTMLCanvasElement, x: number, y: number): void {
    // 	let ctxDest: CanvasRenderingContext2D = canvasDest.getContext('2d');
    // 	sudut = (Math.PI / 180.0) * sudut;
    // 	ctxDest.clearRect(0, 0, canvasDest.width, canvasDest.height);
    // 	ctxDest.save();
    // 	ctxDest.translate(x, y);
    // 	ctxDest.rotate(sudut);
    // 	ctxDest.drawImage(canvasSrc, -x, -y);
    // 	ctxDest.restore();
    // 	console.log(canvasDest.width + '/' + canvasDest.height);
    // }
    initInput(input) {
        input.onchange = () => {
            this.loadImage3(input).then(() => {
                // this.uploadTbl.style.display = 'block';
            }).catch((e) => {
                App.dialog.p.innerHTML = e.message();
                App.dialog.tampil();
            });
            // let file: File = input.files[0];
            // let reader: FileReader = new FileReader();
            // let image: HTMLImageElement = new Image();
            // this.uploadTbl.style.display = 'none';
            // this.rotasiTbl.style.display = 'none';
            // reader.onload = () => {
            // 	image.onload = () => {
            // 		let ratio: number = Math.min(canvasHtml.width / image.naturalWidth, canvasHtml.height / image.naturalHeight);
            // 		let w2: number = image.naturalWidth * ratio;
            // 		let h2: number = image.naturalHeight * ratio;
            // 		let x: number = 0 + (canvasHtml.width - w2) / 2;
            // 		let y: number = 0 + (canvasHtml.height - h2) / 2;
            // 		this.canvasImg2.getContext('2d').clearRect(0, 0, this.canvasImg2.width, this.canvasImg2.height);
            // 		this.canvasImg2.getContext('2d').drawImage(image, x, y, w2, h2);
            // 		this.renderImg(this.canvasBesarHtml, this.rotasi, this.canvasImg2, 128 / 2, 128 / 2);
            // 		//gambar thumbnail
            // 		ratio = Math.min(canvasThumbHtml.width / image.naturalWidth, canvasThumbHtml.height / image.naturalHeight);
            // 		w2 = image.naturalWidth * ratio;
            // 		h2 = image.naturalHeight * ratio;
            // 		x = 0 + (canvasThumbHtml.width - w2) / 2;
            // 		y = 0 + (canvasThumbHtml.height - h2) / 2;
            // 		this.canvasThumb2.getContext('2d').clearRect(0, 0, this.canvasThumb2.width, this.canvasThumb2.height);
            // 		this.canvasThumb2.getContext('2d').drawImage(image, x, y, w2, h2);
            // 		this.renderImg(this.canvasThumbHtml, this.rotasi, this.canvasThumb2, 32 / 2, 32 / 2);
            // 		this.uploadTbl.style.display = 'inline';
            // 		this.rotasiTbl.style.display = 'inline';
            // 	}
            // 	image.src = (reader.result) as string;
            // };
            // if (file) {
            // 	reader.readAsDataURL(file);
            // }
        };
    }
    upload() {
        try {
            Util.Ajax('post', '/file/baru', this.populateJson())
                .then((hasil) => {
                console.log(hasil);
                let hasilObj = JSON.parse(hasil);
                this._insertedId = hasilObj.baris_info.insertId;
                this._gbrUrl = hasilObj.gbr_url;
                App.dialog.p.innerText = 'Sukses';
                App.dialog.tampil(false);
                App.dialog.okTbl.onclick = () => {
                    App.dialog.detach();
                    this.selesai();
                };
            })
                .catch((_err) => {
                App.dialog.p.innerHTML = _err;
                App.dialog.tampil();
            });
        }
        catch (e) {
            App.dialog.p.innerHTML = e;
            App.dialog.tampil();
        }
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
    get uploadTbl() {
        return this.getEl('input.upload');
    }
    get canvasBesar() {
        return this.getEl('canvas#gbr_besar');
    }
    get canvasThumb() {
        return this.getEl('canvas#thumb');
    }
    get tutupTbl() {
        return this.getEl('button.tutup');
    }
    get selesai() {
        return this._selesai;
    }
    set selesai(value) {
        this._selesai = value;
    }
    get insertedId() {
        return this._insertedId;
    }
    get gbrUrl() {
        return this._gbrUrl;
    }
    get fotoCont() {
        return this.getEl('div.foto-cont');
    }
    get thumbCont() {
        return this.getEl('div.thumb-cont');
    }
}
