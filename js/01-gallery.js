import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(`.gallery`);
gallery.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
       data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}

gallery.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();

  const targetImage = event.target.classList.contains("gallery__image");
  if (!targetImage) return;

  const source = event.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src="${source}" width="1280">
    `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyDown);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyDown);
      },
    }
  );

  function onEscKeyDown(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }

  instance.show();
}
