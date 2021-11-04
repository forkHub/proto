import { loading } from "./Loading.js";
import { dialog } from "./Dialog.js";
export class Util {
    static getEl(query, parent = null, err = true) {
        let el;
        if (!parent)
            parent = document.body;
        el = parent.querySelector(query);
        if (el) {
            console.log(el);
            return el;
        }
        else {
            console.log(parent);
            console.log(query);
            if (err) {
                throw new Error('query not found ');
            }
            else {
                return null;
            }
        }
    }
    // static simpanDanBuatDefaultFilter(): void {
    // 	let filterStr: string = '';
    // 	let filter: IFilter = {
    // 		petugas: parseInt(window.localStorage.getItem(Util.sUserId))
    // 	}
    // 	filterStr = JSON.stringify(filter);
    // 	window.localStorage.setItem(Util.storageId, filterStr);
    // }
    // static getFilter(): IFilter {
    // 	let storageStr: string = window.localStorage.getItem(Util.storageId);
    // 	let storageObj: ISessionData;
    // 	let filter: IFilter = null;
    // 	if (storageStr && storageStr != '') {
    // 		storageObj = JSON.parse(storageStr);
    // 		if (storageObj.filter) {
    // 			filter = storageObj.filter;
    // 		}
    // 		else {
    // 		}
    // 	} else {
    // 	}
    // 	return filter;
    // }
    //default error
    static error(e) {
        console.error(e);
        dialog.tampil(e.message);
    }
    //shared
    static kirimWa(teks) {
        return "whatsapp://send?text=" + teks;
    }
    static async AjaxLogin(type, urlServer, dataStr, loginUrl, pf = null) {
        let xml;
        xml = await this.Ajax(type, urlServer, dataStr, pf);
        if (401 == xml.status) {
            window.top.location.href = loginUrl;
            return null;
        }
        else {
            return xml;
        }
    }
    static async Ajax(type, url, dataStr, pf = null) {
        return new Promise((resolve, reject) => {
            try {
                console.group('send data');
                // console.log(dataStr);
                console.log("type " + type);
                loading.attach(document.body);
                let xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    loading.detach();
                    resolve(xhr);
                };
                xhr.onerror = (e) => {
                    console.log('xhr error');
                    console.log(e);
                    loading.detach();
                    reject(new Error(e.message));
                };
                xhr.onprogress = (p) => {
                    if (pf) {
                        pf(p);
                    }
                };
                xhr.open(type, url + "", true);
                xhr.setRequestHeader('Content-type', 'application/json');
                // xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sUserId));
                // xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sUserId));
                xhr.send(dataStr);
                // console.log("type " + type);
                // console.log("url " + url);
                console.groupEnd();
            }
            catch (e) {
                console.log('Util error');
                console.log(e);
                loading.detach();
                reject(new Error(e.message));
            }
        });
    }
}
Util.sUserId = 'user_id';
Util.sLevel = 'level';
Util.sFilter = 'filter';
Util.storageId = 'xyz.hagarden.tugas';
