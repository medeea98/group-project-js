export let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
export let queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
import {addToWatchedButton}  from './films-section.js'
import {addToQueueButton} from './films-section'
  addToWatchedButton.addEventListener('click', function() {
      let movieId = this.dataset.movieId;
      addToWatched(movieId);
  });
  addToQueueButton.addEventListener('click', function() {
    let movieId = this.dataset.movieId;
    addToQueue(movieId);
});
function addToWatched(movieId) {
 let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
 if (!watchedMovies.includes(movieId)) {
  watchedMovies.push(movieId);
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
}}

function addToQueue(movieId) {
  let queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
  if (!queueMovies.includes(movieId)) {
    queueMovies.push(movieId);
  localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
}}
