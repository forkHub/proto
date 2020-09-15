"use strict";
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        tinymce.init({ selector: 'textarea.tiny1' });
        this.tab0btn = document.body.querySelector('div.tab-holder button.tab0');
        this.tab1btn = document.body.querySelector('div.tab-holder button.tab1');
        this.startTbl = document.body.querySelector('button.start');
        this.tab0 = document.body.querySelector('div.tab0');
        this.tab1 = document.body.querySelector('div.tab1');
        this.tab0btn.onclick = function () {
            _this.tab1.style.display = 'none';
            _this.tab0.style.display = 'block';
            _this.tab0.focus();
            _this.tab0btn.classList.add('active');
            _this.tab1btn.classList.remove('active');
        };
        this.tab1btn.onclick = function () {
            _this.tab0.style.display = 'none';
            _this.tab1.style.display = 'block';
            _this.tab1.focus();
            _this.tab0btn.classList.remove('active');
            _this.tab1btn.classList.add('active');
        };
        this.startTbl.onclick = function () {
            setTimeout(function () {
                _this.tab1.style.display = 'none';
                _this.tab0.style.display = 'block';
                _this.tab0.focus();
                _this.tab0btn.classList.add('active');
                _this.tab1btn.classList.remove('active');
            }, 3000);
        };
        console.log(this.tab0 + '/' + this.tab1 + '/' + this.startTbl);
    }
    return App;
}());
window.onload = function () {
    console.log('window onload');
    new App();
};
