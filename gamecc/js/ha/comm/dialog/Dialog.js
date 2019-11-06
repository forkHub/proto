"use strict";
///<reference path='../../core/BaseComponent.ts'/>
var ha;
(function (ha) {
    var comm;
    (function (comm) {
        class Dialog extends ha.core.BaseComponent {
            constructor(body) {
                super();
                this._teks = '';
                this._teks = body;
                this.initTemplate();
            }
            update() {
                if (this._bodyEl) {
                    this._bodyEl.innerHTML = this._teks;
                }
            }
            onRender() {
                this._bodyEl = this.elHtml.querySelector("div.content p");
                this._btnOkEl = this.getEl('button.ok');
                this._btnOkEl.addEventListener('click', () => {
                    this.hide();
                    if (this._onClick)
                        this._onClick();
                });
            }
            initTemplate() {
                this._template = `
                    <!-- The Modal -->
                    <div class="ha-comm-dialog">
                    
                        <!-- Modal content -->
                        <div class="content">
                            <p></p>
                            <button class='ok normal'>OK</button>
                        </div>
                    </div>`;
            }
            set onClick(value) {
                this._onClick = value;
            }
            set teks(value) {
                this._teks = value;
                this.update();
            }
        }
        comm.Dialog = Dialog;
    })(comm = ha.comm || (ha.comm = {}));
})(ha || (ha = {}));
