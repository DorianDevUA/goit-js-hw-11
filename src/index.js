import {
  fetchImage,
  createPhotoCard,
  renderGallery,
  appendGallery,
} from './js/pixabay-api';
import Notiflix from 'notiflix';

let currentPage = 1;
let currentQuery = null;

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSubmitSearchQuery);
loadMore.addEventListener('click', onLoadMore);

async function onSubmitSearchQuery(evt) {
  evt.preventDefault();
  currentQuery = evt.target.elements.searchQuery.value;

  try {
    const { hits, totalHits } = await fetchImage(currentQuery);
    console.log(hits, totalHits);

    if (hits.length === 0) {
      // gallery.innerHTML = '<p>Sorry, there are no images matching your search query. Please try again.</p>';
      Notiflix.Report.warning(
        'Bad Request',
        'Sorry, there are no images matching your search query. Please try again.',
        'Okey'
      );
    } else {
      const markup = createPhotoCard(hits);
      renderGallery(gallery, markup);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

      if (totalHits > currentPage * 40) {
        loadMore.hidden = false;
      } else {
        loadMore.hidden = true;
      }
      // gallery.innerHTML = markup;
    }
  } catch (error) {
    console.log('Error fetching images:', error);
  }
}

async function onLoadMore() {
  currentPage += 1;
  const { hits, totalHits } = await fetchImage(currentQuery, currentPage);
  const markup = createPhotoCard(hits);
  appendGallery(gallery, markup);

  if (totalHits > currentPage * 40) {
    loadMore.hidden = false;
  } else {
    loadMore.hidden = true;
  }
}
