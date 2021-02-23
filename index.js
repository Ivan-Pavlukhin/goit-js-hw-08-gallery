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
  document.removeEventListener("keydown", onEscKeydown);
  ref.modal.classList.remove("is-open");
}

function onGalleryItemClick(event) {
  event.preventDefault(event);

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  document.addEventListener("keydown", onEscKeydown);
  ref.modal.classList.add("is-open");
  ref.modalImage.src = event.target.dataset.source;
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
function clearSrcInModalImg() {
  ref.modalImage.src = "";
}

// ниже нужно реализовать смену картиник при нажатие клавишь влево вправо.

// let imgModalSrc = ref.modalImage.src;

// const arrOriginalImgSrc = galleryItems.map((item) => item.original);

// document.addEventListener("keydown", onArrowRightKeydown);

// function onArrowRightKeydown(event) {
//   if (event.key === "ArrowRight") {
//     ref.modalImage.src = document.querySelector(
//       `[data-source = '${imgModalSrc}']`
//     ).nextSibling.dataset.source;
//   }
// }

//  ArrowLeft ArrowRight
