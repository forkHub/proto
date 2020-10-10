"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Util {
    static Ajax(type, url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    console.group('send data');
                    console.log(data);
                    console.groupEnd();
                    let xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        if (200 == xhr.status) {
                            resolve(xhr.responseText);
                        }
                        else {
                            Util._resp.code = xhr.status;
                            Util._resp.message = xhr.statusText;
                            reject(new Error('(' + xhr.status + ') ' + xhr.statusText));
                        }
                    };
                    xhr.onerror = () => {
                        Util._resp.code = 0;
                        Util._resp.message = 'Error';
                        reject(new Error('Error'));
                    };
                    xhr.open(type, url, true);
                    xhr.setRequestHeader('Content-type', 'application/json');
                    xhr.send(data);
                }
                catch (e) {
                    console.log('Util error');
                    console.log(e);
                    Util._resp.code = 0;
                    Util._resp.message = 'Error';
                    reject(new Error('Error'));
                }
            });
        });
    }
    static get resp() {
        return Util._resp;
    }
}
Util.urlToko = '/toko';
Util._resp = {
    code: 0,
    message: ''
};
