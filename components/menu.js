import Mutate from "../core/mutate-mixin.js";
import Focus from "../core/focus-mixin.js";
import mixin from '../core/mixin.js';
import Template from "../core/template-mixin.js";

const template = /*html*/ `
  <style>
    :host { display: inline-flex; flex-direction: column; }
    :host([horizontal]) { flex-direction: row; }
    :host(:focus) { outline: none; }
    ::slotted(s-menu-group) {
      display: inline-flex;
      flex-direction: column;
    }

    :host {
      background-color: var(--theme-secondary, #eeeeee);
      border: 2px solid var(--theme-white, white);
      box-shadow: var(--theme-box-shadow, 0px 1px 1px 1px rgba(0, 0, 0, 0.25));
      padding: 0.5em 0;
      border-radius: 0.25em;
    }

    :host(:not([horizontal])) ::slotted(s-menu-group) {
      padding-top: 5px;
      padding-bottom: 5px;
    }

    :host([horizontal]) ::slotted(s-menu-group) {
      flex-direction: row;
      padding-left: 5px;
      padding-right: 5px;
    }
  </style>
  <slot></slot>
`;

const isDisabled = (/** @type HTMLElement */element) => element.hasAttribute('disabled') || !!element.disabled;

const focusOnElement = (/** @type HTMLElement */ element) => {
  if (typeof element.focus === 'function') {
    element.focus();
  }
};

export default class Menu extends mixin(
  Mutate,
  Focus,
  Template.mixin(template)
)(HTMLElement) {

  constructor () {
    super();
    /** @type {HTMLElement[]} */
    this._menuItems = [];
    this.addEventListener('keydown', (event) => {
      const { key, shiftKey } = event;
      if (key === 'ArrowDown' || (key === 'Tab' && !shiftKey)) {
        this._next();

      } else if (key === 'ArrowUp' || (key === 'Tab' && shiftKey)) {
        this._prev();
      }
      event.preventDefault();
    })
  }

  /**
   * @param {number} idx 
   */
  _focusOnIndex(idx) {
    this._menuItems.forEach((element, elementIdx) => {
      if (idx === elementIdx) {
        element.setAttribute('in-focus', '');
        focusOnElement(element);
      } else {
        element.removeAttribute('in-focus');
      }
    })
  }

  _getFocusedByMarkup() {
    return this.querySelector('[in-focus]');
  }

  _next() {
    const curIdx = this._menuItems.indexOf(this._getFocusedByMarkup());
    this._focusOnIndex((curIdx + 1) % this._menuItems.length);
    if (isDisabled(this._getFocusedByMarkup())) {
      this._next();
    }
  }

  _prev() {
    const curIdx = this._menuItems.indexOf(this._getFocusedByMarkup());
    if (curIdx <= 0) {
      this._last();
    } else {
      this._focusOnIndex(curIdx - 1);
    }
    if (isDisabled(this._getFocusedByMarkup())) {
      this._prev();
    }
  }

  _deselect() {
    this._focusOnIndex(-1);
  }

  _last() {
    this._focusOnIndex(this._menuItems.length - 1);
  }

  _first() {
    this._focusOnIndex(0);
  }

  /**
   * @param {HTMLElement} element 
   */
  _setSelection(element) {
    if (!isDisabled(element)) {
      const idx = this._menuItems.indexOf(element);
      this._focusOnIndex(idx);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._menuItems.length === 0) {
      this.onMutated();
    }
  }

  onMutated() {
    this._menuItems = Array.from(this.querySelectorAll('s-menu-item'));
    this._menuItems.forEach((element) => {
      element.addEventListener('mousedown', () => {
        this._setSelection(element);
      })
    });
  }
};

export const define = () => customElements.define('s-menu', Menu);
