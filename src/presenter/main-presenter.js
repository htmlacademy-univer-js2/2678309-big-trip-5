import { render } from '../framework/render';
import FilterView from '../view/filter-view';
import PointsModel from '../model/points-model';
import TripListPresenter from './points-list-presenter';

export default class MainPresenter {
  #tripEvents = document.querySelector('.trip-events');
  #filterEvents = document.querySelector('.trip-controls__filters');
  #pointsModel = new PointsModel();
  #tripListPresenter = null;

  init() {
    render(new FilterView(), this.#filterEvents);

    this.#tripListPresenter = new TripListPresenter(
      this.#tripEvents,
      this.#pointsModel
    );

    this.#tripListPresenter.init();
  }
}
