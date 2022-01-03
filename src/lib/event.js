import { createEventDispatcher } from 'svelte';

export default class EventManager {

    constructor(events) {
        this._events = new Set(events);
        this._dispatch = createEventDispatcher();
        this._eventMap = {}

        this._events.forEach(eventName => {
            this._eventMap[eventName] = (event) => this._dispatch(eventName,event);
        });
    }

    subscribe(eventedClass) {
        eventedClass.on(this._eventMap)
    }

    unsubscribe (eventedClass) {
        eventedClass.off(this._eventMap)
    }
}