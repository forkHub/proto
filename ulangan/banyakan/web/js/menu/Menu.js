import { TombolMenu } from "../Tombol.js";
// import { Game } from "../Game.js";
import { BaseComponent } from "../BaseComponent.js";
// import { JenisSoal } from "../EnumSoal.js";
// import { Urutkan, Arah } from "../urutkan/Urutkan.js";
// import { Bilangan } from "../bilangan/Bilangan.js";
// import { BilanganGanjil } from "../bilangan/BilanganGanjil.js";
// import { BilanganGenap } from "../bilangan/BilanganGenap.js";
// import { BilanganAsli } from "../bilangan/BilanganAsli.js";
// import { Pola } from "../pola/Pola.js";
// import { Penjumlahan } from "../penjumlahan/Penjumlahan.js";
// import { membandingkan } from "./DataBanyakan.js";
import { MenuData } from "./Data.js";
export class Menu extends BaseComponent {
    constructor() {
        super();
        this._list = [];
        this.jumlah = 0;
        this._template = `
			<div class='menu'>
				<p>Belajar Matematika Dasar</p>
			</div>
		`;
        this.build();
        console.log(this._elHtml);
        this._elHtml.appendChild(this.renderMenu(MenuData));
    }
    init() {
    }
    renderMenu(data) {
        let rootDiv = document.createElement('div');
        let rootUl = document.createElement('ul');
        rootDiv.appendChild(rootUl);
        rootDiv.classList.add('menu-ul');
        this.jumlah = 0;
        if (data.members)
            this.renderChild(data.members, rootUl);
        console.log('render menu, jumlah ' + this.jumlah);
        return rootDiv;
    }
    renderChild(childs, ulParent) {
        for (let i = 0; i < childs.length; i++) {
            let li = document.createElement('li');
            let child = childs[i];
            if (child.members && child.members.length > 0) {
                let text = null;
                let tbl = document.createElement('button');
                text = document.createTextNode(child.label);
                tbl.appendChild(text);
                li.appendChild(tbl);
                let ul = document.createElement('ul');
                ul.style.display = 'none';
                li.appendChild(ul);
                li.classList.add('label');
                li.onclick = (e) => {
                    e.stopPropagation();
                    if (ul.style.display == 'none') {
                        ul.style.display = 'block';
                    }
                    else {
                        ul.style.display = 'none';
                    }
                };
                if (child.members)
                    this.renderChild(child.members, ul);
            }
            else {
                let tombol = new TombolMenu();
                tombol.label = child.label;
                this.jumlah++;
                if (child.description) {
                    tombol.desc = child.description;
                }
                if (child.onclick) {
                    tombol.onClick = (e) => {
                        child.onclick(e);
                    };
                }
                tombol.attach(li);
                if (child.idx) {
                    tombol.idx = child.idx;
                    this._list.push(tombol);
                }
            }
            ulParent.appendChild(li);
        }
    }
    click(id) {
        for (let i = 0; i < this._list.length; i++) {
            if (id == this._list[i].idx) {
                // console.log(this._list[i]);
                // console.log("on click:");
                // console.log(this._list[i].onClick);
                // console.log("idx:")
                // console.log(this._list[i].idx);
                // console.log("inner text:")
                // console.log(this._list[i].elHtml.innerText);
                this._list[i].elHtml.click();
            }
        }
    }
    get list() {
        return this._list;
    }
}
