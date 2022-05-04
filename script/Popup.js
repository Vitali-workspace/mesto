class Popup {
  constructor(selectorPopup) {
    this._searchOpenedPopup = selectorPopup;
    console.log(this._searchOpenedPopup);
    this._buttonPopupClose = this._searchOpenedPopup.querySelector('.popup__btn-close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._searchOpenedPopup.classList.toggle('popup_opened');
    this._searchOpenedPopup.classList.toggle('popup_close');
    document.addEventListener('keydown', this._handleEscClose);
    this._searchOpenedPopup.addEventListener('mousedown', this._closePopupOnOverlay);
  }

  close() {
    this._searchOpenedPopup.classList.toggle('popup_opened');
    this._searchOpenedPopup.classList.toggle('popup_close'); // анимация попапа
    document.removeEventListener('keydown', this._handleEscClose);
    this._searchOpenedPopup.removeEventListener('mousedown', this._closePopupOnOverlay);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      console.log(evt.key);
      this.close();
    }
  }

  _closePopupOnOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      console.log(evt.target);
      this.close(evt.target);
      // evt.target === evt.currentTarget
    }
  }

  setEventListeners() {
    this._buttonPopupClose.addEventListener('click', () => this.close());
  }

}

export { Popup };
