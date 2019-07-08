/**
 * @param {typeof HTMLElement} Base 
 */
export default function Focus(Base = HTMLElement) {

  let inFocus = false;

  function onFocusIn() {
    /** @type HTMLElement */
    const self = (/** @type HTMLElement */ this);
    inFocus = true;
    const child =
      self.firstElementChild ||
      (self.shadowRoot && self.shadowRoot.firstElementChild);
    if (child && typeof child.focus === 'function') {
      child.focus();
    }
  }

  function onFocusOut() {
    inFocus = false;
  }

  return class extends Base {
    constructor () {
      super();
      this.addEventListener('focusin', onFocusIn.bind(this));
      this.addEventListener('focusout', onFocusOut.bind(this));
    }

    connectedCallback() {
      if (typeof super.connectedCallback === 'function') {
        super.connectedCallback();
      }
      if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', '-1');
      }
    }

    focus() {
      super.focus();
      onFocusIn.call(this);
    }

    get isInFocus() {
      return inFocus;
    }
  }
};