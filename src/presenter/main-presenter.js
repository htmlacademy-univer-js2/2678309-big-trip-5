import {RenderPosition, render} from '../render';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import EditEventFormView from '../view/edit-event-form-view';
import EventItemView from '../view/event-item-view';
import EventsListView from '../view/event-list-view';
import NewEventFormView from '../view/new-event-form-view';

export default class MainPresenter {
  constructor() {
    this.tripEvents = document.querySelector('.trip-events');
    this.filterEvents = document.querySelector('.trip-controls__filters');
    this.eventsList = new EventsListView();
  }

  init() {
    render(new FilterView(), this.filterEvents);
    render(new SortView(), this.tripEvents);
    render(this.eventsList, this.tripEvents);
    render(new NewEventFormView(), this.eventsList.getElement());
    render(new EditEventFormView(), this.eventsList.getElement(), RenderPosition.AFTERBEGIN);
    for(let i = 0; i < 3; i++) {
      render(new EventItemView(), this.eventsList.getElement());
    }
  }
}
