import { BaseComponent } from "../ha/BaseComponent.js";
import { Util } from "../Util.js";
import { FireBaseClient } from "../server/firebase-client/FirebaseClient.js";
export class DaftarFotoPage extends BaseComponent {
    constructor() {
        super();
        this.client = new FireBaseClient();
        window.onload = () => {
            this._elHtml = Util.getEl('div.cont');
        };
    }
    async init() {
        await this.client.init();
    }
}
