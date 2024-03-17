function showSpinner() {
  let opts = {
    lines: 10,
    length: 1,
    width: 6,
    radius: 27,
    scale: 1,
    corners: 1,
    color: '#FFA500',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 3,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    className: 'spinner',
    top: '51%', 
    left: '50%', 
    shadow: false,
    hwaccel: false,
    position: 'absolute',
  };

  let target = document.getElementById('spinner');
  let spinner = new Spinner(opts).spin(target);

  setTimeout(function() {
    spinner.stop();
  }, 250);
}


function handleShowSpinner() {
  showSpinner();
}


document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    handleShowSpinner();
  }
});

window.addEventListener('load', handleShowSpinner); 
window.addEventListener('beforeunload', handleShowSpinner); 

document.querySelector('.search-button').addEventListener('click', function() {
  handleShowSpinner();
});

document.querySelector('.numbers-container').addEventListener('click', function(event) {
  if (event.target.classList.contains('number')) {
    handleShowSpinner();
  }
});
