"use strict";
var ha;
(function (ha) {
    var comm;
    (function (comm) {
        var grid;
        (function (grid) {
            class Grid extends ha.core.BaseComponent {
                constructor(hor, ver) {
                    super();
                    this.rows = [];
                    this.hor = hor;
                    this.ver = ver;
                    this._template = `<div class='ha-comm-grid'></div>`;
                }
                getCell(i, j) {
                    return this.rows[j].colls[i].elHtml;
                }
                onRender() {
                    let j;
                    let i = 0;
                    for (i = 0; i < this.ver; i++) {
                        let row;
                        row = new Row();
                        row.render(this._elHtml);
                        this.rows.push(row);
                        for (j = 0; j < this.hor; j++) {
                            let coll;
                            coll = new Coll();
                            coll.render(row.elHtml);
                            row.colls.push(coll);
                        }
                    }
                }
            }
            grid.Grid = Grid;
            class Coll extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._template = `<div class='coll'></div>`;
                }
            }
            class Row extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._colls = [];
                    this._template = `<div class='row'></div>`;
                }
                get colls() {
                    return this._colls;
                }
            }
        })(grid = comm.grid || (comm.grid = {}));
    })(comm = ha.comm || (ha.comm = {}));
})(ha || (ha = {}));
