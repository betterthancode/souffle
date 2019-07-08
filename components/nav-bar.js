import mixin from "../core/mixin.js";
import Template from "../core/template-mixin.js";

const template = /*html*/ `
<style>
  :host {
    display: inline-flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding: 0 1em;
    background-color: var(--theme-primary, #454545);
    box-shadow: var(--theme-box-shadow, 0px 1px 1px 1px rgba(0, 0, 0, 0.25));
  }

  ::slotted(*) {
    color: var(--theme-light, white);
    padding-top: 1em;
    padding-bottom: 1em;
  }

  ::slotted(:hover) {
    background-color: var(--theme-success, #2ed22e);
  }
</style>
<slot></slot>
`;

export default class Navbar extends mixin(
  Template.mixin(template)
)(HTMLElement) {

}

export const define = () => customElements.define('s-navbar', Navbar);