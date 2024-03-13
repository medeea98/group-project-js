import refs from './refs.js';
function onLoadHomePage() {
  refs.headerForm.classList.remove('visually-hidden');
  refs.headerButtons.classList.add('visually-hidden');
  refs.libraryHeader.classList.add('container-header');
  refs.libraryHeader.classList.remove('library-header');
}
refs.homeLink.addEventListener('click', onLoadHomePage);
