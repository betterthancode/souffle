import t from '../core/template-mixin.js';
import mixin from '../core/mixin.js';
import Focus from '../core/focus-mixin.js';

const template = /*html*/ `
<style>

:host([disabled]) button {
  pointer-events: none;
  opacity: 0.5;
}

:host button {
  background-color: var(--theme-secondary, #eeeeee);
  color: #454545;
  outline: none;
  border: 2px solid var(--theme-white, white);
  box-shadow: var(--theme-box-shadow, 0px 1px 1px 1px rgba(0, 0, 0, 0.25));
  padding: 0.5em 0.95em;
  border-radius: 2em;
  box-sizing: content-box;
  transition: 0.1s linear border-color;
}

:host button:hover {
  border: 2px solid var(--theme-secondary-highlight, #a9a9a9);
}

:host([warning]) button {
  background-color: var(--theme-warning, #efd507);
}

:host([warning]) button:hover {
  border: 2px solid var(--theme-warning-highlight, #e6a306);
}

:host([success]) button {
  background-color: var(--theme-success, #2ed22e);
}

:host([success]) button:hover {
  border: 2px solid var(--theme-success-highlight, #1cab1c);
}

:host([primary]) button {
  background-color: var(--theme-primary, #454545);
  color: white;
}

:host([primary]) button:hover {
  border: 2px solid var(--theme-primary-highlight, #151515);
}
</style>
<button><slot name="icon"></slot><slot></slot></button>
`;

export default class SButton extends mixin(t.mixin(template), Focus)(HTMLElement) {
}

export const define = () => customElements.define('s-button', SButton);