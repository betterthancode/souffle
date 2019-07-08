const template = /*html*/ `<style>:host{display:inline-flex;flex-direction:column;}</style><slot></slot>`;

export default class HBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = template;
  }
}

export const define = () => customElements.define('s-vbox', HBox);
