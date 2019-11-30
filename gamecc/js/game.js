var fg;
(function (fg) {
    class App {
        constructor() {
            App._inst = this;
            this._data = new fg.Data();
            this.data.contKanan = document.body.querySelector('div#cont > div.kanan');
            this.data.cont = document.body.querySelector('div#cont');
            this._updater = new fg.Updater();
            this._soalManager = new fg.SoalManager();
            this._soalManager.resetSoal();
            this._userManager = new fg.UserManager();
            this._userManager.userList = this._data.userList;
            this._dialog = new ha.comm.Dialog();
            this._dialog.render(document.body);
            this._fotoAvatarController = new fg.FotoAvatarController();
            this._editJmlPemain = new fg.pages.JmlPemain();
            this._editPemain = new fg.pages.editPemain.EditPemain();
            this._acak = new fg.pages.acak.AcakSoal();
            this._soal = new fg.pages.Soal();
            this._selesai = new fg.pages.selesai.Selesai();
            this.init();
            this.load();
        }
        init() {
            this._editJmlPemain.init();
            this._editPemain.init();
            this._acak.init();
            this._soal.init();
            this._selesai.init();
        }
        loadDefault() {
            let soal;
            soal = JSON.parse(this._soalManager.default);
            this._soalManager.importData(soal);
            console.log(soal);
        }
        load() {
            let str;
            if (window.localStorage) {
                str = window.localStorage.getItem("cc_soal");
                if (str) {
                    let soal;
                    soal = JSON.parse(str);
                    this._soalManager.importData(soal);
                    console.log("data ada");
                    console.log(soal);
                }
                else {
                    console.log('load failed, back to default');
                    this.loadDefault();
                }
            }
            else {
                console.log('local storage not found, back to default');
                this.loadDefault();
            }
        }
        get soalManager() {
            return this._soalManager;
        }
        get updater() {
            return this._updater;
        }
        get dialog() {
            return this._dialog;
        }
        get acak() {
            return this._acak;
        }
        set acak(value) {
            this._acak = value;
        }
        static get inst() {
            return App._inst;
        }
        get data() {
            return this._data;
        }
        get editJmlPemain() {
            return this._editJmlPemain;
        }
        get fotoAvatarController() {
            return this._fotoAvatarController;
        }
        get selesai() {
            return this._selesai;
        }
        get userManager() {
            return this._userManager;
        }
        get editPemain() {
            return this._editPemain;
        }
        get soal() {
            return this._soal;
        }
    }
    fg.App = App;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class Data {
        constructor() {
            this._userList = [];
            this._fotoList = [];
            this._debug = false;
            this._urls = [
                'imgs/photo/img01.png',
                'imgs/photo/img02.png',
                'imgs/photo/img03.png',
                'imgs/photo/img04.png',
                'imgs/photo/img05.png',
                'imgs/photo/img06.png',
                'imgs/photo/img07.png',
                'imgs/photo/img08.png',
                'imgs/photo/img09.png',
                'imgs/photo/img10.png',
                'imgs/photo/img11.png',
                'imgs/photo/img12.png',
            ];
        }
        static inst() {
            if (Data.instData)
                return Data.instData;
            Data.instData = new Data();
            return Data.instData;
        }
        default() {
            this._userList.push(fg.User.default());
            this._userList.push(fg.User.default());
            this._userList.push(fg.User.default());
            this._userList.push(fg.User.default());
        }
        get fotoList() {
            return this._fotoList;
        }
        get userCr() {
            return this._userList[this._userIdx];
        }
        get urls() {
            return this._urls;
        }
        set urls(value) {
            this._urls = value;
        }
        get jmlPemain() {
            return this._userList.length;
        }
        get userList() {
            return this._userList;
        }
        set userList(value) {
            this._userList = value;
        }
        get userIdx() {
            return this._userIdx;
        }
        set userIdx(value) {
            this._userIdx = value;
        }
        get contKanan() {
            return this._contKanan;
        }
        set contKanan(value) {
            this._contKanan = value;
        }
        get cont() {
            return this._cont;
        }
        set cont(value) {
            this._cont = value;
        }
        get debug() {
            return this._debug;
        }
    }
    fg.Data = Data;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class FotoAvatarController {
        constructor() {
        }
        hapusFoto() {
            let foto;
            while (this._fotoList.length > 0) {
                foto = this._fotoList.pop();
                foto.destroy();
            }
        }
        static default() {
            let foto = new FotoAvatarController();
            foto.fotoList = [];
            foto.userList = [];
            return foto;
        }
        pilihFoto(foto) {
            if (!foto.elHtml.classList.contains('selected')) {
                foto.elHtml.classList.add('selected');
            }
        }
        deselectFoto() {
            let foto;
            let i = 0;
            for (i = 0; i < this._fotoList.length; i++) {
                foto = this._fotoList[i];
                foto.elHtml.classList.remove('selected');
            }
        }
        pilihFotoByIdx(idx) {
            let foto;
            this.deselectFoto();
            foto = this._fotoList[idx];
            this.pilihFoto(foto);
        }
        updateScore() {
            let i;
            let user;
            let foto;
            for (i = 0; i < this._fotoList.length; i++) {
                user = this._userList[i];
                foto = this._fotoList[i];
                foto.data.score = user.score;
            }
        }
        buatFoto() {
            let i;
            //clear div
            this._cont.innerHTML = '';
            while (this._fotoList.length > 0) {
                this._fotoList.pop();
            }
            //buat foto
            for (i = 0; i < this._userList.length; i++) {
                let item;
                let user = this._userList[i];
                item = new fg.pages.FotoAvatar();
                item.render(this._cont);
                item.data.nama = user.nama;
                item.data.score = user.score;
                item.data.src = user.imgSrc;
                this._fotoList.push(item);
            }
        }
        set cont(value) {
            this._cont = value;
        }
        set fotoList(value) {
            this._fotoList = value;
        }
        set userList(value) {
            this._userList = value;
        }
    }
    fg.FotoAvatarController = FotoAvatarController;
})(fg || (fg = {}));
var fg;
(function (fg) {
    var kons;
    (function (kons) {
        kons.EVT_TEST = 'EVT_TEST';
        kons.EVT_EDIT_PEMAIN_NEXT = 'evt edit pemain next';
        kons.EVT_EDIT_USER_AVATAR_CLICK = 'evt edit avatar click';
    })(kons = fg.kons || (fg.kons = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    class SoalManager {
        constructor() {
            this._data = [];
            this._catCr = null;
            this._default = `[{"label":"Pertambahan","soal":[{"soal":"1 + 1","jawaban":["2","3","4","5"],"jawabanBenar":1,"score":100},{"soal":"5 + 3","jawaban":["7","8","9","10"],"jawabanBenar":2,"score":100},{"soal":"2 + 2","jawaban":["6","4","2","3"],"jawabanBenar":2,"score":100},{"soal":"5 + 2","jawaban":["7","8","9","10"],"jawabanBenar":1,"score":100}]},{"label":"Perkalian","soal":[{"soal":"3 x 2","jawaban":["6","7","8","9"],"jawabanBenar":1,"score":100},{"soal":"2 x 2","jawaban":["4","5","6","7"],"jawabanBenar":1,"score":100},{"soal":"4 x 1","jawaban":["2","3","4","5"],"jawabanBenar":3,"score":100}]},{"label":"Pengurangan","soal":[{"soal":"3 - 3","jawaban":["0","1","2","3"],"jawabanBenar":1,"score":100},{"soal":"4 - 2","jawaban":["2","3","4","5"],"jawabanBenar":1,"score":100},{"soal":"7 - 4","jawaban":["4","3","2","1"],"jawabanBenar":2,"score":100}]},{"label":"Pembagian","soal":[{"soal":"4 - 2","jawaban":["1","2","3","4"],"jawabanBenar":2,"score":100},{"soal":"6 - 3","jawaban":["1","2","3","4"],"jawabanBenar":3,"score":100},{"soal":"3 - 0","jawaban":["4","3","2","1"],"jawabanBenar":2,"score":100}]}]`;
            // this._data = DataSoal;
        }
        randomSoal(soals) {
            soals[0];
        }
        random() {
            let a = 0;
            let b = 0;
            let len = 0;
            let cat = null;
            len = this._data.length;
            for (let i = 0; i < 100; i++) {
                a = Math.floor(Math.random() * len);
                b = Math.floor(Math.random() * len);
                if (a != b) {
                    cat = this._data[a];
                    this._data[a] = this._data[b];
                    this._data[b] = cat;
                }
            }
            for (let i = 0; i < len; i++) {
                this.randomSoal(this._data[i].soal);
            }
        }
        importSoal(soal, soalSrc) {
            soal.soal = soalSrc.soal;
            soal.jawabanBenar = soalSrc.jawabanBenar;
            soal.score = soalSrc.score;
            soal.sudahDijawab = soalSrc.sudahDijawab;
            for (let i = 0; i < soal.jawaban.length; i++) {
                soal.jawaban[i] = soalSrc[i];
            }
        }
        importCat(cat, catSource) {
            console.log('import cat');
            cat.label = catSource.label;
            for (let i = 0; i < this.catCr.soal.length; i++) {
                this.importSoal(cat.soal[i], catSource.soal[i]);
            }
        }
        importData(dataSource) {
            console.log('import data');
            console.log(dataSource);
            this._data = dataSource;
        }
        resetSoal() {
            let i;
            let j;
            let cat;
            let soal;
            for (i = 0; i < this._data.length; i++) {
                cat = this._data[i];
                for (j = 0; j < cat.soal.length; j++) {
                    soal = cat.soal[j];
                    soal.sudahDijawab = false;
                    if (!soal.score)
                        soal.score = 100;
                }
            }
        }
        getJmlSoal(cat) {
            let i;
            let jml = 0;
            for (i = 0; i < cat.soal.length; i++) {
                if (cat.soal[i].sudahDijawab == false) {
                    jml++;
                }
            }
            return jml;
        }
        getCategoryList() {
            let res = [];
            let i;
            let cat;
            let jml;
            for (i = 0; i < this._data.length; i++) {
                cat = this._data[i];
                jml = this.getJmlSoal(cat);
                if (jml > 0) {
                    res.push({
                        cat: cat,
                        jml: jml
                    });
                }
            }
            return res;
        }
        getSoalBelumDijawab(cat) {
            for (let i = 0; i < cat.soal.length; i++) {
                if (cat.soal[i].sudahDijawab == false) {
                    // console.log('i ' + i);
                    return cat.soal[i];
                }
            }
            throw new Error('');
        }
        get catCr() {
            return this._catCr;
        }
        set catCr(value) {
            this._catCr = value;
        }
        get data() {
            return this._data;
        }
        get default() {
            return this._default;
        }
    }
    fg.SoalManager = SoalManager;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class Updater {
        constructor() {
            // this.date = new Date();
            // console.log('updater constructor');
            this.lists = [];
            requestAnimationFrame(() => {
                this.update();
            });
        }
        update() {
            try {
                // console.log('update ' + Math.random());
                for (let i = 0; i < this.lists.length; i++) {
                    this.lists[i].update();
                }
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        this.update();
                    });
                }, 100);
            }
            catch (e) {
                console.log(e);
            }
        }
        getTime() {
            return new Date().getTime();
        }
        subscribe(item) {
            this.lists.push(item);
        }
        unsubscribe(item) {
            let i;
            for (i = 0; i < this.lists.length; i++) {
                if (this.lists[i] == item) {
                    this.lists.splice(i, 1);
                }
            }
        }
    }
    fg.Updater = Updater;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class User {
        constructor() {
            this._score = 0;
            this._nama = 'nama';
            this._imgSrc = 'imgs/photo/img01.png';
        }
        static default(nama, imgSrc) {
            let user = new User();
            if (!nama)
                nama = 'nama user';
            if (!imgSrc)
                imgSrc = 'imgs/photo/img01.png';
            user.imgSrc = imgSrc;
            user.nama = nama;
            user.score = 100;
            return user;
        }
        get score() {
            return this._score;
        }
        set score(value) {
            this._score = value;
        }
        get nama() {
            return this._nama;
        }
        set nama(value) {
            this._nama = value;
        }
        get imgSrc() {
            return this._imgSrc;
        }
        set imgSrc(value) {
            this._imgSrc = value;
        }
    }
    fg.User = User;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class UserManager {
        resetPemain() {
            let i;
            let user;
            for (i = 0; i < this._userList.length; i++) {
                user = this._userList[i];
                user.score = 0;
            }
        }
        buatPemain(jml) {
            let i;
            let user;
            console.log('buat pemain ' + jml);
            while (this.userList.length > 0) {
                this.userList.pop();
            }
            for (i = 0; i < jml; i++) {
                user = new fg.User();
                this.userList.push(user);
            }
        }
        get userList() {
            return this._userList;
        }
        set userList(value) {
            this._userList = value;
        }
    }
    fg.UserManager = UserManager;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class Event {
        constructor() {
            this.subscriber = [];
        }
        static Inst() {
            if (Event.inst)
                return Event.inst;
            Event.inst = new Event();
            return Event.inst;
        }
        subscribe(eventName, callback, sender) {
            if (this.getSubscriber(eventName, callback, sender)) {
                console.log('WARN: found double subscription');
                return;
            }
            this.subscriber.push({ event: eventName, callBack: callback, sender: sender });
            console.log('ok');
        }
        unsubscribe(eventName, sender) {
            let i;
            let eventItem;
            let ada = false;
            for (i = this.subscriber.length - 1; i >= 0; i--) {
                eventItem = this.subscriber[i];
                if (eventItem.event == eventName) {
                    if (eventItem.sender == sender) {
                        this.subscriber.splice(i, 1);
                        ada = true;
                        console.log('unsubscribe success');
                    }
                }
            }
            if (!ada) {
                console.log('unsubscribe failed');
            }
        }
        getSubscriber(eventName, callback, sender) {
            let i;
            let eventItem;
            for (i = 0; i < this.subscriber.length; i++) {
                eventItem = this.subscriber[i];
                if (eventItem.event == eventName) {
                    if (eventItem.callBack == callback) {
                        if (eventItem.sender == sender) {
                            return eventItem;
                        }
                    }
                }
            }
            return null;
        }
        emit(eventName, data) {
            let i;
            let subscriber;
            let ada = false;
            if (!data)
                data = {};
            for (i = 0; i < this.subscriber.length; i++) {
                subscriber = this.subscriber[i];
                if (subscriber.event == eventName) {
                    subscriber.callBack(data);
                    console.log('emit success');
                    ada = true;
                }
            }
            if (!ada) {
                console.log('emit failed');
            }
        }
    }
    fg.Event = Event;
})(fg || (fg = {}));
var ha;
(function (ha) {
    var core;
    (function (core) {
        class BaseComponent {
            constructor() {
                this._template = '';
                this._elHtml = document.createElement('div');
            }
            onRender() {
            }
            show(el) {
                if (!el) {
                    el = this._elHtml;
                }
                el.style.display = 'block';
            }
            hide(el) {
                if (!el) {
                    el = this._elHtml;
                }
                el.style.display = 'none';
            }
            getEl(query) {
                let el;
                el = this._elHtml.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(this._elHtml);
                    console.log(query);
                    throw new Error('query not found ');
                }
            }
            render(parent) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                parent.appendChild(el);
                this.onRender();
            }
            get template() {
                return this._template;
            }
            get elHtml() {
                return this._elHtml;
            }
            set elHtml(value) {
                this._elHtml = value;
            }
        }
        core.BaseComponent = BaseComponent;
    })(core = ha.core || (ha.core = {}));
})(ha || (ha = {}));
///<reference path='../../core/BaseComponent.ts'/>
var ha;
(function (ha) {
    var comm;
    (function (comm) {
        class Dialog extends ha.core.BaseComponent {
            constructor(body) {
                super();
                this._teks = '';
                this._teks = body;
                this.initTemplate();
            }
            update() {
                if (this._bodyEl) {
                    this._bodyEl.innerHTML = this._teks;
                }
            }
            onRender() {
                this._bodyEl = this.elHtml.querySelector("div.content p");
                this._btnOkEl = this.getEl('button.ok');
                this._btnOkEl.addEventListener('click', () => {
                    this.hide();
                    if (this._onClick)
                        this._onClick();
                });
            }
            initTemplate() {
                this._template = `
                    <!-- The Modal -->
                    <div class="ha-comm-dialog">
                    
                        <!-- Modal content -->
                        <div class="content">
                            <p></p>
                            <button class='ok normal'>OK</button>
                        </div>
                    </div>`;
            }
            set onClick(value) {
                this._onClick = value;
            }
            set teks(value) {
                this._teks = value;
                this.update();
            }
        }
        comm.Dialog = Dialog;
    })(comm = ha.comm || (ha.comm = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comm;
    (function (comm) {
        class Edit extends ha.core.BaseComponent {
            constructor() {
                super();
                this._data = new Data();
                this._data.comp = this;
                this._template = `
                <div class='ha-edit'>
                    <input type='text' class='input'/><br/>
                    <div class='btn-container'>
                        <button class='save'>save</button>
                        <button class='cancel'>cancel</button>
                    </div>
                </div>
            `;
            }
            get data() {
                return this._data;
            }
            onRender() {
                this._data.buttonSaveEl = this.getEl('button.save');
                this._data.buttonCancelEl = this.getEl('button.cancel');
                this._data.buttonContEl = this.getEl('div.btn-container');
                this._data.inputEl = this.getEl('input.input');
                this._elHtml.style.backgroundColor = 'white';
                this._elHtml.addEventListener('mouseenter', () => {
                    console.log('mouse over');
                    this.show(this._data.buttonContEl);
                });
                this._elHtml.addEventListener('mouseleave', () => {
                    console.log('mouse leave');
                    this.hide(this._data.buttonContEl);
                });
                this._data.buttonSaveEl.addEventListener('click', () => {
                    this._data.onSave(this._data.inputEl.value);
                    this.hide(this._data.buttonContEl);
                });
                this.data.buttonCancelEl.addEventListener('click', () => {
                    this.hide(this._data.buttonContEl);
                });
                this._data.inputEl.addEventListener('focus', () => {
                    this.show(this._data.buttonContEl);
                });
                this.hide(this._data.buttonContEl);
            }
        }
        comm.Edit = Edit;
        class Data {
            get comp() {
                return this._comp;
            }
            set comp(value) {
                this._comp = value;
            }
            get dirty() {
                return this._dirty;
            }
            set dirty(value) {
                this._dirty = value;
            }
            get buttonContEl() {
                return this._buttonContEl;
            }
            set buttonContEl(value) {
                this._buttonContEl = value;
            }
            get onSave() {
                return this._onSave;
            }
            set onSave(value) {
                this._onSave = value;
            }
            get inputEl() {
                return this._inputEl;
            }
            set inputEl(value) {
                this._inputEl = value;
            }
            get buttonCancelEl() {
                return this._buttonCancelEl;
            }
            set buttonCancelEl(value) {
                this._buttonCancelEl = value;
            }
            get buttonSaveEl() {
                return this._buttonSaveEl;
            }
            set buttonSaveEl(value) {
                this._buttonSaveEl = value;
            }
        }
    })(comm = ha.comm || (ha.comm = {}));
})(ha || (ha = {}));
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
///<reference path='../../core/BaseComponent.ts'/>
var ha;
(function (ha) {
    var comm;
    (function (comm) {
        var tree;
        (function (tree) {
            class Tree extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this.expanded = true;
                    this._template = `
                <div class='ha-comm-tree'>
                    <div class='header'>
                        <button class='toggle'>+</button>
                        <span class='title'>title</span>
                    </div>
                    <div class='content'></div>
                </div>
            `;
                }
                onRender() {
                    this._titleEl = this.getEl('span.title');
                    this._content = this.getEl('div.content');
                    this._toggleEl = this.getEl('button.toggle');
                    this._toggleEl.onclick = () => {
                        this.expanded = !this.expanded;
                        if (this.expanded) {
                            this.show(this._content);
                        }
                        else {
                            this.hide(this._content);
                        }
                    };
                }
                get titleEl() {
                    return this._titleEl;
                }
                set titleEl(value) {
                    this._titleEl = value;
                }
                get content() {
                    return this._content;
                }
                set content(value) {
                    this._content = value;
                }
            }
            tree.Tree = Tree;
        })(tree = comm.tree || (comm.tree = {}));
    })(comm = ha.comm || (ha.comm = {}));
})(ha || (ha = {}));
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        class FotoAvatar extends ha.core.BaseComponent {
            constructor() {
                super();
                this._data = new Data();
                this.data.fotoAvatar = this;
                this._template = `
                <div class='foto-avatar selected'>
                    <img class='foto' src=''/>
                    <hr/>
                    <p class='nama'></p>
                    <p class='score'></p>
                </div>
            `;
            }
            destroy() {
                if (this._elHtml) {
                    if (this._elHtml.parentElement) {
                        this._elHtml.parentElement.removeChild(this._elHtml);
                    }
                }
            }
            default() {
                let fotoAvatar;
                fotoAvatar = new FotoAvatar();
                return fotoAvatar;
            }
            onRender() {
                this.imgEl = this.getEl('img.foto');
                this.nameEl = this.getEl('p.nama');
                this.scoreEl = this.getEl('p.score');
                this.update();
            }
            update() {
                if (this.nameEl) {
                    this.nameEl.innerText = this.data.nama;
                }
                if (this.imgEl) {
                    this.imgEl.src = this.data.src;
                }
                if (this.scoreEl) {
                    this.scoreEl.innerText = this.data.score + '';
                }
            }
            get data() {
                return this._data;
            }
        }
        pages.FotoAvatar = FotoAvatar;
        class Data {
            set fotoAvatar(value) {
                this._fotoAvatar = value;
            }
            get nama() {
                return this._nama;
            }
            set nama(value) {
                this._nama = value;
                this._fotoAvatar.update();
            }
            get score() {
                return this._score;
            }
            set score(value) {
                this._score = value;
                this._fotoAvatar.update();
            }
            get src() {
                return this._src;
            }
            set src(value) {
                this._src = value;
                this._fotoAvatar.update();
            }
        }
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        class JmlPemain extends ha.core.BaseComponent {
            constructor() {
                super();
                this._jmlPemain = 2;
                this._template = `
                <div class='jml-pemain'>
                    <p class='judul'>Pilih Jumlah Pemain: <span class='jml'></span></p>
                    <div class='cont'>
                        <button class='jml a'>1</jml>
                        <button class='jml b'>2</jml>
                        <button class='jml c'>3</jml>
                        <button class='jml d'>4</jml>
                    </div>
                    <button class='next normal'>Selanjutnya</button>
                </div>
            `;
            }
            get jmlPemain() {
                return this._jmlPemain;
            }
            get onNextClick() {
                return this._onNextClick;
            }
            set onNextClick(value) {
                this._onNextClick = value;
            }
            //TODO: refactor
            init() {
                let data = fg.App.inst.data;
                let userManager = fg.App.inst.userManager;
                let editPemain = fg.App.inst.editPemain;
                console.log(data);
                this.render(data.cont);
                this.onNextClick = () => {
                    console.log('edit jml pemain on next click, jml Pemain ' + data.jmlPemain);
                    console.log(data.userList);
                    this.hide();
                    userManager.buatPemain(this.jmlPemain);
                    editPemain.userList = data.userList;
                    editPemain.show();
                    editPemain.onShow();
                };
            }
            onRender() {
                let i;
                let els;
                let btn;
                els = this._elHtml.querySelectorAll('button.jml');
                for (i = 0; i < 4; i++) {
                    let j = i + 1;
                    btn = els[i];
                    btn.addEventListener('click', () => {
                        this.jmlClick(j);
                    });
                }
                btn = this.getEl('button.next');
                btn.addEventListener('click', () => {
                    console.log('next click');
                    this._onNextClick();
                });
                this._jmlEl = this.getEl('span.jml');
                this._jmlEl.innerText = this._jmlPemain + '';
                if (fg.Data.inst().debug) {
                    this._jmlPemain = 4;
                    this._onNextClick();
                }
            }
            jmlClick(i) {
                // console.log('jml pemain ' + i);
                this._jmlPemain = i;
                this._jmlEl.innerText = this._jmlPemain + '';
            }
        }
        pages.JmlPemain = JmlPemain;
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestEdit {
        constructor() {
            let edit = new ha.comm.Edit();
            edit.render(document.body);
            edit.data.onSave((text) => { console.log('data saved ' + text); });
        }
    }
    fg.TestEdit = TestEdit;
})(fg || (fg = {}));
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var acak;
        (function (acak) {
            class AcakSoal extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this.counterCategory = 0;
                    this.counterCategoryMax = 0;
                    this._catNo = 0;
                    this.counterGlobal = 0;
                    this.counterGlobalMax = 30;
                    this._catList = [];
                    this._template = `
                <div class='acak-soal' style='position:absolute'>
                    <p class='judul'>Mengacak Soal</p>
                    <br/>
                    <br/>
                    <span class='acak'></span>
                    <br/>
                    <br/>
                    <div class='button'>
                        <button class='start normal'>Acak</button>
                        <button class='mulai normal'>Mulai Kerjakan Soal</button>
                    </div>
                </div>
            `;
                }
                init() {
                    let updater = fg.App.inst.updater;
                    let data = fg.App.inst.data;
                    let soal = fg.App.inst.soal;
                    this.soalManager = fg.App.inst.soalManager;
                    this._catList = this.soalManager.getCategoryList();
                    this.updater = updater;
                    this.render(data.contKanan);
                    this.hide();
                    this.mulaiClick = () => {
                        this.soalManager.catCr = this._catList[this.catNo].cat;
                        this.hide();
                        soal.show();
                        soal.soal = this.soalManager.getSoalBelumDijawab(this.soalManager.catCr);
                        ;
                        soal.mulai();
                        soal.user = data.userCr;
                    };
                }
                reset() {
                    this.show(this.tombolAcakEl);
                    this.hide(this.tombolMulaiEl);
                    this.counterCategory = 0;
                    this.counterGlobal = 0;
                    this.counterCategoryMax = 0;
                    this._catNo = 0;
                    this._catList = this.soalManager.getCategoryList();
                    this.updateCatLabel();
                    if (this._catList.length == 1) {
                        this._catNo = 0;
                        console.log('acak finish dengan jumlah cat 1');
                        this.updateCatLabel();
                        this.acakFinish();
                    }
                }
                updateCatLabel() {
                    this.spanEl.innerText = this._catList[this.catNo].cat.label + ' (' + this._catList[this.catNo].jml + ' soal)';
                }
                update() {
                    this.counterCategory++;
                    if (this.counterCategory > this.counterCategoryMax) {
                        this.counterCategory = 0;
                        this.counterCategoryMax += .08;
                        this._catNo++;
                        if (this.catNo >= this._catList.length) {
                            this._catNo = 0;
                        }
                    }
                    this.counterGlobal++;
                    if (this.counterGlobal > this.counterGlobalMax) {
                        this.acakFinish();
                    }
                    this.updateCatLabel();
                }
                acakFinish() {
                    this._updater.unsubscribe(this);
                    this.show(this.tombolMulaiEl);
                    this.hide(this.tombolAcakEl);
                }
                tombolMulaiClick() {
                    this._mulaiClick();
                }
                tombolStartAcakClick() {
                    console.log('AcakSoal.tombol start acak click');
                    this.tombolAcakEl.innerText = 'Mulai';
                    this.hide(this.tombolAcakEl);
                    this._updater.subscribe(this);
                }
                onRender() {
                    this.spanEl = this.getEl('span.acak');
                    this.tombolAcakEl = this.getEl('button');
                    this.tombolAcakEl.addEventListener('click', this.tombolStartAcakClick.bind(this));
                    this.tombolMulaiEl = this.getEl('button.mulai');
                    this.tombolMulaiEl.addEventListener('click', this.tombolMulaiClick.bind(this));
                    this.hide(this.tombolMulaiEl);
                    // this.spanEl.innerText = this._catList[this.catNo].cat.label + ' (' + this._catList[this.catNo].jml + ')';
                    this.updateCatLabel();
                }
                set mulaiClick(value) {
                    this._mulaiClick = value;
                }
                // public set catList(value: Array<ICategoryAktif>) {
                // 	this._catList = value;
                // }
                // public get catList(): Array<ICategoryAktif> {
                // 	return this._catList;
                // } 
                get catNo() {
                    return this._catNo;
                }
                set updater(value) {
                    this._updater = value;
                }
            }
            acak.AcakSoal = AcakSoal;
        })(acak = pages.acak || (pages.acak = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var editPemain;
        (function (editPemain) {
            class EditPemain extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._userList = [];
                    this.avatar = new fg.pages.editPemain.PilihAvatar();
                    this._template = `
                <div class='edit-pemain'>
                    <p class='judul'>Isi Nama Pemain:</p>
                    <div class='cont'>

                    </div>
                    <div>
                        <button class='next normal'>Selanjutnya</button>
                    </div>
                </div>
            `;
                }
                onShow() {
                    let i = 0;
                    this.editUserList = [];
                    this.cont.innerHTML = '';
                    for (i = 0; i < this._userList.length; i++) {
                        // console.log('create pemain ' + i);
                        let editUser;
                        editUser = new fg.pages.editPemain.EditUser();
                        editUser.render(this.cont);
                        editUser.nama = this._userList[i].nama;
                        editUser.src = this._userList[i].imgSrc;
                        this.editUserList.push(editUser);
                        editUser.avatarClick = () => {
                            this._editUserAktif = editUser;
                            this.avatar.show();
                        };
                    }
                    this.avatar.onSelect = (src) => {
                        this._editUserAktif.src = src;
                    };
                }
                init() {
                    this.render(fg.App.inst.data.cont);
                    this.hide();
                    this._onNextClick =
                        () => {
                            console.log('edit pemain on next click');
                            this.hide();
                            fg.App.inst.soalManager.resetSoal();
                            fg.App.inst.acak.show();
                            // App.inst.acak.catList = App.inst.soalManager.getCategoryList();
                            fg.App.inst.acak.reset();
                            fg.App.inst.fotoAvatarController.cont = document.body.querySelector('div#cont div.kiri');
                            fg.App.inst.fotoAvatarController.fotoList = fg.App.inst.data.fotoList;
                            fg.App.inst.fotoAvatarController.userList = fg.App.inst.data.userList;
                            fg.App.inst.fotoAvatarController.buatFoto();
                            fg.App.inst.data.userIdx = 0;
                            fg.App.inst.fotoAvatarController.pilihFotoByIdx(fg.App.inst.data.userIdx);
                        };
                }
                onRender() {
                    this.btnNextEl = this.getEl('button.next');
                    this.cont = this.getEl('div.cont');
                    this.btnNextEl.addEventListener('click', () => {
                        let i;
                        let user;
                        for (i = 0; i < this._userList.length; i++) {
                            user = this._userList[i];
                            user.nama = this.editUserList[i].nama;
                            user.imgSrc = this.editUserList[i].src;
                        }
                        this._onNextClick();
                    });
                    this.avatar.render(this._elHtml.parentElement);
                    this.avatar.hide();
                }
                get editUserList() {
                    return this._editUserList;
                }
                set editUserList(value) {
                    this._editUserList = value;
                }
                get userAktif() {
                    return this._userAktif;
                }
                set userAktif(value) {
                    this._userAktif = value;
                }
                get userList() {
                    return this._userList;
                }
                set userList(value) {
                    this._userList = value;
                }
            }
            editPemain.EditPemain = EditPemain;
        })(editPemain = pages.editPemain || (pages.editPemain = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var editPemain;
        (function (editPemain) {
            class EditUser extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._template = `
                <div class='edit-user'>
                    <div class='input-cont'>
                        <span>Nama:</span><br/>
                        <input type='text'/>
                    </div>
                    <div class='img-cont'>
                        <button class='avatar'>
                            <img src=''/>
                        </button>
                    </div>
                </div>
            `;
                }
                onRender() {
                    this._inputEl = this.getEl('input');
                    this._inputEl.onblur = () => {
                        this._nama = this._inputEl.value;
                    };
                    this._imgEl = this.getEl('img');
                    this._imgEl.src = 'imgs/photo/img01.png';
                    this._buttonAvatarEl = this.getEl('button.avatar');
                    this._buttonAvatarEl.onclick = () => {
                        this._avatarClick();
                    };
                    this.update();
                }
                update() {
                    if (this._inputEl)
                        this._inputEl.value = this._nama;
                    if (this._imgEl)
                        this._imgEl.src = this._src;
                }
                get nama() {
                    return this._nama;
                }
                set nama(value) {
                    this._nama = value;
                    this.update();
                }
                get src() {
                    return this._src;
                }
                set src(value) {
                    this._src = value;
                    // console.log('update src ' + value);
                    this.update();
                }
                get avatarClick() {
                    return this._avatarClick;
                }
                set avatarClick(value) {
                    this._avatarClick = value;
                }
            }
            editPemain.EditUser = EditUser;
        })(editPemain = pages.editPemain || (pages.editPemain = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var editPemain;
        (function (editPemain) {
            class PilihAvatar extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._template = `
                <div class='pilih-avatar'>
                    <p class='judul'>Pilih Avatar:</p>
                    <div class='grid-cont'>
                    </div>
                </div>
            `;
                    this.grid = new ha.comm.grid.Grid(4, 3);
                }
                onRender() {
                    let cont;
                    let i;
                    let j;
                    cont = this.getEl('div.grid-cont');
                    this.grid.render(cont);
                    for (i = 0; i < 4; i++) {
                        for (j = 0; j < 3; j++) {
                            let src = fg.Data.inst().urls[j * 4 + i];
                            let btn = new ImgButton(src);
                            btn.onClick = () => {
                                this._onSelect(src);
                                this.hide();
                            };
                            btn.render(this.grid.getCell(i, j));
                        }
                    }
                }
                get onSelect() {
                    return this._onSelect;
                }
                set onSelect(value) {
                    this._onSelect = value;
                }
            }
            editPemain.PilihAvatar = PilihAvatar;
            class ImgButton extends ha.core.BaseComponent {
                constructor(src) {
                    super();
                    this.src = '';
                    this.src = src;
                    this._template = `
            <div class='pages-edit-pemain-img-btn'>
                <button>
                    <img src=''/>
                </button>
            </div>
            `;
                }
                onRender() {
                    this.imgEl = this.getEl('img');
                    this.imgEl.src = this.src;
                    this.btnEl = this.getEl('button');
                    this.btnEl.addEventListener('click', () => {
                        this._onClick(this.src);
                    });
                }
                get onClick() {
                    return this._onClick;
                }
                set onClick(value) {
                    this._onClick = value;
                }
            }
            editPemain.ImgButton = ImgButton;
        })(editPemain = pages.editPemain || (pages.editPemain = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var selesai;
        (function (selesai) {
            class Selesai extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this._data = new Data();
                    this._data.view = this;
                    this._template = `
                <div class='pages-selesai'>
                    <p class='judul'>Permainan Selesai</p>
                    <img class='logo' src='imgs/piala.png'/>
                    <div class='juara'>
                        
                    </div>
                    <button class='main-lagi normal'>Main Lagi</button>
                </div>
            `;
                }
                init() {
                    this._data.daftarPemenang = fg.App.inst.data.userList;
                    this._data.onMulaiLagi = () => {
                        this.hide();
                        fg.App.inst.editJmlPemain.show();
                        fg.App.inst.fotoAvatarController.hapusFoto();
                    };
                    this.render(fg.App.inst.data.cont);
                    this.hide();
                }
                onRender() {
                    this.data.contJuara = this.getEl('div.juara');
                    this.data.tombolMulaiLagi = this.getEl('button.main-lagi');
                    this.data.tombolMulaiLagi.addEventListener('click', () => {
                        this.data.onMulaiLagi();
                    });
                }
                urutkanPemenang() {
                    let user1;
                    let user2;
                    // let tempScore: User;
                    let i;
                    let j;
                    for (i = 0; i < this._data.daftarPemenang.length; i++) {
                        for (j = i + 1; j < this._data.daftarPemenang.length; j++) {
                            user1 = this._data.daftarPemenang[i];
                            user2 = this._data.daftarPemenang[j];
                            if (user2.score > user1.score) {
                                this._data.daftarPemenang[i] = user2;
                                this._data.daftarPemenang[j] = user1;
                            }
                        }
                    }
                }
                renderPemenang() {
                    let i;
                    let user;
                    let urutanPemenang;
                    if (!this._data.contJuara)
                        return;
                    this._data.contJuara.innerHTML = '';
                    for (i = 0; i < this.data.daftarPemenang.length; i++) {
                        user = this.data.daftarPemenang[i];
                        urutanPemenang = new selesai.UrutanPemenang();
                        urutanPemenang.render(this.data.contJuara);
                        urutanPemenang.data.imgSrc = user.imgSrc;
                        urutanPemenang.data.nama = user.nama;
                        urutanPemenang.data.score = user.score;
                    }
                }
                update() {
                }
                get data() {
                    return this._data;
                }
            }
            selesai.Selesai = Selesai;
            class Data {
                get onMulaiLagi() {
                    return this._onMulaiLagi;
                }
                set onMulaiLagi(value) {
                    this._onMulaiLagi = value;
                }
                get tombolMulaiLagi() {
                    return this._tombolMulaiLagi;
                }
                set tombolMulaiLagi(value) {
                    this._tombolMulaiLagi = value;
                }
                get contJuara() {
                    return this._contJuara;
                }
                set contJuara(value) {
                    this._contJuara = value;
                }
                get view() {
                    return this._view;
                }
                set view(value) {
                    this._view = value;
                }
                get daftarPemenang() {
                    return this._daftarPemenang;
                }
                set daftarPemenang(value) {
                    this._daftarPemenang = value;
                    this._view.renderPemenang();
                }
                createDefault() {
                    this._daftarPemenang = [
                        fg.User.default(),
                        fg.User.default(),
                        fg.User.default(),
                        fg.User.default()
                    ];
                    this._onMulaiLagi = () => {
                        console.log('mulai lagi dari awal');
                    };
                    this._daftarPemenang[0].score = 100;
                    this._daftarPemenang[1].score = 200;
                    this._daftarPemenang[2].score = 300;
                    this._daftarPemenang[3].score = 400;
                }
            }
        })(selesai = pages.selesai || (pages.selesai = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        var selesai;
        (function (selesai) {
            class UrutanPemenang extends ha.core.BaseComponent {
                constructor() {
                    super();
                    this.namaEl = null;
                    this.scoreEl = null;
                    this.imgEl = null;
                    this._template = `
                <div class='urutan-pemenang table'>
                    <div class='table-cell nama-score'>
                        <p class='nama'></p>
                        <p class='score'><span class='score'></span></p>
                    </div>
                    <div class='table-cell img'>
                        <img class='avatar' src=''/>
                    </div>
                </div>
            `;
                    this._data = new Data();
                    this._data.view = this;
                }
                get data() {
                    return this._data;
                }
                updateEl() {
                    this.namaEl.innerText = this.data.nama;
                    this.scoreEl.innerHTML = this.data.score + '';
                    this.imgEl.src = this.data.imgSrc;
                }
                onRender() {
                    this.namaEl = this.getEl('p.nama');
                    this.imgEl = this.getEl('img.avatar');
                    this.scoreEl = this.getEl('span.score');
                }
            }
            selesai.UrutanPemenang = UrutanPemenang;
            class Data {
                get view() {
                    return this._view;
                }
                set view(value) {
                    this._view = value;
                }
                get nama() {
                    return this._nama;
                }
                set nama(value) {
                    this._nama = value;
                    this.view.updateEl();
                }
                get imgSrc() {
                    return this._imgSrc;
                }
                set imgSrc(value) {
                    this._imgSrc = value;
                    this.view.updateEl();
                }
                get score() {
                    return this._score;
                }
                set score(value) {
                    this._score = value;
                    this.view.updateEl();
                }
            }
        })(selesai = pages.selesai || (pages.selesai = {}));
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    var pages;
    (function (pages) {
        class Soal extends ha.core.BaseComponent {
            constructor() {
                super();
                this.jawabansEl = [];
                this.initTemplate();
                this._timer = new fg.Timer();
                this._timer.waktuHabis = () => {
                    this._dialog.teks = 'Waktu habis! Nilaimu dikurangi ' + this._soal.score;
                    this._dialog.show();
                };
            }
            init() {
                let data = fg.App.inst.data;
                let soalManager = fg.App.inst.soalManager;
                let selesai = fg.App.inst.selesai;
                let acak = fg.App.inst.acak;
                this._dialog = fg.App.inst.dialog;
                this._timer.updater = fg.App.inst.updater;
                this._photoAvatarController = fg.App.inst.fotoAvatarController;
                this.render(data.contKanan);
                this.hide();
                this._onFinish = () => {
                    data.userIdx++;
                    if (data.userIdx >= data.userList.length) {
                        data.userIdx = 0;
                    }
                    fg.App.inst.fotoAvatarController.pilihFotoByIdx(fg.App.inst.data.userIdx);
                    this.hide();
                    if (soalManager.getCategoryList().length == 0) {
                        console.log('soal habis');
                        selesai.urutkanPemenang();
                        selesai.show();
                        selesai.data.daftarPemenang = data.userList;
                    }
                    else {
                        acak.show();
                        // acak.catList = soalManager.getCategoryList();
                        acak.reset();
                    }
                };
            }
            mulai() {
                this.timer.mulai();
                this.extractSoal(this._soal);
                this._dialog.onClick = this.dialogOnClick.bind(this);
                let i;
                for (i = 0; i < this.jawabansEl.length; i++) {
                    this.jawabansEl[i].parentElement.classList.remove('pilih');
                }
            }
            onRender() {
                this.initElementRef();
                this.initListener();
                this.timer.element = this.waktuEl;
            }
            initElementRef() {
                this.soalContEl = this.getEl('div.soal-cont span');
                this.waktuEl = this.getEl('div.timer span');
                this.jawabansEl.push(this.getEl('button.jawab:nth-child(1) span:nth-child(2)'));
                this.jawabansEl.push(this.getEl('button.jawab:nth-child(2) span:nth-child(2)'));
                this.jawabansEl.push(this.getEl('button.jawab:nth-child(3) span:nth-child(2)'));
                this.jawabansEl.push(this.getEl('button.jawab:nth-child(4) span:nth-child(2)'));
                this.nilaiEl = this.getEl('span.score');
            }
            initListener() {
                let button;
                for (let i = 0; i < this.jawabansEl.length; i++) {
                    button = this.jawabansEl[i].parentElement;
                    button.addEventListener('click', () => {
                        this.jawabClick(i, this.jawabansEl[i].parentElement);
                    });
                }
            }
            jawabClick(idx, button) {
                console.log('user pilih jawaban ' + idx);
                button.classList.add('pilih');
                if (idx == this._soal.jawabanBenar - 1) {
                    console.log('jawaban benar');
                    this._user.score += this._soal.score;
                    this._dialog.teks = 'Jawabanmu benar, nilaimu bertambah ' + this._soal.score;
                    this._dialog.show();
                }
                else {
                    console.log('jawaban salah, idx ' + idx + '/jawaban benar ' + this._soal.jawabanBenar);
                    this._user.score -= 100;
                    if (this._user.score < 0)
                        this._user.score = 0;
                    this.dialog.teks = 'Jawabanmu Salah, nilaimu dikurangi ' + this._soal.score;
                    this.dialog.show();
                }
                this._soal.sudahDijawab = true;
                this.timer.stop();
                this._photoAvatarController.updateScore();
            }
            dialogOnClick() {
                this._dialog.onClick = null;
                this._onFinish();
            }
            extractSoal(soal) {
                this.soalContEl.innerHTML = soal.soal;
                this.jawabansEl[0].innerHTML = soal.jawaban[0];
                this.jawabansEl[1].innerHTML = soal.jawaban[1];
                this.jawabansEl[2].innerHTML = soal.jawaban[2];
                if (soal.jawaban[3]) {
                    this.jawabansEl[3].innerHTML = soal.jawaban[3];
                    this.show(this.getEl('button.jawab:nth-child(' + 4 + ')'));
                }
                else {
                    this.hide(this.getEl('button.jawab:nth-child(' + 4 + ')'));
                }
                this.nilaiEl.innerText = 'Nilai: ' + soal.score;
            }
            initTemplate() {
                this._template =
                    `<div class='pages-soal'>
                    <div class='score-cont table'>
                        <div class='score table-column'>
                            <span class='score'>nilai:500</span>
                        </div>
                        <div class='timer table-column kanan'>
                            <span>waktu: 00:00</span>
                        </div>
                    </div>
                    <hr/>
                    <div class='soal-cont'>
                        <Span>soal-soal</span>
                    </div>
                    <div class='jawab-cont'>
                        <button class='jawab'>
                            <span>A:</span>
                            <span>Text</span>
                        </button>
                        <button class='jawab'>
                            <span>B:</span>
                            <span>Text</span>
                        </button>
                        <button class='jawab'>
                            <span>C:</span>
                            <span>Text</span>
                        </button>
                        <button class='jawab'>
                            <span>D:</span>
                            <span>Text</span>
                        </button>
                    </div>
                </div>`;
            }
            get soal() {
                return this._soal;
            }
            set soal(value) {
                this._soal = value;
            }
            get dialog() {
                return this._dialog;
            }
            set dialog(value) {
                this._dialog = value;
            }
            get user() {
                return this._user;
            }
            set user(value) {
                this._user = value;
            }
            get onFinish() {
                return this._onFinish;
            }
            set onFinish(value) {
                this._onFinish = value;
            }
            get timer() {
                return this._timer;
            }
            get photoAvatarController() {
                return this._photoAvatarController;
            }
            set photoAvatarController(value) {
                this._photoAvatarController = value;
            }
        }
        pages.Soal = Soal;
    })(pages = fg.pages || (fg.pages = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    class Timer {
        constructor() {
            this._waktuAwal = 0;
            this._max = 60;
            this._waktuAwal = this.waktuSekarang();
        }
        stop() {
            this._updater.unsubscribe(this);
        }
        mulai() {
            this._updater.subscribe(this);
            this._waktuAwal = this.waktuSekarang();
        }
        waktuSekarang() {
            return new Date().getTime();
        }
        waktuTerlewat() {
            let hasil;
            hasil = Math.floor(((new Date().getTime()) - this._waktuAwal) / 1000);
            return hasil;
        }
        waktuDisplay(n) {
            return Math.max(this._max - n, 0) + '';
        }
        update() {
            if (this._element) {
                this._element.innerText = 'Waktu: ' + this.waktuDisplay(this.waktuTerlewat());
            }
            if (this.waktuTerlewat() > this._max) {
                this.stop();
                this._waktuHabis();
            }
        }
        get element() {
            return this._element;
        }
        set element(value) {
            this._element = value;
        }
        get waktu() {
            return this._waktuAwal;
        }
        get max() {
            return this._max;
        }
        set max(value) {
            this._max = value;
        }
        set updater(value) {
            this._updater = value;
        }
        get waktuHabis() {
            return this._waktuHabis;
        }
        set waktuHabis(value) {
            this._waktuHabis = value;
        }
    }
    fg.Timer = Timer;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestAcakSoal {
        // private _soalManager: fg.SoalManager = new SoalManager();
        constructor() {
            this._acak = new fg.pages.acak.AcakSoal();
            this._acak.render(document.body);
            this._acak.updater = new fg.Updater();
            this._acak.reset();
            this._acak.mulaiClick = () => {
                console.log('mulai click');
            };
        }
    }
    fg.TestAcakSoal = TestAcakSoal;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestAvatar {
        constructor() {
            let avatar;
            avatar = new fg.pages.FotoAvatar();
            avatar.data.nama = 'nama user';
            avatar.data.score = 100;
            avatar.data.src = 'imgs/photo/img01.png';
            avatar.render(document.body.querySelector('div.cont'));
        }
    }
    fg.TestAvatar = TestAvatar;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestEditPemain {
        constructor() {
            let ep = new fg.pages.editPemain.EditPemain;
            fg.Data.inst().default();
            ep.userList = fg.Data.inst().userList;
            ep.render(document.body);
            ep.onShow();
            // ep.onNextClick = () => { };
            ep.init();
        }
    }
    fg.TestEditPemain = TestEditPemain;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestEvent {
        constructor() {
            this.evt = { event: 'string', callBack: () => { console.log('event 1'); }, sender: this };
            this.testEmit();
            this.testUnsubscribe();
        }
        testEmit() {
            console.log('single subscribtion');
            fg.Event.Inst().subscribe(this.evt.event, this.evt.callBack, this.evt.sender);
            console.log('');
            console.log('emit no subscriber');
            fg.Event.Inst().emit('no event');
            console.log('');
            console.log('double subscribtion');
            fg.Event.Inst().subscribe(this.evt.event, this.evt.callBack, this.evt.sender);
            console.log('');
            console.log('emit test');
            fg.Event.Inst().emit(this.evt.event);
        }
        testUnsubscribe() {
            console.log('');
            console.log('unsubscribe');
            fg.Event.Inst().unsubscribe(this.evt.event, this.evt.sender);
            console.log('');
            console.log('unsubscribe');
            fg.Event.Inst().unsubscribe('no event', this);
            console.log('');
            console.log('test emit setelah unsubscribe');
            fg.Event.Inst().emit(this.evt.event);
        }
    }
    fg.TestEvent = TestEvent;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestFotoAvatarController {
        constructor() {
            this.initData();
            this._fotoAvatarController = new fg.FotoAvatarController();
            this._fotoAvatarController.cont = document.body;
            this._fotoAvatarController.fotoList = this.data.fotoList;
            // this._fotoAvatarController.jml = this.data.jmlPemain;
            this._fotoAvatarController.userList = this.data.userList;
            this._fotoAvatarController.buatFoto();
        }
        initData() {
            this.data = new fg.Data();
            this.userManager = new fg.UserManager();
            this.userManager.userList = this.data.userList;
            this.userManager.buatPemain(4);
        }
        get fotoAvatarController() {
            return this._fotoAvatarController;
        }
    }
    fg.TestFotoAvatarController = TestFotoAvatarController;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestGrid {
        constructor() {
            let grid;
            grid = new ha.comm.grid.Grid(4, 4);
            grid.render(document.body);
            grid.getCell(0, 0).innerText = 'hallo';
            grid.getCell(2, 2).innerText = 'hallo';
            grid.getCell(1, 1).innerText = 'hallo';
            grid.getCell(3, 3).innerText = 'hallo';
            grid.getCell(0, 3).innerText = 'hallo';
            grid.getCell(3, 0).innerText = 'hallo';
        }
    }
    fg.TestGrid = TestGrid;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestInput {
        constructor() {
            let input = new ha.comm.Edit();
            input.data.onSave = (str) => {
                console.log('on save ' + str);
            };
            input.render(document.body);
        }
    }
    fg.TestInput = TestInput;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestJmlPemain {
        constructor() {
            this._editJmlPemain = new fg.pages.JmlPemain();
            this._editJmlPemain.render(document.body);
            this._editJmlPemain.onNextClick = () => {
                console.log('edit jml pemain on next click');
            };
        }
    }
    fg.TestJmlPemain = TestJmlPemain;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestPilihAvatar {
        constructor() {
            let avatar;
            avatar = new fg.pages.editPemain.PilihAvatar();
            avatar.render(document.body);
            avatar.onSelect = (item) => {
                console.log('select' + item);
            };
        }
    }
    fg.TestPilihAvatar = TestPilihAvatar;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestSelesai {
        constructor() {
            let view = new fg.pages.selesai.Selesai();
            view.render(document.body);
            console.log(view.data);
            view.data.createDefault();
            view.urutkanPemenang();
            view.renderPemenang();
        }
    }
    fg.TestSelesai = TestSelesai;
})(fg || (fg = {}));
var fg;
(function (fg) {
    var test;
    (function (test) {
        class TestSoal {
            constructor() {
                let soal = new fg.pages.Soal();
                let soalManager = new fg.SoalManager();
                soal = new fg.pages.Soal();
                soal.dialog = new ha.comm.Dialog();
                soal.timer.updater = new fg.Updater();
                soal.timer.max = 50;
                soal.soal = soalManager.getSoalBelumDijawab(soalManager.getCategoryList()[0].cat);
                soal.user = fg.User.default();
                soal.photoAvatarController = fg.FotoAvatarController.default();
                soal.onFinish = () => {
                    console.log('soal finish');
                };
                soal.render(document.body);
                soal.dialog.render(document.body);
                soal.dialog.hide();
                soal.mulai();
            }
        }
        test.TestSoal = TestSoal;
    })(test = fg.test || (fg.test = {}));
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestUrutanPemenang {
        constructor() {
            let view = new fg.pages.selesai.UrutanPemenang();
            view.render(document.body);
            view.data.nama = 'nama pemain';
            view.data.imgSrc = './imgs/photo/img01.png';
            view.data.score = 1500;
        }
    }
    fg.TestUrutanPemenang = TestUrutanPemenang;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class TestTree {
        constructor() {
            let tree = new ha.comm.tree.Tree;
            tree.render(document.body);
            let tree2 = new ha.comm.tree.Tree();
            tree2.render(tree.content);
            tree2.content.innerHTML = 'I like html5';
        }
    }
    fg.TestTree = TestTree;
})(fg || (fg = {}));
