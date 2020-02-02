import { TombolMenu } from "./Tombol.js";
import { Game } from "./Game.js";
import { BaseComponent } from "./BaseComponent.js";
import { JenisSoal } from "./EnumSoal.js";
import { Urutkan } from "./urutkan/Urutkan.js";
import { Bilangan } from "./bilangan/Bilangan.js";
import { BilanganGanjil } from "./bilangan/BilanganGanjil.js";
import { BilanganGenap } from "./bilangan/BilanganGenap.js";
import { BilanganAsli } from "./bilangan/BilanganAsli.js";
import { Pola } from "./pola/Pola.js";
import { Penjumlahan } from "./penjumlahan/Penjumlahan.js";
// import { Pola } from "./pola/Pola.js";
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
    label: 'Bilangan',
    members: [
        {
            label: "Latihan 1",
            description: 'Bilangan cacah < 10',
            idx: JenisSoal.BILANGAN_10,
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Bilangan();
                Game.inst.menu.detach();
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: "Latihan 2",
            description: 'Bilangan asli < 10',
            idx: JenisSoal.BILANGAN_10,
            onclick: (e) => {
                e.stopPropagation();
                let soal = new BilanganAsli();
                Game.inst.menu.detach();
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: "Latihan 3",
            description: 'Bilangan ganjil < 10',
            idx: JenisSoal.BILANGAN_10,
            onclick: (e) => {
                e.stopPropagation();
                let soal = new BilanganGanjil();
                Game.inst.menu.detach();
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: "Latihan 4",
            description: 'Bilangan genap < 10',
            idx: JenisSoal.BILANGAN_10,
            onclick: (e) => {
                e.stopPropagation();
                let soal = new BilanganGenap();
                Game.inst.menu.detach();
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        }
    ]
};
const jumlah = {
    label: 'Menghitung jumlah Benda',
    members: [
        {
            label: "Latihan 1",
            description: "Memilih jawaban",
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
            description: 'Membandingkan 2 gambar',
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
            description: 'Membandingkan 3 gambar',
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
            description: 'Membandingkan dua angka',
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
            description: 'Membandingkan 3 angka',
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
const pola = {
    label: 'Pola',
    members: [
        {
            label: 'Latihan 1',
            description: 'Bilangan loncat 2',
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let pola = new Pola();
                pola.init();
                pola.attach(Game.inst.cont);
                pola.mulai();
            }
        },
        {
            label: 'Latihan 2',
            description: 'Bilangan loncat 3',
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let pola = new Pola();
                pola.jarak = 3;
                pola.init();
                pola.attach(Game.inst.cont);
                pola.mulai();
            }
        },
        {
            label: 'Latihan 3',
            description: 'Bilangan loncat 4',
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let pola = new Pola();
                pola.jarak = 4;
                pola.init();
                pola.attach(Game.inst.cont);
                pola.mulai();
            }
        },
        {
            label: 'Latihan 4',
            description: 'Bilangan loncat 2 b',
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let pola = new Pola();
                pola.jarak = 2;
                pola.isiDiAwal = true;
                pola.init();
                pola.attach(Game.inst.cont);
                pola.mulai();
            }
        },
        {
            label: 'Latihan 5',
            description: 'Bilangan loncat 3 b',
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let pola = new Pola();
                pola.jarak = 3;
                pola.isiDiAwal = true;
                pola.init();
                pola.attach(Game.inst.cont);
                pola.mulai();
            }
        },
        {
            label: 'Latihan 6',
            description: 'Bilangan loncat 4 b',
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let pola = new Pola();
                pola.jarak = 4;
                pola.isiDiAwal = true;
                pola.init();
                pola.attach(Game.inst.cont);
                pola.mulai();
            }
        },
        {
            label: 'Latihan 7',
            description: 'Bilangan loncat 2 c',
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let pola = new Pola();
                pola.jarak = 2;
                pola.isiDiTengah = true;
                pola.init();
                pola.attach(Game.inst.cont);
                pola.mulai();
            }
        },
        {
            label: 'Latihan 8',
            description: 'Bilangan loncat 3 c',
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let pola = new Pola();
                pola.jarak = 3;
                pola.isiDiTengah = true;
                pola.init();
                pola.attach(Game.inst.cont);
                pola.mulai();
            }
        },
        {
            label: 'Latihan 9',
            description: 'Bilangan loncat 4 c',
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let pola = new Pola();
                pola.jarak = 4;
                pola.isiDiTengah = true;
                pola.init();
                pola.attach(Game.inst.cont);
                pola.mulai();
            }
        }
    ]
};
const penjumlahan = {
    label: 'Penjumlahan 1',
    members: [
        {
            label: 'Latihan 1',
            description: 'Penjumlahan < 10',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AKHIR;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 2',
            description: 'Penjumlahan < 10 b',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_TENGAH;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 3',
            description: 'Penjumlahan < 10 c',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AWAL;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 4',
            description: 'Penjumlahan < 10 d',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.acakPos = true;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        }
    ]
};
const penjumlahan2 = {
    label: 'Penjumlahan 2',
    members: [
        {
            label: 'Latihan 1',
            description: 'Penjumlahan 11 - 20',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AKHIR;
                soal.batasBawah = 10;
                soal.batasAtas = 20;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 2',
            description: 'Penjumlahan 11 - 20',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_TENGAH;
                soal.batasBawah = 10;
                soal.batasAtas = 20;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 3',
            description: 'Penjumlahan 11 - 20',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AWAL;
                soal.batasBawah = 10;
                soal.batasAtas = 20;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 4',
            description: 'Penjumlahan 11 - 20',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.batasBawah = 10;
                soal.batasAtas = 20;
                soal.acakPos = true;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        }
    ]
};
//penjumlahan 21 - 50
const penjumlahan3 = {
    label: 'Penjumlahan 3',
    members: [
        {
            label: 'Latihan 1',
            description: 'Penjumlahan 21 - 50',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AKHIR;
                soal.batasBawah = 21;
                soal.batasAtas = 50;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 2',
            description: 'Penjumlahan 21 - 50',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_TENGAH;
                soal.batasBawah = 21;
                soal.batasAtas = 50;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 3',
            description: 'Penjumlahan 21 - 50',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AWAL;
                soal.batasBawah = 21;
                soal.batasAtas = 50;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 4',
            description: 'Penjumlahan 21 - 50',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.batasBawah = 21;
                soal.batasAtas = 50;
                soal.acakPos = true;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        }
    ]
};
//penjumlahan 51 - 100
const penjumlahan4 = {
    label: 'Penjumlahan 4',
    members: [
        {
            label: 'Latihan 1',
            description: 'Penjumlahan 51 - 100',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AKHIR;
                soal.batasBawah = 51;
                soal.batasAtas = 100;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 2',
            description: 'Penjumlahan 51 - 100',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_TENGAH;
                soal.batasBawah = 51;
                soal.batasAtas = 100;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 3',
            description: 'Penjumlahan 51 - 100',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AWAL;
                soal.batasBawah = 51;
                soal.batasAtas = 100;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 4',
            description: 'Penjumlahan 51 - 100',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.batasBawah = 51;
                soal.batasAtas = 100;
                soal.acakPos = true;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        }
    ]
};
//penjumlahan 51 - 100
const pengurangan = {
    label: 'Pengurangan 1',
    members: [
        {
            label: 'Latihan 1',
            description: 'Pengurangan < 10',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AKHIR;
                soal.batasAtas = 10;
                soal.pengurangan = true;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 2',
            description: 'Pengurangan < 10',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_TENGAH;
                // soal.batasBawah = 51;
                soal.batasAtas = 10;
                soal.pengurangan = true;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 3',
            description: 'Pengurangan < 10',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                soal.posisiJawaban = Penjumlahan.J_AWAL;
                // soal.batasBawah = 51;
                soal.pengurangan = true;
                soal.batasAtas = 10;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        },
        {
            label: 'Latihan 4',
            description: 'Pengurangan < 10',
            onclick: (e) => {
                e.stopPropagation();
                let soal = new Penjumlahan();
                Game.inst.menu.detach();
                // soal.batasBawah = 51;
                soal.batasAtas = 10;
                soal.pengurangan = true;
                soal.acakPos = true;
                soal.init();
                soal.mulai();
                soal.attach(Game.inst.cont);
            }
        }
    ]
};
export const MenuData = {
    members: [
        jumlah,
        membandingkan,
        puluhan,
        urutkan,
        bilangan,
        pola,
        penjumlahan,
        penjumlahan2,
        penjumlahan3,
        penjumlahan4,
        pengurangan
    ]
};
