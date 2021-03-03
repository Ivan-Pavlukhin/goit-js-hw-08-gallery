import galleryItems from './gallery-items.js';
import ref from './ref.js';
import creatGallery from './creatGallery.js';

const imageMarkup = creatGallery(galleryItems);

ref.list.insertAdjacentHTML('beforeend', imageMarkup);

ref.list.addEventListener('click', onGalleryItemClick);

ref.closeButton.addEventListener('click', onCloseButtonClick);

ref.overlay.addEventListener('click', onOverlayCloseModalClick);

function onOverlayCloseModalClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function onEscKeydown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function onCloseButtonClick() {
  closeModal();
}

function closeModal() {
  clearSrcInModalImg();
  document.removeEventListener('keydown', onChangeImgKey);
  document.removeEventListener('keydown', onEscKeydown);
  ref.modal.classList.remove('is-open');
}

function onGalleryItemClick(event) {
  event.preventDefault(event);

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  document.addEventListener('keydown', onChangeImgKey);
  document.addEventListener('keydown', onEscKeydown);
  ref.modal.classList.add('is-open');
  ref.modalImage.src = event.target.dataset.source;
  ref.modalImage.alt = event.target.alt;
}

const arrOriginalImgSrc = galleryItems.map(item => item.original);
const arrOriginalImgAlt = galleryItems.map(item => item.description);

function onChangeImgKey(event) {
  let indexImg = arrOriginalImgSrc.indexOf(ref.modalImage.src);

  if (event.key === 'ArrowLeft') {
    if (indexImg === 0) {
      indexImg = arrOriginalImgSrc.length;
    }
    ref.modalImage.src = arrOriginalImgSrc[indexImg - 1];
    ref.modalImage.alt = arrOriginalImgAlt[indexImg - 1];
  }
  if (event.key === 'ArrowRight') {
    if (indexImg === arrOriginalImgSrc.length - 1) {
      indexImg = -1;
    }
    ref.modalImage.src = arrOriginalImgSrc[indexImg + 1];
    ref.modalImage.alt = arrOriginalImgAlt[indexImg + 1];
  }
}

function clearSrcInModalImg() {
  ref.modalImage.src = '';
  ref.modalImage.alt = '';
}
