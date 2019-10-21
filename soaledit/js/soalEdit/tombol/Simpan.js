import { Tombol } from "../Tombol.js";
import { SoalEdit } from "../SoalEdit.js";
export class Simpan extends Tombol {
    constructor() {
        super();
        this.label = 'Simpan Data';
        this.build();
        this.onClick = () => {
            SoalEdit.inst.simpan();
        };
    }
}
