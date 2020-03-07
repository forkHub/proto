import { BaseComponent } from "./BaseComponent.js";
export class Menu extends BaseComponent {
    constructor() {
        super();
        this._data2 = null;
        // private daftarTbl: Array<Tombol> = [];
        this._tblAwal = null;
        this._template = `<div class='menu-cont'></div`;
        this.build();
        this._data = [
            {
                label: 'System'
            },
            {
                label: "Object",
                members: [
                    {
                        label: "Create",
                        members: [
                            {
                                label: 'box'
                            },
                            {
                                label: 'sphere'
                            },
                            {
                                label: 'pyramid'
                            }
                        ]
                    },
                    {
                        label: "Select"
                    },
                    {
                        label: "Selected"
                    }
                ]
            },
        ];
        this._data2 = {
            label: 'menu',
            members: this._data
        };
    }
    init() {
    }
    renderMenu() {
        let tombol;
        tombol = new Tombol();
        tombol.elHtml.innerText = this._data2.label;
        tombol.label = this._data2.label;
        tombol.members = this._data2.members;
        tombol.parentCont = this._elHtml;
        tombol.daftarIsi = this._daftarIsi;
        tombol.renderMember();
        this._tblAwal = tombol;
    }
    get data() {
        return this._data;
    }
    set daftarIsi(value) {
        this._daftarIsi = value;
    }
    get tblAwal() {
        return this._tblAwal;
    }
}
export class Tombol extends BaseComponent {
    constructor() {
        super();
        this._members = [];
        this._label = '';
        this._elHtml = document.createElement('button');
    }
    renderMember() {
        if (0 == this._members.length)
            return;
        this._parentCont.innerText = '';
        console.log('render member');
        console.log(this._members);
        this._daftarIsi.push(this);
        this._daftarIsi.render();
        for (let i = 0; i < this._members.length; i++) {
            let item = this._members[i];
            let tombol = new Tombol();
            tombol.elHtml.innerText = item.label;
            tombol.label = item.label;
            tombol.members = item.members;
            tombol.parentCont = this._parentCont;
            tombol.daftarIsi = this._daftarIsi;
            tombol.elHtml.onclick = () => {
                tombol.renderMember();
            };
            tombol.attach(this._parentCont);
        }
    }
    set members(ar) {
        if (!ar)
            return;
        if (0 == ar.length)
            return;
        this._members = ar.slice(0, ar.length);
    }
    get members() {
        return this._members;
    }
    get daftarIsi() {
        return this._daftarIsi;
    }
    set daftarIsi(d) {
        this._daftarIsi = d;
    }
    get parentCont() {
        return this._parentCont;
    }
    set parentCont(value) {
        this._parentCont = value;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
}
