'use strict';
/*  ch4.js
 * by ch4/chfour - https://github.com/chfour
 * this thing is in the public domain lmfaoo
 */

/** class representing a single element created by $4 */
class CHElement {
    /**
     * get elements by query string
     * @param {String} selector the selector
     * @param {Document | CHElement} parent the parent object to call `querySelectorAll()` on
     * @returns {CHElement | Array<CHElement>} the element or an array of matches
     */
    static fromSelector(selector, parent) {
        const query = parent.querySelectorAll(selector);
        if (query.length === 1) return new CHElement(query[0]);
        const result = Array.from(query, e => new CHElement(e));
        result.a = result;
    }

    /**
     * create an element class from an element
     * @param {Element | Node | Window} e the element
     */
    constructor(e) {
        if (!(e instanceof Element || e instanceof Node || e instanceof Window))
            throw new TypeError("`" + e + "`: object not an Element, Node or Window")
        this.e = e;
        this._eventListeners = {};
        this.a = [this];
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

    /**
     * querySelector() inside an element
     * @param {String} selector the selector
     * @returns {CHElement | Array<CHElement>} an element or an array of elements
     */
    find(selector) {
        return CHElement.fromSelector(selector, this.e);
    }

    /**
     * the element's `innerText`
     * @returns {String} the text
     */
    get text() { return this.e.innerText; }

    /**
     * the element's `innerText`
     * @param {String} text the text
     */
    set text(text) { this.e.innerText = text; }

    /**
     * the element's `innerHTML`
     * @returns {String} the HTML string
     */
     get html() { return this.e.innerHTML; }

     /**
      * the element's `innerHTML`
      * @param {String} text the HTML string
      */
     set html(text) { this.e.innerHTML = text; }
}

/**
 * main thing
 * @param {Element | Node | String | Function} a an element, node, function or selector string
 * @returns {CHElement | Array<CHElement> | Function} an element, an array of elements or a function
 */
function $4(a) {
    switch (typeof a) {
        case "string":
            return CHElement.fromSelector(a, document);
        
        case "function":
            return $4(window).on("load", a);

        case "object":
            if (a instanceof Element || a instanceof Node || a instanceof Window) return new CHElement(a);
            else throw new TypeError("`" + e + "`: object not an instance of Element, Node or Window");
    }
}
