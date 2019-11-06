"use strict";
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
