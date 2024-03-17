document.addEventListener('click', function (event) {
  const target = event.target;

  if (
    target.classList.contains('movie-watched-btn') ||
    target.classList.contains('movie-queue-btn')
  ) {
    const movieCard = target.closest('.movie-card');
    const movieTitle = movieCard.querySelector('.movie-title').textContent;

    let movies = JSON.parse(localStorage.getItem('movies')) || [];

    const movie = {
      title: movieTitle,
      watched: target.classList.contains('movie-watched-btn') ? true : false,
    };

    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }
});
