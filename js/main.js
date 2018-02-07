document.getElementsByClassName('navigation')[0].onclick = function () {
  document.getElementsByClassName('navigation-pane')[0].classList.add('show-nav')
}

document.getElementsByClassName('close-nav')[0].onclick = function () {
  document.getElementsByClassName('navigation-pane')[0].classList.remove('show-nav')
}

MOVING = true
CURRENT_ELEMENT = true

document.querySelector('body').addEventListener('mousewheel', function(e){
  var delta = e.wheelDelta;
  if(delta > 0 && MOVING){
    MOVING = false
    moveToNextElement()
    setTimeout(function () { MOVING = true}, 3000)
  }
  else if(delta < 0 && MOVING){
    MOVING = false
    moveToPreviousElement()
    setTimeout(function () { MOVING = true}, 3000)
  }
  else {
    console.log('Wait')
  }
});

document.querySelector('body').onkeypress =  function(e){
  if(MOVING){
    MOVING = false
    moveToNextElement()
    setTimeout(function () { MOVING = true}, 3000)
  }
  else if(MOVING){
    MOVING = false
    moveToPreviousElement()
    setTimeout(function () { MOVING = true}, 3000)
  }
  else {
    console.log('Wait')
  }
}

function moveToNextElement () {
  console.log('Up')
}

function moveToPreviousElement () {
  console.log('Down')
}
