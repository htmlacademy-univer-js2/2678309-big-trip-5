import AbstractView from './abstract-view';

function createEventListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventListView extends AbstractView {
  getTemplate() {
    return createEventListTemplate();
  }
}
