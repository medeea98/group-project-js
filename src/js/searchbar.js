// searchbar.js
import { apiKey, apiUrlBase } from './api-key.js';
import {openMovieModal} from './films-section.js';
async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function getMovies(endpoint) {
  const apiUrl = `${apiUrlBase}/${endpoint}?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error at ${apiUrl}`, error);
  }
}

export async function getGenres() {
  return getMovies('/genre/movie/list');
}

async function getPopularMovies() {
  return getMovies('/trending/movie/week');
}

async function searchMovies(title) {
  const apiUrl = `${apiUrlBase}/search/movie?api_key=${apiKey}&query=${title}&language=en-US&include_adult=false&page=1`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  return await fetchData(apiUrl, options);
}

export async function searchMovieById(id) {
  const apiUrl = `${apiUrlBase}/movie/${id}?api_key=${apiKey}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  }

  return await fetchData(apiUrl, options);
}

function roundRating(rating) {
  const roundedRating =
    Math.abs(rating % 1) >= 0.005
      ? Math.ceil(rating * 100) / 100
      : Math.floor(rating * 100) / 100;
  return roundedRating;
}

async function searchAndDisplayMovies(title) {
  let movies;
  if (title) {
    movies = await searchMovies(title);
  } else {
    movies = await getPopularMovies();
  }

  const moviesContainer = document.getElementById('movie-container');
  moviesContainer.innerHTML = '';

  if (movies.results.length === 0) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Nu s-au găsit filme pentru căutarea dată.';
    moviesContainer.appendChild(errorMessage);
    document.querySelector('.movies').hidden = true;
  } else {
    document.querySelector('.movies').remove();
    const moviesContainer = document.createElement('div');
    moviesContainer.classList.add('movies');

    const movieContainer = document.createElement('div');
    movieContainer.id = 'movie-container';

    moviesContainer.appendChild(movieContainer);

    document.body.appendChild(moviesContainer);

    const genres = await getGenres();
    movies.results.forEach(movie => {
      createMovieCard(movie, genres, movieContainer);
    });
  }
}

export function createMovieCard(movie, genres, movieContainer) {
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
  let movieGenres;

  if (movie.genre_ids) {
    movieGenres = movie.genre_ids.map(genreId => {
      console.log(movie);
      const genre = genres.genres.find(g => g.id === genreId);
      return genre ? genre.name : '';
    });
  } else {
    movieGenres = movie.genres.map(genre => {
      return genre.name;
    });
  }

  const displayedGenres = movieGenres.slice(0, 2);
  const otherGenres = movieGenres.slice(2);

  const roundedRating = roundRating(movie.vote_average);

  const movieGenreYearRating = document.createElement('p');

  const ratingSpan = document.createElement('span');
  ratingSpan.classList.add('rating');
  ratingSpan.textContent = ` ${roundedRating}`;

  if (otherGenres.length > 0) {
    movieGenreYearRating.innerHTML = `${displayedGenres.join(', ')}, Other | ${
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
  movieCard.addEventListener('click', () => {
    openMovieModal(
      movie.title,
      movie.poster_path,
      movie.vote_average,
      movie.popularity,
      displayedGenres,
      movie.overview
    );
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const searchForm = document.querySelector('.search-bar');

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    await searchAndDisplayMovies(searchQuery);
  });
});
