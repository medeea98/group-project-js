const apiKey = '004a3a7ad0ebfa9ee53f6d0ac407af43';
const apiUrlBase = 'https://api.themoviedb.org/3';

async function fetchData(endpoint) {
  const apiUrl = `${apiUrlBase}/${endpoint}?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error at ${apiUrl}`, error);
  }
}

async function getPopularMovies() {
  return fetchData('movie/popular');
}

async function getGenres() {
  return fetchData('genre/movie/list');
}

async function displayMovies() {
  const movieContainer = document.createElement('div');
  movieContainer.id = 'movie-container';

  document.body.appendChild(movieContainer);

  const movies = await getPopularMovies();
  const genres = await getGenres();

  movies.results.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const movieImage = document.createElement('img');
    movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieImage.alt = `${movie.title} Poster`;
    movieImage.classList.add('movie-image');

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.title;

    const movieGenres = movie.genre_ids.map(genreId => {
      const genre = genres.genres.find(g => g.id === genreId);
      return genre ? genre.name : '';
    });

    const movieGenre = document.createElement('p');
    movieGenre.textContent = `Gen: ${movieGenres.join(', ')}`;

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieGenre);

    movieContainer.appendChild(movieCard);
  });
}

window.onload = displayMovies;
