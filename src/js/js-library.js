import refs from './refs.js';

function onLoadLibraryPage() {
  refs.headerForm.classList.add('visually-hidden');
  refs.headerButtons.classList.remove('visually-hidden');
  refs.homeLink.classList.remove('current-link');
  refs.libraryLink.classList.add('current-link');
  refs.libraryHeader.classList.remove('container-header');
  refs.libraryHeader.classList.add('library-header');
}
refs.libraryLink.addEventListener('click', onLoadLibraryPage);
