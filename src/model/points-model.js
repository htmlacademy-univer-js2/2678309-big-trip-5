export default class PointsModel {
  #points = [];

  constructor(points) {
    this.#points = points;
  }

  getPoints() {
    return this.#points;
  }
}
