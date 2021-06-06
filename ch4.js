'use strict';
/*  ch4.js
 * by ch4/chfour - https://github.com/chfour
 * this thing is in the public domain lmfaoo
 */

/** class representing a single element created by $4 */
class CHElement {
    /**
     * create an element class from an element
     * @param {Element | Node} e the element
     */
    constructor(e) {
        this.e = e;
        this._eventListeners = {};
    }

    /**
     * add an event listener
     * @param {String} event the event name
     * @param {Function} handler event handler
     * @returns {Function} unsubscribe function
     */
    on(event, handler) {
        this.e.addEventListener(event, handler);
        if (!(event in this._eventListeners)) this._eventListeners[event] = [];
        this._eventListeners[event].push(handler);
        return () => {
            this.e.removeEventListener(event, handler);
            this._eventListeners[event].pop(handler);
        }
    }

    /**
     * remove all event listeners
     * @param {String} event the event name
     */
    off(event) {
        const handlers = this._eventListeners[event];
        if (handlers.length === 0) throw new TypeError("no event handlers are registered");
        handlers.forEach(h => this.e.removeEventListener(event, h));
        this._eventListeners[event] = [];
    }

    /**
     * get the original element this class was instantiated from
     * @returns {Element | Node} the element
     */
    getElement() {
        return this.e;
    }
}
