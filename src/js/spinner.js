
function showSpinner() {
    
    let opts = {
      lines: 13,
      length: 1,
      width: 3,
      radius: 20,
      scale: 1,
      corners: 1,
      color: '#FFA500',
      opacity: 0.25,
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      className: 'spinner',
      top: '70%',
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
  
  
  document.addEventListener('DOMContentLoaded', function() {
    showSpinner(); 
  });