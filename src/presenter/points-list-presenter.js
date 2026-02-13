import { render } from '../framework/render';
import SortView from '../view/sort-view';
import EventsListView from '../view/event-list-view';
import PointPresenter from './point-presenter';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sort';

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export default class PointsListPresenter {
  #container = null;
  #pointsModel = null;

  #eventsList = new EventsListView();
  #pointPresenters = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DAY;

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#sortComponent = new SortView(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#container);
    render(this.#eventsList, this.#container);

    this.#renderPoints();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };

  #getSortedPoints() {
    const points = [...this.#pointsModel.getPoints()];

    switch (this.#currentSortType) {
      case SortType.TIME:
        return points.sort(sortByTime);
      case SortType.PRICE:
        return points.sort(sortByPrice);
      default:
        return points.sort(sortByDay);
    }
  }

  #renderPoints() {
    const points = this.#getSortedPoints();

    const handlePointChange = (updatedPoint, options = {}) => {
      const newData = this.#pointsModel.updatePoint(updatedPoint);
      if (options.reorder) {
        this.#clearPoints();
        this.#renderPoints();
      } else {
        const presenter = this.#pointPresenters.get(newData.id);
        if (presenter) {
          presenter.updatePoint(newData);
        }
      }
    };

    const handleModeChange = () => {
      this.#pointPresenters.forEach((presenter) => presenter.resetView());
    };

    const handleDelete = (pointId) => {
      this.#pointsModel.deletePoint(pointId);
      this.#clearPoints();
      this.#renderPoints();
    };

    points.forEach((point) => {
      const pointPresenter = new PointPresenter(
        this.#eventsList.element,
        handlePointChange,
        handleModeChange,
        handleDelete
      );

      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #clearPoints() {
    this.#pointPresenters.clear();
    this.#eventsList.element.innerHTML = '';
  }
}
