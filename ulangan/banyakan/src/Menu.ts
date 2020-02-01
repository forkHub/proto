import { TombolMenu } from "./Tombol.js";
import { Game } from "./Game.js";
import { BaseComponent } from "./BaseComponent.js";
import { JenisSoal } from "./EnumSoal.js";
import { Urutkan } from "./urutkan/Urutkan.js";
import { Bilangan } from "./bilangan/Bilangan.js";

export class Menu extends BaseComponent {
	private _list: Array<TombolMenu> = [];

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

	init(): void {

	}

	renderMenu(data: ITombol): HTMLDivElement {
		let rootDiv: HTMLDivElement = document.createElement('div');
		let rootUl: HTMLUListElement = document.createElement('ul');
		rootDiv.appendChild(rootUl);
		rootDiv.classList.add('menu-ul');

		if (data.members) this.renderChild(data.members, rootUl);
		return rootDiv;
	}

	renderChild(childs: Array<ITombol>, ulParent: HTMLUListElement): void {
		for (let i: number = 0; i < childs.length; i++) {
			let li: HTMLLIElement = document.createElement('li');
			let child: ITombol = childs[i];

			if (child.members && child.members.length > 0) {
				let text: Text = null;
				let tbl: HTMLButtonElement = document.createElement('button');

				text = document.createTextNode(child.label);
				tbl.appendChild(text);
				li.appendChild(tbl);

				let ul: HTMLUListElement = document.createElement('ul');
				ul.style.display = 'none';
				li.appendChild(ul);
				li.classList.add('label');

				li.onclick = (e: MouseEvent) => {
					e.stopPropagation();
					if (ul.style.display == 'none') {
						ul.style.display = 'block';
					}
					else {
						ul.style.display = 'none';
					}
				}

				if (child.members) this.renderChild(child.members, ul);
			}
			else {
				let tombol: TombolMenu = new TombolMenu();
				tombol.label = child.label;

				if (child.description) {
					tombol.desc = child.description;
				}

				if (child.onclick) {
					tombol.onClick = (e: MouseEvent) => {
						child.onclick(e);
					}
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

	click(id: number): void {
		for (let i: number = 0; i < this._list.length; i++) {
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

	public get list(): Array<TombolMenu> {
		return this._list;
	}

}

export interface ITombol {
	label?: string;
	onclick?: Function;
	description?: string;	//TODO: implement
	members?: Array<ITombol>;
	idx?: number;	//TODO: implement
}

export const click = {
	membandingkan: {
		simbol: (e: MouseEvent) => {
			console.log('banyakan click gambar 3');
			e.stopPropagation();
			Game.inst.menu.detach();
			Game.inst.simbol.attach(Game.inst.cont);
			Game.inst.simbol.mulai();
		}
	}
}

const bilangan: ITombol = {
	label: 'Bilangan',
	members: [
		{
			label: "Latihan 1",
			description: 'Bilangan cacah < 10',
			idx: JenisSoal.BILANGAN_10,
			onclick: (e: MouseEvent) => {
				e.stopPropagation();
				let soal: Bilangan = new Bilangan();
				Game.inst.menu.detach();
				soal.init();
				soal.mulai();
				soal.attach(Game.inst.cont);
			},
		}
	]
}

const jumlah: ITombol = {
	label: 'Menghitung jumlah Benda I',
	members: [
		{
			label: "Latihan 1",
			description: "Menghitung jumlah benda dengan memilih jawaban yang benar",
			idx: JenisSoal.JUMLAH_TOMBOL,
			onclick: (e: MouseEvent) => {
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
}

const puluhan: ITombol = {
	label: "Puluhan Satuan",
	members: [
		{
			label: "Latihan 1",
			description: "Mengisi nilai puluhan dan satuan",
			onclick: (e: MouseEvent) => {
				e.stopPropagation();
				Game.inst.menu.detach();
				Game.inst.puluhan.attach(Game.inst.cont);
				Game.inst.puluhan.mulaiLagi();
			},
			members: []
		}
	]
}

const urutkan: ITombol = {
	label: "Mengurutkan",
	members: [
		{
			label: "Latihan 1",
			description: "Mengurutkan angka 0 - 10",
			onclick: (e: MouseEvent) => {
				e.stopPropagation();
				Game.inst.menu.detach();
				let urutkan: Urutkan;
				urutkan = new Urutkan();
				urutkan.cont = Game.inst.cont;
				urutkan.init();
				urutkan.attach(urutkan.cont);
				urutkan.mulai();
			},
			members: []
		}
	]
}

const membandingkan: ITombol = {
	label: 'Membandingkan',
	members: [
		{
			label: 'Latihan 1',	//dengan gambar dua angka
			onclick: (e: MouseEvent) => {
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
			label: 'Latihan 2',	//dengan gambar tiga angka
			onclick: (e: MouseEvent) => {
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
			label: 'Latihan 3', //'Dua Angka',
			onclick: (e: MouseEvent) => {
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
			label: 'Latihan 4',//'Tiga Angka',
			onclick: (e: MouseEvent) => {
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
			label: 'Latihan 5', //'Dengan Simbol',
			description: "Menggunakan simbol < > dan =",
			members: [],
			onclick: click.membandingkan.simbol
		}

	]
}

export const MenuData: ITombol = {
	members: [
		jumlah,
		membandingkan,
		puluhan,
		urutkan,
		bilangan
	]
}