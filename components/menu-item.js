import Focus from '../core/focus-mixin.js';
import mixin from '../core/mixin.js';
import Template from '../core/template-mixin.js';

const template = /*html*/ `
<style>
  :host([disabled]) {
    opacity: var(--disabled-opacity, 0.6);
    pointer-events: none;
  }
  :host {
    padding: 0.2em 0.75em;
    cursor: default;
    outline: none;
  }
  :host([in-focus]), :host(:hover) {
    background-color: var(--theme-secondary-highlight, #a9a9a9);
  }
</style>
<slot></slot>
`;

export default class MenuItem extends mixin(
  Focus,
  Template.mixin(template)
)(HTMLElement) {
  constructor() {
    super();
    this.addEventListener('keydown', e => {
      const { key } = e;
      if (key === 'Enter' || key === ' ') {
        this.dispatchEvent(new Event('selected'));
      }
    });
  }
}

export const define = () => customElements.define('s-menu-item', MenuItem);
