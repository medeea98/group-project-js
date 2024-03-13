const apiKey = '004a3a7ad0ebfa9ee53f6d0ac407af43';
const apiUrlBase = 'https://api.themoviedb.org/3';
const language = 'en-US';

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
  return fetchData('trending/movie/week');
}

async function getGenres() {
  return fetchData('genre/movie/list');
}

function roundRating(rating) {
  const roundedRating =
    Math.abs(rating % 1) >= 0.005
      ? Math.ceil(rating * 100) / 100
      : Math.floor(rating * 100) / 100;
  return roundedRating;
}

async function displayMovies() {
  const moviesContainer = document.createElement('div');
  moviesContainer.classList.add('movies');

  const movieContainer = document.createElement('div');
  movieContainer.id = 'movie-container';

  moviesContainer.appendChild(movieContainer);

  document.body.appendChild(moviesContainer);

  const movies = await getPopularMovies();
  const genres = await getGenres();

  movies.results.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const movieImage = document.createElement('img');
    movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieImage.alt = `${movie.title} Poster`;
    movieImage.classList.add('movie-image');

    const movieDescription = document.createElement('div');
    movieDescription.classList.add('movie-description');

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.title;
    movieTitle.classList.add('movie-title');

    const movieGenres = movie.genre_ids.map(genreId => {
      const genre = genres.genres.find(g => g.id === genreId);
      return genre ? genre.name : '';
    });

    const displayedGenres = movieGenres.slice(0, 2);
    const otherGenres = movieGenres.slice(2);

    const roundedRating = roundRating(movie.vote_average);

    const movieGenreYearRating = document.createElement('p');

    const ratingSpan = document.createElement('span');
    ratingSpan.classList.add('rating');
    ratingSpan.textContent = ` ${roundedRating}`;

    if (otherGenres.length > 0) {
      movieGenreYearRating.innerHTML = `${displayedGenres.join(
        ', '
      )}, Other | ${
        movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'
      } | `;
    } else {
      movieGenreYearRating.innerHTML = `${displayedGenres.join(', ')} | ${
        movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'
      } | `;
    }

    movieGenreYearRating.appendChild(ratingSpan);

    movieGenreYearRating.classList.add('movie-details');

    movieDescription.appendChild(movieTitle);
    movieDescription.appendChild(movieGenreYearRating);

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieDescription);

    movieContainer.appendChild(movieCard);
  });
}

window.onload = displayMovies;
