import { Game } from "../Game.js";
import { JenisSoal } from "../EnumSoal.js";
import { Bilangan } from "../bilangan/Bilangan.js";
import { BilanganAsli } from "../bilangan/BilanganAsli.js";
import { BilanganGanjil } from "../bilangan/BilanganGanjil.js";
import { BilanganGenap } from "../bilangan/BilanganGenap.js";
import { Urutkan, Arah } from "../urutkan/Urutkan.js";
import { Pola } from "../pola/Pola.js";
import { Penjumlahan } from "../penjumlahan/Penjumlahan.js";
import { membandingkan } from "./DataBanyakan.js";
// export const click = {
// 	membandingkan: {
// 		simbol: (e: MouseEvent) => {
// 			console.log('banyakan click gambar 3');
// 			e.stopPropagation();
// 			Game.inst.menu.detach();
// 			Game.inst.simbol.attach(Game.inst.cont);
// 			Game.inst.simbol.mulai();
// 		}
// 	}
// }
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
                Game.inst.puluhan.mulai();
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
                urutkan.judul.innerText = 'Urutkan dari yang terkecil';
                urutkan.init();
                urutkan.attach(urutkan.cont);
                urutkan.mulai();
            },
            members: []
        },
        {
            label: "Latihan 2",
            description: "Mengurutkan angka 10 - 0",
            onclick: (e) => {
                e.stopPropagation();
                Game.inst.menu.detach();
                let urutkan;
                urutkan = new Urutkan();
                urutkan.flArah = Arah.BESAR2KECIL;
                urutkan.judul.innerText = 'Urutkan dari yang terbesar';
                urutkan.cont = Game.inst.cont;
                urutkan.init();
                urutkan.attach(urutkan.cont);
                urutkan.mulai();
            },
            members: []
        }
    ]
};
const pola = {
    label: 'Bilangan Loncat',
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
