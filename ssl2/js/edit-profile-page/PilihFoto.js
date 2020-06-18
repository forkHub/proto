import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
import { FotoItem } from "./FotoItem.js";
export class PilihFoto extends BaseComponent {
    constructor() {
        super();
    }
    set fotoDipilih(value) {
        this._fotoDipilih = value;
    }
    init(client) {
        this.client = client;
        this._elHtml = Util.getEl('div.pilih-foto');
    }
    async render() {
        console.log('render pilih foto');
        let foto = await this.client.foto.get();
        this.listCont.innerHTML = '';
        // console.log(foto);
        foto.forEach((item) => {
            let view = new FotoItem();
            view.img.src = item.thumbUrl;
            view.attach(this.listCont);
            view.elHtml.onclick = () => {
                this._fotoDipilih(item);
            };
        });
    }
    get listCont() {
        return this.getEl('div.list-cont');
    }
    get batalBtn() {
        return this.getEl('button.batal');
    }
}
