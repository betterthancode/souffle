export default function Template(template, Base = HTMLElement, withShadow = true) {
  return class extends Base {
    connectedCallback() {
      if (typeof super.connectedCallback === 'function') {
        super.connectedCallback();
      }
    }
    constructor () {
      super();
      if (withShadow) {
        this.attachShadow({ mode: 'open' }).innerHTML = template;
      } else {
        requestAnimationFrame(() => {
          this.innerHTML = template;
        });
      }
    }
  }
}

Template.mixin = (tpl, Base = HTMLElement, withShadow = true) => (Base) => Template(tpl, Base, withShadow);