import { TombolMenu } from "./Tombol.js";
import { Game } from "./Game.js";
import { BaseComponent } from "./BaseComponent.js";
export class Menu extends BaseComponent {
    constructor() {
        super();
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
        this.renderChild(data.members, rootUl);
        return rootDiv;
    }
    renderChild(childs, ulParent) {
        for (let i = 0; i < childs.length; i++) {
            let li = document.createElement('li');
            let child = childs[i];
            if (child.members.length > 0) {
                let text = null;
                let par = document.createElement('p');
                text = document.createTextNode(child.label);
                par.appendChild(text);
                li.appendChild(par);
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
                this.renderChild(child.members, ul);
            }
            else {
                let tombol = new TombolMenu();
                tombol.label = child.label;
                if (child.onclick) {
                    tombol.onClick = (e) => {
                        child.onclick(e);
                    };
                }
                tombol.attach(li);
            }
            ulParent.appendChild(li);
        }
    }
}
const puluhan = {
    label: "Puluhan Satuan",
    onclick: (e) => {
        e.stopPropagation();
        Game.inst.menu.detach();
        Game.inst.puluhan.attach(Game.inst.cont);
        Game.inst.puluhan.mulaiLagi();
    },
    members: []
};
export const MenuData = {
    members: [
        {
            label: 'Membandingkan',
            members: [
                {
                    label: "Dengan Gambar",
                    members: [
                        {
                            label: 'Dua Angka',
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
                            label: 'Tiga Angka',
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
                        }
                    ]
                },
                {
                    label: 'Dengan Angka',
                    members: [
                        {
                            label: 'Dua Angka',
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
                            label: 'Tiga Angka',
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
                        }
                    ]
                },
                {
                    label: 'Dengan Simbol',
                    members: [],
                    onclick: (e) => {
                        console.log('banyakan click gambar 3');
                        e.stopPropagation();
                        Game.inst.menu.detach();
                        Game.inst.simbol.attach(Game.inst.cont);
                        Game.inst.simbol.mulai();
                    }
                }
            ]
        },
        puluhan
    ]
};
