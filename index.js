import galleryItems from "./gallery-items.js";

const ref = {
  list: document.querySelector(".js-gallery"),
  modal: document.querySelector(".lightbox"),
  modalImage: document.querySelector(".lightbox__image"),
  closeButton: document.querySelector("[data-action = 'close-lightbox']"),
  overlay: document.querySelector(".lightbox__overlay"),
};

const imageMarkup = creatGallery(galleryItems);

ref.list.insertAdjacentHTML("beforeend", imageMarkup);

ref.list.addEventListener("click", onGalleryItemClick);

ref.closeButton.addEventListener("click", onCloseButtonClick);

ref.overlay.addEventListener("click", onOverlayCloseModalClick);

function onOverlayCloseModalClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function onEscKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

function onCloseButtonClick() {
  closeModal();
}

function closeModal() {
  clearSrcInModalImg();
  document.removeEventListener("keydown", onChangeImgKey);
  document.removeEventListener("keydown", onEscKeydown);
  ref.modal.classList.remove("is-open");
}

function onGalleryItemClick(event) {
  event.preventDefault(event);

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  document.addEventListener("keydown", onChangeImgKey);
  document.addEventListener("keydown", onEscKeydown);
  ref.modal.classList.add("is-open");
  ref.modalImage.src = event.target.dataset.source;
  ref.modalImage.alt = event.target.alt;
}
function creatGallery(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

function onChangeImgKey(event) {
  const arrOriginalImgSrc = galleryItems.map((item) => item.original);
  let src = arrOriginalImgSrc.indexOf(ref.modalImage.src);

  if (event.key === "ArrowLeft") {
    if (src === 0) {
      src = arrOriginalImgSrc.length - 1;
    }
    ref.modalImage.src = arrOriginalImgSrc[src - 1];
  }
  if (event.key === "ArrowRight") {
    if (src === arrOriginalImgSrc.length - 1) {
      src = 0;
    }
    ref.modalImage.src = arrOriginalImgSrc[src + 1];
  }
}

function clearSrcInModalImg() {
  ref.modalImage.src = "";
  ref.modalImage.alt = "";
}
