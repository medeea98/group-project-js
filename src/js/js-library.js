import refs from './refs.js';
import {displayMovies} from './films-section.js';
import {openMovieModal} from './films-section.js';
import { watchedMovies, queueMovies } from './storage.js';

function onLoadLibraryPage() {
  refs.headerForm.classList.add('visually-hidden');
  refs.headerButtons.classList.remove('visually-hidden');
  refs.libraryHeader.classList.remove('container-header');
  refs.libraryHeader.classList.add('library-header');
}
refs.libraryLink.addEventListener('click', onLoadLibraryPage);

document.addEventListener('click', function (event) {
  if (event.target.id === 'library-btn') {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    const queueButton = document.querySelector('.js-button-library-queue');
    const watchedButton = document.querySelector('.js-button-library-watched');
    const clearButton = document.querySelector('.js-button-library-clear');
    queueButton.addEventListener('click', displayQueueResults);
    watchedButton.addEventListener('click', displayWatchedResults);
    clearButton.addEventListener('click', clearResults);

    function displayWatchedResults () { 
      watchedMovies.forEach(async movieId => {
      await displayMovies(movieId); 
  });}
    function displayQueueResults () { 
    queueMovies.forEach(async movieId => {
    await displayMovies(movieId); 
});}
  }

});
