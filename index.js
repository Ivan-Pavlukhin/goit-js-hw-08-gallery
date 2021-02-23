import galleryItems from "./gallery-items.js";

const ref = {
  list: document.querySelector(".js-gallery"),
  modal: document.querySelector(".lightbox"),
  modalImage: document.querySelector(".lightbox__image"),
  closeButton: document.querySelector("[data-action = 'close-lightbox']"),
};

const arrOriginalImgSrc = galleryItems.map((item) => item.original);

const imageMarkup = creatGallery(galleryItems);

ref.list.insertAdjacentHTML("beforeend", imageMarkup);

ref.list.addEventListener("click", onGalleryItemClick);

ref.closeButton.addEventListener("click", onCloseButtonClick);

document.addEventListener("keydown", onArrowRightKeydown);

let imgModalSrc = document.querySelector(".lightbox__image").src;

function onArrowRightKeydown(event) {
  if (event.key === "ArrowRight") {
    ref.modalImage.src = document.querySelector(
      `[data-source = '${imgModalSrc}']`
    ).nextSibling.dataset.source;
  }
}

function onEscKeydown(event) {
  if (event.key === "Escape") {
    ref.modal.classList.remove("is-open");
    document.removeEventListener("keydown", onEscKeydown);
    clearSrcInModalImg();
  }
}

//  ArrowLeft ArrowRight

function onCloseButtonClick() {
  ref.modal.classList.remove("is-open");
  document.removeEventListener("keydown", onEscKeydown);
  clearSrcInModalImg();
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

// function clearSrcInModalImg() {
//   ref.modalImage.src = l;
// }

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
