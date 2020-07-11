"use strict";
class Input extends BaseComponent {
    init() {
        this._elHtml = document.body.querySelector('div.cont');
        this.mode = App.MODE_BARU;
        this.simpanTbl.onclick = () => {
            if (App.MODE_EDIT == this.mode) {
                let post = App.db.getById(this.id);
                post.teks = this.textArea.value;
                post.noHp = this.nohp.value;
                App.db.update(post);
            }
            else if (App.MODE_BARU == this.mode) {
                let post = new PostObj();
                post.teks = this.textArea.value;
                post.noHp = this.nohp.value;
                App.db.insert(post);
            }
            else {
                console.log('this mode ' + this.mode);
                throw new Error();
            }
            this.id = null;
            this.mode = App.MODE_BARU;
            this.textArea.value = '';
            this.nohp.value = '';
            this.render();
        };
    }
    render() {
        let posts = App.db.get();
        this.list.innerHTML = '';
        this.list.style.display = 'block';
        posts.forEach((item) => {
            let view = new ItemView();
            view.text.innerHTML = (this.renderHtml(item.teks));
            view.post = item;
            view.attach(this.list);
            view.share.href = 'whatsapp://send?text=' + window.encodeURIComponent(this.ubahWAME(item.teks, item.noHp));
            view.editTbl.onclick = () => {
                this.edit(view.post.id);
            };
            view.delTbl.onclick = () => {
                let jawaban = window.confirm("hapus data?");
                if (jawaban) {
                    App.db.hapus(item.id);
                    this.render();
                }
            };
        });
    }
    edit(id) {
        let post = App.db.getById(id);
        this.id = id;
        this.textArea.value = post.teks;
        this.nohp.value = post.noHp;
        this.mode = App.MODE_EDIT;
        this.list.style.display = 'none';
    }
    ubahWAME(str, nohp) {
        let idx = 0;
        let ulang = true;
        while (ulang) {
            ulang = false;
            idx = str.toLocaleLowerCase().indexOf('[wame]');
            if (idx > -1) {
                str = str.replace('[wame]', 'https://wa.me/' + nohp);
                ulang = true;
            }
        }
        return str;
    }
    renderHtml(str) {
        let hasil = '';
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (10 == code) {
                hasil += '<br\>';
            }
            else {
                hasil += str.charAt(i);
            }
        }
        return hasil;
    }
    get nohp() {
        return this.getEl('input.nohp');
    }
    get textArea() {
        return this.getEl('textarea');
    }
    get simpanTbl() {
        return this.getEl('div.input button.simpan');
    }
    get list() {
        return this.getEl('div.list-cont');
    }
}
