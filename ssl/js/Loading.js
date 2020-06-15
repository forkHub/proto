import { BaseComponent } from "./ha/BaseComponent.js";
export class Loading extends BaseComponent {
    constructor() {
        super();
        this._template = `
			<div class='loading'>
				<div class='box'>
					<p class='memuat'><img src='./imgs/loading.gif'> Tunggu sebentar ... </p>
				</div>
			</div>
		`;
        this.build();
    }
}
