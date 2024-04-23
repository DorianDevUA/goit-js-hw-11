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
// const loadMore = document.querySelector('.load-more');
const target = document.querySelector('.js-guard');

const options = {
  root: null,
  rootMargin: '300px',
};

let observer = new IntersectionObserver(onLoad, options);

searchForm.addEventListener('submit', onSubmitSearchQuery);
// loadMore.addEventListener('click', onLoadMore);

async function onSubmitSearchQuery(evt) {
  evt.preventDefault();
  currentPage = 1;
  currentQuery = evt.target.elements.searchQuery.value;

  try {
    const { hits, totalHits } = await fetchImage(currentQuery);

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
      observer.observe(target);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

      // if (totalHits > currentPage * 40) {
      //   loadMore.hidden = false;
      // } else {
      //   loadMore.hidden = true;
      // }
      // gallery.innerHTML = markup;
    }
  } catch (error) {
    console.log('Error fetching images:', error);
  }
}

// async function onLoadMore() {
//   currentPage += 1;

//   try {
//     const { hits, totalHits } = await fetchImage(currentQuery, currentPage);
//     const markup = createPhotoCard(hits);
//     appendGallery(gallery, markup);

//     if (totalHits > currentPage * 40) {
//       loadMore.hidden = false;
//     } else {
//       loadMore.hidden = true;
//     }
//   } catch (error) {
//     console.log('Error fetching images:', error);
//   }
// }

//infinity scroll observer
async function onLoad(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      try {
        currentPage += 1;

        const { hits, totalHits } = await fetchImage(currentQuery, currentPage);
        const markup = createPhotoCard(hits);
        appendGallery(gallery, markup);

        if (totalHits <= currentPage * 40) {
          observer.unobserve(target);
          Notiflix.Notify.warning(
            `We're sorry, but you've reached the end of search results.`
          );
        }
      } catch (error) {
        console.log('Error fetching images:', error);
      }
    }
  });
}
