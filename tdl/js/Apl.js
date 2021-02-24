"use strict";
tdl.db.load();
tdl.item.daftar.forEach((item) => {
    tdl.item.updateTampilan(item);
});
tdl.renderList();
