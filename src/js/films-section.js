export const apiKey = '004a3a7ad0ebfa9ee53f6d0ac407af43';
export const apiUrlBase = 'https://api.themoviedb.org/3';

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
  const mainContent = document.getElementById('main-content');

  const moviesContainer = document.createElement('div');
  moviesContainer.classList.add('movies');

  const movieContainer = document.createElement('div');
  movieContainer.id = 'movie-container';

  moviesContainer.appendChild(movieContainer);

  mainContent.appendChild(moviesContainer);

  const movies = await getPopularMovies();
  const genres = await getGenres();

  movies.results.forEach(async movie => {
    const movieDetails = await fetchData(`movie/${movie.id}`);

    const rating = movieDetails.vote_average;
    const popularity = movieDetails.popularity;
    const genresArray = movieDetails.genres.map(genre => genre.name);
    const description = movieDetails.overview;

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

    const ratingSpan = document.createElement('span');
    ratingSpan.classList.add('rating');
    ratingSpan.textContent = ` ${roundRating(rating)}`;

    const movieGenreYearRating = document.createElement('p');
    movieGenreYearRating.innerHTML = `${genresArray.slice(0, 2).join(', ')}, ${
      genresArray.length > 2 ? 'Other' : ''
    } | ${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'} | `;
    movieGenreYearRating.appendChild(ratingSpan);
    movieGenreYearRating.classList.add('movie-details');

    movieDescription.appendChild(movieTitle);
    movieDescription.appendChild(movieGenreYearRating);

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieDescription);

    movieCard.addEventListener('click', () =>
      openMovieModal(
        movie.title,
        movie.poster_path,
        roundRating(rating),
        popularity,
        genresArray,
        description
      )
    );

    movieContainer.appendChild(movieCard);
  });
}

export function openMovieModal(
  movieTitle,
  posterPath,
  rating,
  popularity,
  genres,
  description
) {
  const modalBackdrop = document.createElement('div');
  modalBackdrop.classList.add('modal-backdrop');

  modalBackdrop.addEventListener('click', event => {
    if (event.target === modalBackdrop) {
      closeModal(modalBackdrop);
    }
  });

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const movieImage = document.createElement('img');
  movieImage.src = `https://image.tmdb.org/t/p/w500/${posterPath}`;
  movieImage.alt = `${movieTitle} Poster`;
  movieImage.classList.add('movie-image');

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = movieTitle;

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.addEventListener('click', () => closeModal(modalBackdrop));

  const modalMovieDescription = document.createElement('div');
  modalMovieDescription.classList.add('modal-movie-description');

  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.innerHTML = `<b>ABOUT:</b>`;
  const descriptionContent = document.createElement('p');
  descriptionContent.textContent = description;

  const statsContainer = document.createElement('div');
  statsContainer.classList.add('movie-modal-stats');

  const tagsContainer = document.createElement('div');
  tagsContainer.classList.add('movie-modal-tags');

  const resultsContainer = document.createElement('div');
  resultsContainer.classList.add('movie-modal-results');

  const ratingTag = document.createElement('span');
  ratingTag.textContent = 'Rating:';
  const ratingResult = document.createElement('span');
  ratingResult.classList.add('rating');
  ratingResult.textContent = rating;

  const popularityTag = document.createElement('span');
  popularityTag.textContent = 'Popularity:';
  const popularityResult = document.createElement('span');
  popularityResult.textContent = popularity;

  const genresTag = document.createElement('span');
  genresTag.textContent = 'Genres:';
  const genresResult = document.createElement('span');
  genresResult.textContent = genres.join(', ');

  tagsContainer.appendChild(ratingTag);
  tagsContainer.appendChild(popularityTag);
  tagsContainer.appendChild(genresTag);

  resultsContainer.appendChild(ratingResult);
  resultsContainer.appendChild(popularityResult);
  resultsContainer.appendChild(genresResult);

  statsContainer.appendChild(tagsContainer);
  statsContainer.appendChild(resultsContainer);

  modalMovieDescription.appendChild(modalTitle);
  modalMovieDescription.appendChild(statsContainer);

  modalMovieDescription.appendChild(descriptionParagraph);
  modalMovieDescription.appendChild(descriptionContent);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('modal-buttons');

  const addToWatchedButton = createButton(
    'ADD TO WATCHED',
    'movie-watched-btn'
  );
  const addToQueueButton = createButton('ADD TO QUEUE', 'movie-queue-btn');

  buttonsContainer.appendChild(addToWatchedButton);
  buttonsContainer.appendChild(addToQueueButton);

  modalMovieDescription.appendChild(buttonsContainer);

  modalContent.appendChild(movieImage);
  modalContent.appendChild(modalMovieDescription);
  modalContent.appendChild(closeButton);

  modalBackdrop.appendChild(modalContent);
  document.body.appendChild(modalBackdrop);

  modalBackdrop.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal(modalBackdrop) {
  modalBackdrop.style.display = 'none';
  document.body.style.overflow = '';
  modalBackdrop.remove();
}

function createButton(text, className) {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(className);
  return button;
}

window.onload = displayMovies;
