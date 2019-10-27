///<reference path="./PFCell.ts"/>
// namespace fg {
import { PFCell } from './PFCell.js';
export class PathFinder {
    constructor() {
        this._cells = [];
        this._maxCells = 100;
        this._checkCanMoveToPos = null;
        this._checkSampai = null;
        this._flBlocked = 0;
        this._flDiagonal = false;
        this._cells = [];
        this._flBlocked = PathFinder.BL_STOPPED;
    }
    //dipakai saat algorithma selesai
    getCellTerdekatKeTarget(tx, ty) {
        let jarakTerdekat = 1000;
        let jarakSementara = 0;
        let cellRes = null;
        this._cells.forEach(cell => {
            jarakSementara = Math.abs(cell.x - tx) + Math.abs(cell.y - ty);
            if (jarakSementara < jarakTerdekat) {
                cellRes = cell;
                jarakTerdekat = jarakSementara;
            }
        });
        //tidak termasuk cell paling atas
        if (cellRes.parent == null)
            cellRes = null;
        return cellRes;
    }
    buildPath(cell, res) {
        let i = 0;
        let cellTemp;
        let cellParent;
        let len;
        //cari parent dari cell yang sedang di check
        len = this._cells.length;
        for (i = 0; i < len; i++) {
            cellTemp = this._cells[i];
            if (cell.parent && (cellTemp.idx == cell.parent.idx)) {
                cellParent = cellTemp;
            }
        }
        //parent gak ada, cell adalah cell awal, return;
        if (cellParent == null) {
            // console.log("no parent");
            return;
        }
        //hasilnya di masukkan ke let res
        //urutan dibalik
        //bila parent adalah cell awal return
        res.unshift(cellParent);
        if (cellParent.idx == -1) {
            return;
        }
        else {
            this.buildPath(cellParent, res);
        }
    }
    cellCreate(parent, i, j, targetX, targetY) {
        let cell;
        cell = new PFCell();
        cell.x = i;
        cell.y = j;
        cell.open = true;
        cell.idx = this._cells.length;
        if (parent) {
            cell.parent = parent;
        }
        else {
            cell.parent = null;
        }
        cell.dist = Math.abs(targetX - i) + Math.abs(targetY - j);
        return cell;
    }
    resToArray(res) {
        let ar = [];
        res.forEach(cell => {
            ar.push([cell.x, cell.y]);
        });
        return ar;
    }
    find(sx, sy, tx, ty) {
        let res = new Array();
        let resAr;
        // console.group('cari jalan');
        // console.log('sx ' + sx);
        // console.log('sy ' + sy);
        // console.log('tx ' + tx);
        // console.log('ty ' + ty);
        // console.groupEnd();
        while (this._cells.length > 0) {
            this._cells.pop();
        }
        res = this.getPath(sx, sy, tx, ty);
        resAr = this.resToArray(res);
        while (res.length > 0) {
            res.pop();
        }
        return resAr;
    }
    checkSampaiTujuan(i, j, tx, ty) {
        if (this._checkSampai != null) {
            return this._checkSampai(i, j, tx, ty);
        }
        else {
            if ((i == tx) && (j == ty))
                return true;
            return false;
        }
    }
    getOpenCell() {
        let i;
        let cell;
        let maxLen;
        let cellTemp;
        let len = 0;
        maxLen = 10000;
        len = this._cells.length - 1;
        for (i = len; i >= 0; i--) {
            cell = this._cells[i];
            if (cell.open) {
                if (cell.dist < maxLen) {
                    cellTemp = cell;
                    maxLen = cell.dist;
                }
            }
        }
        // console.log('get open cell');
        // console.log(cellTemp);
        return cellTemp;
    }
    cellOpen(cellCr, tx, ty) {
        //up
        if (this.cellPosPossible(cellCr.x, cellCr.y - 1)) {
            this._cells.push(this.cellCreate(cellCr, cellCr.x, cellCr.y - 1, tx, ty));
        }
        //right
        if (this.cellPosPossible(cellCr.x + 1, cellCr.y)) {
            this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y, tx, ty));
        }
        //down
        if (this.cellPosPossible(cellCr.x, cellCr.y + 1)) {
            this._cells.push(this.cellCreate(cellCr, cellCr.x, cellCr.y + 1, tx, ty));
        }
        //left
        if (this.cellPosPossible(cellCr.x - 1, cellCr.y)) {
            this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y, tx, ty));
        }
        //kanan atas
        if (this.cellPosPossible(cellCr.x + 1, cellCr.y - 1)) {
            this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y - 1, tx, ty));
        }
        //kanan bawah
        if (this.cellPosPossible(cellCr.x + 1, cellCr.y + 1)) {
            this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y + 1, tx, ty));
        }
        //kiri atas
        if (this.cellPosPossible(cellCr.x - 1, cellCr.y - 1)) {
            this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y - 1, tx, ty));
        }
        //kiri bawah
        if (this.cellPosPossible(cellCr.x - 1, cellCr.y + 1)) {
            this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y + 1, tx, ty));
        }
    }
    getPath(sx, sy, tx, ty) {
        let cellCr;
        let res = new Array();
        // console.group('get path');
        if ((sx == tx) && (sy == ty)) {
            // console.log('failed, same start and end');
            // console.groupEnd();
            return res;
        }
        this._cells.push(this.cellCreate(null, sx, sy, tx, ty));
        while (true) {
            if ((this._cells.length >= this._maxCells)) {
                if (this._flBlocked == PathFinder.BL_STOPPED) {
                    // console.log('failed, cell overflow, return empty');
                    // console.groupEnd();
                    return [];
                }
                else if (this._flBlocked == PathFinder.BL_TERDEKAT) {
                    // console.log('failed, cell overflow, find neares position');
                    cellCr = this.getCellTerdekatKeTarget(tx, ty);
                }
                else {
                    throw new Error();
                }
                if (cellCr) {
                    res.unshift(cellCr);
                    this.buildPath(cellCr, res);
                }
                // console.groupEnd();
                return res;
            }
            cellCr = this.getOpenCell();
            // console.log(cellCr);
            if (cellCr) {
                cellCr.open = false;
                if (this.checkSampaiTujuan(cellCr.x, cellCr.y, tx, ty)) {
                    res.unshift(cellCr);
                    // console.log('build path');
                    // console.log('sampai tujuan');
                    // console.log(this._cells);
                    this.buildPath(cellCr, res);
                    // console.groupEnd();
                    return res;
                }
                this.cellOpen(cellCr, tx, ty);
            }
            else {
                // console.log('no open cells');
                // console.groupEnd();
                if (this._flBlocked == PathFinder.BL_STOPPED) {
                    return [];
                }
                else if (this._flBlocked == PathFinder.BL_TERDEKAT) {
                    cellCr = this.getCellTerdekatKeTarget(tx, ty);
                }
                else {
                    throw new Error();
                }
                if (cellCr) {
                    res.unshift(cellCr);
                    this.buildPath(cellCr, res);
                }
                return res;
            }
        }
    }
    cellExistsAtPos(ix, jx) {
        let res = false;
        this._cells.forEach(cell => {
            if (cell.x == ix && cell.y == jx) {
                res = true;
            }
        });
        return res;
    }
    cellPosPossible(ix, jx) {
        if (this.cellExistsAtPos(ix, jx)) {
            return false;
        }
        //check block
        if (this._checkCanMoveToPos) {
            if (this._checkCanMoveToPos(ix, jx) == false) {
                return false;
            }
        }
        return true;
    }
    set checkCanMoveToPos(f) {
        this._checkCanMoveToPos = f;
    }
    get maxCells() {
        return this._maxCells;
    }
    set maxCells(value) {
        this._maxCells = value;
    }
    set flBlocked(value) {
        this._flBlocked = value;
    }
    get flDiagonal() {
        return this._flDiagonal;
    }
    set flDiagonal(value) {
        this._flDiagonal = value;
    }
    set checkSampai(value) {
        this._checkSampai = value;
    }
}
/**
 * aksi yang diambil saat jalan terblock
 * 1. berhenti
 * 2. cari posisi terdekat dan ganti target ke posisi tersebut
 * 3. test baru
 */
PathFinder.BL_STOPPED = 1;
PathFinder.BL_TERDEKAT = 2;
// }
