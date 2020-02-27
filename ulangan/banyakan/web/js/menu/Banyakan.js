import { Game } from "../Game.js";
import { Banyakan } from "../banyakan/Banyakan.js";
import { click } from "./Data.js";
export const membandingkan = {
    label: 'Membandingkan',
    members: [
        {
            label: 'Latihan 1',
            description: 'Membandingkan 2 gambar',
            onclick: (e) => {
                e.stopPropagation();
                console.log('banyakan click');
                Game.inst.menu.detach();
                let banyakan = new Banyakan();
                banyakan.jmlAngka = 2;
                banyakan.angkaSaja = false;
                banyakan.init();
                banyakan.attach(Game.inst.cont);
                banyakan.mulai();
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
                let banyakan = new Banyakan();
                banyakan.jmlAngka = 3;
                banyakan.angkaSaja = false;
                banyakan.init();
                banyakan.attach(Game.inst.cont);
                banyakan.mulai();
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
                let banyakan = new Banyakan();
                banyakan.jmlAngka = 2;
                banyakan.angkaSaja = true;
                banyakan.init();
                banyakan.attach(Game.inst.cont);
                banyakan.mulai();
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
                let banyakan = new Banyakan();
                banyakan.jmlAngka = 3;
                banyakan.angkaSaja = true;
                banyakan.init();
                banyakan.attach(Game.inst.cont);
                banyakan.mulai();
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
