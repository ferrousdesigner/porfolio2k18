document.getElementsByClassName('navigation')[0].onclick = function () {
  document.getElementsByClassName('navigation-pane')[0].classList.add('show-nav')
}

document.getElementsByClassName('close-nav')[0].onclick = function () {
  document.getElementsByClassName('navigation-pane')[0].classList.remove('show-nav')
}

var panel = document.getElementsByClassName('work-panel-white')[0]

var panelV = document.getElementsByClassName('vertical-panel')[0]

let current_left = 0
let current_top = 0
let new_top = 0
let new_left = 0


MOVING_X = true

MOVING_V = true


var el = document.getElementsByClassName('vertical-panel')[0]
swipedetect(el, function(swipedir){
    if (swipedir =='left')
         slideRight()
    else if(swipedir =='right') {

      slideLeft()
    }
    else if(swipedir =='up') {
        slideDown()
    }
    else if(swipedir =='down') {

      slideUp()
    }
    else{

    }
})


document.querySelector('body').addEventListener('mousewheel', function(e){
  // console.log(document.getElementsByClassName('work-white'))
  var delta = e.wheelDelta;
  if(delta > 0){
      slideUp()
  }
  else if(delta < 0){

      slideDown()
  }
  else {
    console.log('Wait')
  }
});

document.querySelector('body').onkeydown =  function(e){
    if (e.key == 'ArrowUp') {
        slideUp()
    } else if (e.key == 'ArrowDown') {
        slideDown()
    } else if (e.key == 'ArrowRight') {
      slideRight()

    } else if (e.key == 'ArrowLeft') {
      slideLeft()
    }

}

function slideDown () {
  // console.log('Up')
  if(MOVING_V && current_top < (5 * window.innerHeight) ) {
  MOVING_V = false
  new_top = (parseInt(current_top) + window.innerHeight)
  panelV.style.transform = 'translateY(-' + new_top + 'px)'
  current_top = new_top

  setTimeout(function () { MOVING_V = true}, 1500)
  }
}

function slideUp () {
  // console.log('Down')
  if(MOVING_V && current_top > 0) {
  MOVING_V = false

  new_top = (parseInt(current_top) - window.innerHeight)
  panelV.style.transform = 'translateY(-' + new_top + 'px)'
  current_top = new_top

  setTimeout(function () { MOVING_V = true}, 1500)
  }
}

function slideLeft () {
  if(MOVING_X && current_left > 0 && current_top >= (3 * window.innerHeight) && current_top < (4 * window.innerHeight)  ) {
  MOVING_X = false
  new_left = (parseInt(current_left) - window.innerWidth)
  panel.style.transform = 'translateX(-' + new_left + 'px)'
  current_left = new_left
  document.getElementsByClassName('active')[0].previousSibling.classList.add('active')
  document.getElementsByClassName('active')[1].classList.remove('active')
  setTimeout(function () { MOVING_X = true}, 1500)
  }
}

function slideRight() {
  console.log(current_top/window.innerHeight)
  if(MOVING_X && current_left < (7 * window.innerWidth) && current_top >= (3 * window.innerHeight) && current_top < (4 * window.innerHeight) ) {
  MOVING_X = false
  console.log('Right')
  new_left = (parseInt(current_left) + window.innerWidth)
  panel.style.transform = 'translateX(-' + new_left + 'px)'
  current_left = new_left
  document.querySelectorAll('.active')[0].nextSibling.classList.add('active')
  document.querySelectorAll('.active')[0].classList.remove('active')
  setTimeout(function () { MOVING_X = true}, 1500)
  }
}

  function swipedetect(el, callback){
      var touchsurface = el,
      swipedir,
      startX,
      startY,
      distX,
      distY,
      threshold = 150, //required min distance traveled to be considered swipe
      restraint = 100, // maximum distance allowed at the same time in perpendicular direction
      allowedTime = 300, // maximum time allowed to travel that distance
      elapsedTime,
      startTime,
      handleswipe = callback || function(swipedir){}
    
      touchsurface.addEventListener('touchstart', function(e){
          var touchobj = e.changedTouches[0]
          swipedir = 'none'
          dist = 0
          startX = touchobj.pageX
          startY = touchobj.pageY
          startTime = new Date().getTime()
          e.preventDefault()
      }, false)
    
      touchsurface.addEventListener('touchmove', function(e){
          e.preventDefault()
      }, false)
    
      touchsurface.addEventListener('touchend', function(e){
          var touchobj = e.changedTouches[0]
          distX = touchobj.pageX - startX
          distY = touchobj.pageY - startY
          elapsedTime = new Date().getTime() - startTime
          if (elapsedTime <= allowedTime){
              if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                  swipedir = (distX < 0)? 'left' : 'right'
              }
              else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){
                  swipedir = (distY < 0)? 'up' : 'down'
              }
          }
          handleswipe(swipedir)
          e.preventDefault()
      }, false)
  }

document.querySelector('.arrow-left > img').onclick = () => {
    slideRight()
}
document.querySelector('.arrow-right > img').onclick = () => {
    slideLeft()
}
