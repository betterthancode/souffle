const defaultMutationObserverOptions = {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: false
};

/**
 * @param {typeof HTMLElement} Base
 * @param {MutationObserverInit} options
 */
export default function Mutate (Base = HTMLElement) {

  let mutationObserver;
  let options = defaultMutationObserverOptions;

  return class MutationsAwareElement extends Base {

    constructor () {
      super();
      mutationObserver = new MutationObserver(this.onMutated.bind(this));
      mutationObserver.observe(this, options);
    }

    /**
     * @abstract
     * @public
     */
    onMutated() {
      void 0;
    }

    disconnectedCallback() {
      if (typeof super.disconnectedCallback === 'function') {
        super.disconnectedCallback();
      }
      mutationObserver.disconnect();
    }

    /**
     * @ignore
     */
    connectedCallback() {
      if (typeof super.connectedCallback === 'function') {
        super.connectedCallback();
      }
      mutationObserver.observe(this, options);
    }
  }
};
