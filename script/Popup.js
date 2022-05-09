class Popup {
  constructor(selectorPopup) {
    this._searchOpenedPopup = selectorPopup;
    this._buttonPopupClose = this._searchOpenedPopup.querySelector('.popup__btn-close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._searchOpenedPopup.classList.toggle('popup_opened');
    this._searchOpenedPopup.classList.toggle('popup_close'); // анимация попапа
    document.addEventListener('keydown', this._handleEscClose);
    this._searchOpenedPopup.addEventListener('mousedown', (evt) => this._closePopupOnOverlay(evt));
  }

  close() {
    this._searchOpenedPopup.classList.toggle('popup_opened');
    this._searchOpenedPopup.classList.toggle('popup_close');
    document.removeEventListener('keydown', this._handleEscClose);
    this._searchOpenedPopup.removeEventListener('mousedown', (evt) => this._closePopupOnOverlay(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonPopupClose.addEventListener('click', () => this.close());
  }
}

export { Popup };
