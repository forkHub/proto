import { Tombol } from "../Tombol.js";
import { SoalEdit } from "../SoalEdit.js";
export class Load extends Tombol {
    constructor() {
        super();
        this.label = 'Load Data';
        this.build();
        this.onClick = () => {
            SoalEdit.inst.load();
        };
    }
}
