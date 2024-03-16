document.addEventListener('click', function (event) {
  if (event.target.classList.contains('movie-card')) {
    const movieTitle = event.target.querySelector('.movie-title').textContent;
    const movieRating = event.target
      .querySelector('.rating')
      .textContent.trim();

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
      <h2>${movieTitle}</h2>
      <p>Rating: ${movieRating}</p>
      <!-- Puteți adăuga mai multe detalii despre film aici -->
    `;

    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }
});
