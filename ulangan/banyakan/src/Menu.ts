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

	init(): void {

	}

	renderMenu(data: ITombol): HTMLDivElement {
		let rootDiv: HTMLDivElement = document.createElement('div');
		let rootUl: HTMLUListElement = document.createElement('ul');
		rootDiv.appendChild(rootUl);
		rootDiv.classList.add('menu-ul');

		this.renderChild(data.members, rootUl);
		return rootDiv;
	}

	renderChild(childs: Array<ITombol>, ulParent: HTMLUListElement): void {

		for (let i: number = 0; i < childs.length; i++) {
			let li: HTMLLIElement = document.createElement('li');
			let child: ITombol = childs[i];

			if (child.members.length > 0) {
				let text: Text = null;
				let par: HTMLParagraphElement = document.createElement('p');

				text = document.createTextNode(child.label);
				par.appendChild(text);
				li.appendChild(par);

				let ul: HTMLUListElement = document.createElement('ul');
				li.appendChild(ul);
				li.classList.add('label');
				this.renderChild(child.members, ul);
			}
			else {
				let tombol: TombolMenu = new TombolMenu();
				tombol.label = child.label;
				if (child.onclick) {
					tombol.onClick = (e: MouseEvent) => {
						child.onclick(e);
					}
				}
				tombol.attach(li);
			}

			ulParent.appendChild(li);
		}
	}
}

export interface ITombol {
	label?: string;
	onclick?: Function;
	members: Array<ITombol>
}

const puluhan: ITombol = {
	label: "Puluhan Satuan",
	onclick: (e: MouseEvent) => {
		e.stopPropagation();
		Game.inst.menu.detach();
		Game.inst.puluhan.attach(Game.inst.cont);
		Game.inst.puluhan.mulaiLagi();
	},
	members: []
}

export const MenuData: ITombol = {
	members: [
		{
			label: 'Membandingkan',
			members: [
				{
					label: "Dengan Gambar",
					members: [
						{
							label: 'Dua Angka',
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
							label: 'Tiga Angka',
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
						}
					]
				},
				{
					label: 'Tanpa Gambar',
					members: [
						{
							label: 'Dua Angka',
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
							label: 'Tiga Angka',
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
						}
					]
				}

			]
		},
		puluhan
	]
}