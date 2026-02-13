import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { formatDateForEditForm, parseDateFromEditForm } from '../utils/date';
import { destinations } from '../mock/destinations';
import { offers as offersByType } from '../mock/offers';

function getOffersWithAccepted(type, selectedOfferIds = []) {
  const list = offersByType[type] || [];
  return list.map((offer) => ({ ...offer, accepted: selectedOfferIds.includes(offer.id) }));
}

function getDestinationKeyByName(name) {
  const entry = Object.entries(destinations).find(([, d]) => d.name === name);
  return entry ? entry[0] : null;
}

function createEditEventFormTemplate(point, destination, offers) {
  const dateFrom = formatDateForEditForm(point.dateFrom);
  const dateTo = formatDateForEditForm(point.dateTo);
  const hasOffers = offers.length > 0;
  const hasDestinationInfo = !!(destination?.description || (destination?.pictures && destination.pictures.length));

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${point.type === 'taxi' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${point.type === 'bus' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${point.type === 'train' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${point.type === 'ship' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${point.type === 'drive' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${point.type === 'flight' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${point.type === 'check-in' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${point.type === 'sightseeing' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${point.type === 'restaurant' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${point.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination?.name ?? ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${Object.values(destinations).map((d) => `<option value="${d.name}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
                    &mdash;
                     <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="button">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${hasOffers ? `
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${offers.map((offer, index) => `
                        <div class="event__offer-selector">
                          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${index}" data-offer-id="${offer.id}" ${offer.accepted ? 'checked' : ''}>
                          <label class="event__offer-label" for="event-offer-${index}">
                            <span class="event__offer-title">${offer.title}</span>
                            &plus;&euro;&nbsp;
                            <span class="event__offer-price">${offer.price}</span>
                          </label>
                        </div>
                    `).join('')}
                    </div>
                  </section>
                  ` : ''}
                  ${hasDestinationInfo ? `
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    ${destination?.description ? `<p class="event__destination-description">${destination.description}</p>` : ''}
                    ${destination?.pictures?.length ? `<div class="event__photos-container"><div class="event__photos-tape">${destination.pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description ?? ''}">`).join('')}</div></div>` : ''}
                  </section>
                  ` : ''}
                </section>
              </form>
            </li>`;
}

export default class EditEventFormView extends AbstractStatefulView {
  #handleFormSubmit;
  #handleCloseClick;
  #handleDeleteClick;

  constructor({ point, destination, onFormSubmit, onCloseClick, onDeleteClick }) {
    super();
    const dest = destination ?? Object.values(destinations)[0];
    const offersEnriched = getOffersWithAccepted(point.type, point.offers);
    this._state = { point: { ...point }, destination: dest, offers: offersEnriched };
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
    this._restoreHandlers();
  }

  get template() {
    const { point, destination, offers } = this._state;
    return createEditEventFormTemplate(point, destination, offers);
  }

  #typeChangeHandler = (evt) => {
    const newType = evt.target.value;
    const { point } = this._state;
    this.updateElement({
      point: { ...point, type: newType },
      offers: getOffersWithAccepted(newType, point.offers)
    });
  };

  #destinationChangeHandler = (evt) => {
    const destinationName = evt.target.value.trim();
    const key = getDestinationKeyByName(destinationName);
    if (!key) {
      return;
    }
    const destination = destinations[key];
    const { point } = this._state;
    this.updateElement({
      destination,
      point: { ...point, destination: key }
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const form = this.element.querySelector('form');
    const point = this._state.point;
    const dateFromStr = form.querySelector('[name="event-start-time"]').value;
    const dateToStr = form.querySelector('[name="event-end-time"]').value;
    const basePrice = Number(form.querySelector('[name="event-price"]').value) || 0;
    const typeRadio = form.querySelector('[name="event-type"]:checked');
    const type = typeRadio ? typeRadio.value : point.type;
    const destinationName = form.querySelector('[name="event-destination"]').value.trim();
    const destinationKey = getDestinationKeyByName(destinationName) ?? point.destination;
    const offerCheckboxes = form.querySelectorAll('.event__offer-checkbox:checked');
    const offers = Array.from(offerCheckboxes).map((cb) => cb.dataset.offerId).filter(Boolean);
    const updatedPoint = {
      ...point,
      type,
      destination: destinationKey,
      dateFrom: parseDateFromEditForm(dateFromStr),
      dateTo: parseDateFromEditForm(dateToStr),
      basePrice,
      offers
    };
    this.#handleFormSubmit(updatedPoint);
  };

  _restoreHandlers() {
    const form = this.element.querySelector('form');
    form.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#handleCloseClick);
    this.element.querySelector('.event__reset-btn')?.addEventListener('click', this.#handleDeleteClick);
    this.element.querySelector('.event__type-group')?.addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')?.addEventListener('change', this.#destinationChangeHandler);
  }
}
