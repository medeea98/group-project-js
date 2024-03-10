document.getElementById('btn-watched').onmouseover = function () {
  mouseOver();
};
document.getElementById('btn-watched').onmouseout = function () {
  mouseOut();
};

function mouseOver() {
  document.getElementById('btn-watched').style.backgroundColor = 'red';
}

function mouseOut() {
  document.getElementById('btn-watched').style.backgroundColor =
    'blanchedalmond';
}
