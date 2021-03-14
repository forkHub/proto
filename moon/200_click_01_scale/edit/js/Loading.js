"use strict";
jln.loading = {
    el: document.body.querySelector('div.loading'),
};
// console.log(jln.loading.el);
jln.loading.tampil = () => {
    jln.loading.el.style.display = 'flex';
};
jln.loading.tutup = () => {
    jln.loading.el.style.display = 'none';
};
