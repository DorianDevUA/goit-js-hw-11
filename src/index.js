import {
  fetchGallery,
  createGalleryMarkup,
  renderGallery,
} from './js/pixabay-api';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
// const loadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSubmitSearchQuery);
// loadMore.addEventListener('click', onLoadMore)

async function onSubmitSearchQuery(evt) {
  try {
    evt.preventDefault();

    const searchQuery = evt.target.elements.searchQuery.value;
    const response = await fetchGallery(searchQuery);
    // console.log(response);

    if (response.hits.length === 0) {
      gallery.innerHTML = '<p>Sorry, there are no images matching your search query. Please try again.</p>';
      Notiflix.Report.warning(
        'Bad Request',
        'Sorry, there are no images matching your search query. Please try again.',
        'Okey'
      );
    } else {
      const markup = createGalleryMarkup(response.hits);
      renderGallery(gallery, markup);
    }

  } catch (error) {
    console.log('Error fetching images:', error);
  }
}

// function onLoadMore() {

// }
