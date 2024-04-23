import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = BASE_URL;

async function fetchGallery(request) {
  const searchParams = new URLSearchParams({
    key: '43520057-d4110ce2722b475a1deefaa82',
    q: `${request}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  });
  const response = await axios(`?${searchParams}`);
  return response.data
}

function createGalleryMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class="gallery__link" href="${largeImageURL}">
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </p>
        </div>
      </div>
    </a>`
    )
    .join('');
}

function renderGallery(selector, markup) {
  selector.innerHTML = markup;
}

export { fetchGallery, createGalleryMarkup, renderGallery };
