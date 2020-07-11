"use strict";
class Db {
    constructor() {
        this.nama = "share_data";
    }
    update(post) {
        let postAr = this.get();
        postAr.forEach((item) => {
            if (item.id == post.id) {
                item.noHp = post.noHp;
                item.teks = post.teks;
            }
        });
        this.simpan(postAr);
    }
    get() {
        let str = window.localStorage.getItem(this.nama);
        let strAr = JSON.parse(str);
        let hasil = [];
        // console.group('get');
        // console.log(str);
        // console.log(strAr)
        // console.groupEnd();
        if (!strAr) {
            // console.log('array kosong')
            // console.groupEnd();
            return [];
        }
        strAr.forEach((item) => {
            hasil.push(this.fromObj(JSON.parse(item)));
        });
        return hasil;
    }
    getById(id) {
        let postObjAr;
        postObjAr = this.get();
        for (let i = 0; i < postObjAr.length; i++) {
            if (postObjAr[i].id == id)
                return postObjAr[i];
        }
        return null;
    }
    insert(post) {
        let posts = this.get();
        let date = new Date();
        post.id = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()) + '';
        posts.push(post);
        this.simpan(posts);
    }
    toStr(posts) {
        let strAr = [];
        posts.forEach((item) => {
            let iPost = this.toObj(item);
            let str = JSON.stringify(iPost);
            strAr.push(str);
        });
        // console.group('to string');
        // console.log('strAr:');
        // console.log(strAr);
        // console.log("_");
        // console.groupEnd();
        return JSON.stringify(strAr);
    }
    simpan(posts) {
        window.localStorage.setItem(this.nama, this.toStr(posts));
        // this.test();
    }
    test() {
        let data1 = JSON.stringify(this.simpan(this.get()));
        let data2 = JSON.stringify(this.simpan(this.get()));
        if (data1 != data2) {
            console.log(data1);
            console.log(data2);
            new Error('');
        }
    }
    toObj(post) {
        return {
            noHp: post.noHp,
            teks: post.teks,
            id: post.id
        };
    }
    fromObj(obj) {
        let post = new PostObj();
        post.noHp = obj.noHp;
        post.teks = obj.teks;
        post.id = obj.id;
        return post;
    }
}
