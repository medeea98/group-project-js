import refs from './refs.js';

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

    const movies = JSON.parse(localStorage.getItem('movies')) || [];

    movies.forEach(movie => {
      if (movie.watched) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;
        movieTitle.classList.add('movie-title');

        movieCard.appendChild(movieTitle);
        mainContent.appendChild(movieCard);
      }
    });
  }
});
