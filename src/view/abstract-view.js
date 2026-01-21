import { createElement } from '../render';

export default class AbstractView {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    throw new Error('Abstract method not implemented');
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
