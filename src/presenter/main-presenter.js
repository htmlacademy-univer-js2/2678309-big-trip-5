import {RenderPosition, render} from '../render';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import EventsListView from '../view/event-list-view';
import EventItemView from '../view/event-item-view';
import EditEventFormView from '../view/edit-event-form-view';
import PointsModel from '../model/points-model';
import { points } from '../mock/points';
import { destinations } from '../mock/destinations';
import { offers } from '../mock/offers';

export default class MainPresenter {
  constructor() {
    this.tripEvents = document.querySelector('.trip-events');
    this.filterEvents = document.querySelector('.trip-controls__filters');
    this.eventsList = new EventsListView();
    this.pointsModel = new PointsModel(points);
  }

  init() {
    render(new FilterView(), this.filterEvents);
    render(new SortView(), this.tripEvents);
    render(this.eventsList, this.tripEvents);

    this.pointsModel.getPoints().forEach((point) => {
      render(
        new EventItemView({
          point,
          destination: destinations[point.destinationId],
          offers: offers[point.type] ?? []
        }),
        this.eventsList.getElement()
      );
    });

    render(
      new EditEventFormView({
        point: null,
        destinations,
        offers
      }),
      this.eventsList.getElement(),
      RenderPosition.AFTERBEGIN
    );
  }
}
