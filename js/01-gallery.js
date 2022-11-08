import { galleryItems } from "./gallery-items.js";
// Change code below this line
const refs = {
  galleryContainer: document.querySelector(".gallery"),
  body: document.body,
};

const galleryMarkup = createImgGalleryMarkup(galleryItems);
function createImgGalleryMarkup(item) {
  return item
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
     <img loading="lazy" width="354" height="240"
       class="gallery__image"
       src="${preview}"
       data-source="${original}"
      alt="${description}"
     />
   </a>
 </div>`;
    })
    .join("");
}
refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createLightbox(imageAdress) {
  window.instance = basicLightbox.create(
    `
    <img src="${imageAdress}">
`,
    {
      onShow: () => window.addEventListener("keydown", closeModalWindow),
      onClose: () => {
        window.removeEventListener("keydown", closeModalWindow);
        refs.body.classList.remove("disable-scroll");
      },
    }
  );
  return instance;
}

refs.galleryContainer.addEventListener("click", onClickImgOpenModal);

function onClickImgOpenModal(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const originalImageRef = event.target.dataset.source;
  createLightbox(originalImageRef).show();
  refs.body.classList.add("disable-scroll");
}

function closeModalWindow(event) {
  const ESC_KEY_CODE = "Escape";
  if (event.code === ESC_KEY_CODE && instance.visible()) {
    instance.close();
    refs.body.classList.remove("disable-scroll");
  }
}

const lazyImages = refs.galleryContainer.querySelectorAll(".gallery__image");

lazyImages.forEach((image) =>
  image.addEventListener("load", onImageLoaded, { once: true })
);

function onImageLoaded(event) {
  event.target.classList.add("appear");
}
lazyImages.forEach((image) =>
  image.addEventListener("mouseenter", onMouseEnter)
);

function onMouseEnter(event) {
  event.target.style.transitionDelay = "100ms";
  event.target.style.transitionDuration = "500ms";
}
