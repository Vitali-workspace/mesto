import { popupCardImg, showPopup } from "./script.js";

class Card {
  constructor(newCard, selectorTemplateCard) {
    this._nameCard = newCard.name;
    this._linkCard = newCard.link;
    this._selectorTemplateCard = selectorTemplateCard;
    this._templateCardContent = this._selectorTemplateCard
      .querySelector('.gallery__card')
      .cloneNode(true);
    this.createTemplateCard();
  }

  createTemplateCard() {
    this._templateCardContent.querySelector('.gallery__card-name').textContent = `${this._nameCard}`;
    this._templateCardContent.querySelector('.gallery__card-img').src = `${this._linkCard}`;
    this._templateCardContent.querySelector('.gallery__card-img').alt = `${this._nameCard}`;
    this._setEventListeners();
    return this._templateCardContent;
  }

  _btnFavorites() {
    this.classList.toggle('gallery__btn-favorites_active');
  }

  _btnTrash() {
    this.closest('.gallery__card').remove();
  }

  _openImagePopup() {
    document.querySelector('.popup__image').src = `${this._linkCard}`;
    document.querySelector('.popup__image').alt = `${this._nameCard}`;
    document.querySelector('.popup__image-name').textContent = `${this._nameCard}`;
    showPopup(popupCardImg);
  }

  _setEventListeners() {
    this._templateCardContent.querySelector('.gallery__btn-favorites').addEventListener('click', this._btnFavorites);
    this._templateCardContent.querySelector('.gallery__btn-trash').addEventListener('click', this._btnTrash);
    this._templateCardContent.querySelector('.gallery__card-img').addEventListener('click', this._openImagePopup);
    this._templateCardContent.querySelector('.gallery__card-img').addEventListener('click', () => {
      this._openImagePopup(this._linkCard, this._nameCard);
    });
  }
}
export { Card };
