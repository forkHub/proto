"use strict";
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
