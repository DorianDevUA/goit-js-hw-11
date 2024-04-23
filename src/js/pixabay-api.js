import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = BASE_URL;

async function fetchImage(query, page = 1) {
  const searchParams = new URLSearchParams({
    key: '43520057-d4110ce2722b475a1deefaa82',
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: `${page}`,
    per_page: 40,
  });

  const response = await axios(`?${searchParams}`);
  return response.data;
}

function createPhotoCard(arr) {
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
      }) => `<div class="photo-card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
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
      </div>`
    )
    .join('');
}

function renderGallery(selector, markup) {
  selector.innerHTML = markup;
}

function appendGallery(selector, markup) {
  selector.insertAdjacentHTML('beforeend', markup);
}

export { fetchImage, createPhotoCard, renderGallery, appendGallery };
