"use strict";
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
