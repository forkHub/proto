import { TombolMenu } from "./Tombol.js";
import { Game } from "./Game.js";
import { BaseComponent } from "./BaseComponent.js";
import { JenisSoal } from "./EnumSoal.js";
import { Urutkan } from "./urutkan/Urutkan.js";
import { Bilangan } from "./bilangan/Bilangan.js";
export class Menu extends BaseComponent {
    constructor() {
        super();
        this._list = [];
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
        if (data.members)
            this.renderChild(data.members, rootUl);
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
                console.log(this._list[i]);
                console.log("on click:");
                console.log(this._list[i].onClick);
                console.log("idx:");
                console.log(this._list[i].idx);
                console.log("inner text:");
                console.log(this._list[i].elHtml.innerText);
                this._list[i].elHtml.click();
            }
        }
    }
    get list() {
        return this._list;
    }
}
export const click = {
    membandingkan: {
        simbol: (e) => {
            console.log('banyakan click gambar 3');
            e.stopPropagation();
            Game.inst.menu.detach();
            Game.inst.simbol.attach(Game.inst.cont);
            Game.inst.simbol.mulai();
        }
    }
};
const bilangan = {
    label: 'Mengenal jenis bilangan: asli, cacah, ganjil, genap',
    members: [
        {
            label: "Latihan 1",
            description: 'Menyebutkan bilangan < 20',
            idx: JenisSoal.BILANGAN_20,
            onclick: (e) => {
                e.stopPropagation();
                // console.log(e);
                let soal = new Bilangan();
                Game.inst.menu.detach();
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            },
        }
    ]
};
const jumlah = {
    label: 'Menghitung jumlah Benda I',
    members: [
        {
            label: "Latihan 1",
            description: "Menghitung jumlah benda dengan memilih jawaban yang benar",
            idx: JenisSoal.JUMLAH_TOMBOL,
            onclick: (e) => {
                e.stopPropagation();
                console.log(e);
                Game.inst.menu.detach();
                Game.inst.jumlahPilih.mulai();
                Game.inst.jumlahPilih.reset();
                Game.inst.jumlahPilih.cont = Game.inst.cont;
                Game.inst.jumlahPilih.attach(Game.inst.cont);
            },
        }
    ]
};
const puluhan = {
    label: "Puluhan Satuan",
    members: [
        {
            label: "Latihan 1",
            description: "Mengisi nilai puluhan dan satuan",
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                Game.inst.puluhan.attach(Game.inst.cont);
                Game.inst.puluhan.mulaiLagi();
            },
            members: []
        }
    ]
};
const urutkan = {
    label: "Mengurutkan",
    members: [
        {
            label: "Latihan 1",
            description: "Mengurutkan angka 0 - 10",
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let urutkan;
                urutkan = new Urutkan();
                urutkan.cont = Game.inst.cont;
                urutkan.init();
                urutkan.attach(urutkan.cont);
                urutkan.mulai();
            },
            members: []
        }
    ]
};
const membandingkan = {
    label: 'Membandingkan',
    members: [
        {
            label: 'Latihan 1',
            onclick: (e) => {
                e.stopPropagation();
                console.log('banyakan click');
                Game.inst.menu.detach();
                Game.inst.banyakan.jmlSoal = 2;
                Game.inst.banyakan.angkaSaja = false;
                Game.inst.banyakan.attach(Game.inst.cont);
                Game.inst.banyakan.mulaiLagi();
            },
            members: []
        },
        {
            label: 'Latihan 2',
            onclick: (e) => {
                e.stopPropagation();
                console.log('banyakan click gambar 3');
                Game.inst.menu.detach();
                Game.inst.banyakan.jmlSoal = 3;
                Game.inst.banyakan.angkaSaja = false;
                Game.inst.banyakan.attach(Game.inst.cont);
                Game.inst.banyakan.mulaiLagi();
            },
            members: []
        },
        {
            label: 'Latihan 3',
            onclick: (e) => {
                console.log('banyakan click angka 2');
                e.stopPropagation();
                Game.inst.menu.detach();
                Game.inst.banyakan.jmlSoal = 2;
                Game.inst.banyakan.angkaSaja = true;
                Game.inst.banyakan.attach(Game.inst.cont);
                Game.inst.banyakan.mulaiLagi();
            },
            members: []
        },
        {
            label: 'Latihan 4',
            onclick: (e) => {
                console.log('banyakan click gambar 3');
                e.stopPropagation();
                Game.inst.menu.detach();
                Game.inst.banyakan.jmlSoal = 3;
                Game.inst.banyakan.angkaSaja = true;
                Game.inst.banyakan.attach(Game.inst.cont);
                Game.inst.banyakan.mulaiLagi();
            },
            members: []
        },
        {
            label: 'Latihan 5',
            description: "Menggunakan simbol < > dan =",
            members: [],
            onclick: click.membandingkan.simbol
        }
    ]
};
export const MenuData = {
    members: [
        jumlah,
        membandingkan,
        puluhan,
        urutkan,
        bilangan
    ]
};
