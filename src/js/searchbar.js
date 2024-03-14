// searchbar.js
import { apiKey, apiUrlBase } from './api-key.js';

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
  
  async function searchMoviesByTitle(title) {
    const apiUrl = `${apiUrlBase}/search/movie?api_key=${apiKey}&query=${title}&language=${language}&include_adult=false&page=1`;
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
  
    return await fetchData(apiUrl, options);
  }
  
  async function searchAndDisplayMovies(title) {
    const movies = await searchMoviesByTitle(title);
  
    const moviesContainer = document.getElementById('movie-container');
    moviesContainer.innerHTML = '';
  
    if (movies.length === 0) {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Nu s-au găsit filme pentru căutarea dată.';
      moviesContainer.appendChild(errorMessage);
    } else {
      movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
      });
    }
  }
  function createMovieCard(movie) {
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
  
    const movieGenreYearRating = document.createElement('p');
    movieGenreYearRating.classList.add('movie-details');
    movieGenreYearRating.textContent = `Release Date: ${movie.release_date}, Rating: ${movie.vote_average}`;
  
    movieDescription.appendChild(movieTitle);
    movieDescription.appendChild(movieGenreYearRating);
  
    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieDescription);
  
    return movieCard;
  }
  
  window.onload = () => {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-bar');
  
    searchForm.addEventListener('submit', async event => {
      event.preventDefault();
      const searchQuery = searchInput.value.trim();
      if (searchQuery !== '') {
        await searchAndDisplayMovies(searchQuery);
      }
    });
  };


