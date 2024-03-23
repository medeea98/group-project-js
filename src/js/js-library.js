import refs from './refs.js';
import { searchMovieById } from './searchbar.js';
import { createMovieCard, getGenres } from './searchbar.js'

function onLoadLibraryPage() {
  refs.headerForm.classList.add('visually-hidden');
  refs.headerButtons.classList.remove('visually-hidden');
  refs.libraryHeader.classList.remove('container-header');
  refs.libraryHeader.classList.add('library-header');
}
refs.libraryLink.addEventListener('click', onLoadLibraryPage);

document.addEventListener('click', function (event) {
  if (event.target.id === 'library-btn') {
    displayWatchedResults();
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    const queueButton = document.querySelector('.js-button-library-queue');
    const watchedButton = document.querySelector('.js-button-library-watched');
    const clearButton = document.querySelector('.js-button-library-clear');
    queueButton.addEventListener('click', displayQueueResults);
    watchedButton.addEventListener('click', displayWatchedResults);
    clearButton.addEventListener('click', clearResults);

    async function displayWatchedResults() {
      let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
      const movies = [];
      for (const movieId of watchedMovies) {
        const result = await searchMovieById(movieId);
        movies.push(result);
      }
      createCard(movies);
    }

    async function displayQueueResults() {
      let queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
      const movies = [];
      for (const movieId of queueMovies) {
        const result = await searchMovieById(movieId);
        movies.push(result);
      }

      createCard(movies);
    }

    async function createCard(movies) {
      const moviesContainerId = document.getElementById('movie-container');
      moviesContainerId.innerHTML = '';
      if (document.querySelector('.movies')) {
        document.querySelector('.movies').remove();
      }
      const moviesContainer = document.createElement('div');
      moviesContainer.classList.add('movies');

      const movieContainer = document.createElement('div');
      movieContainer.id = 'movie-container';
  
      moviesContainer.appendChild(movieContainer);
  
      document.body.appendChild(moviesContainer);

      const genres = await getGenres();

      movies.forEach((movie) => {
        createMovieCard(movie, genres, movieContainer)
      });
    }

    function clearResults() {
      localStorage.clear();
      location.reload();  
    }
  }
});
