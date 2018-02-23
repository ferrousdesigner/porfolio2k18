document.getElementsByClassName('navigation')[0].onclick = function () {
  document.getElementsByClassName('navigation-pane')[0].classList.add('show-nav')
}

document.getElementsByClassName('close-nav')[0].onclick = function () {
  document.getElementsByClassName('navigation-pane')[0].classList.remove('show-nav')
}

window.onload = function () {
  setTimeout(function () {
    document.querySelector('.loader').classList.add('loader-hide')
  }, 2000)

}



var panel = document.getElementsByClassName('work-panel-white')[0]

var panelV = document.getElementsByClassName('vertical-panel')[0]

let current_left = 0
let current_top = 0
let new_top = 0
let new_left = 0

let timeout = window.innerWidth > 800 ? 1000 : 600

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


var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

if (document.attachEvent)
    document.querySelector('body').attachEvent("on"+mousewheelevt, function(e){
      scrollDetectFunction(e)
    })
else if (document.addEventListener)
    document.querySelector('body').addEventListener(mousewheelevt, function(e){
      scrollDetectFunction(e)
    }, false)

    function scrollDetectFunction(e){
     if((/Firefox/i.test(navigator.userAgent)))
     {
       var delta = e.detail;
       if(delta < 0){
           slideUp()
       }
       else if(delta > 0){

           slideDown()
       }
       else {
       }
     } else {
       var delta = e.wheelDelta;
       if(delta > 0){
           slideUp()
       }
       else if(delta < 0){

           slideDown()
       }
       else {
       }
     }
    }


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
  if(MOVING_V && current_top < (5 * window.screen.availHeight) ) {
  MOVING_V = false
  new_top = (parseInt(current_top) + window.screen.availHeight)
  panelV.style.transform = 'translateY(-' + new_top + 'px)'
  current_top = new_top
  checkArrow()
  setTimeout(function () { MOVING_V = true}, timeout)
  }
}

function slideUp () {
  if(MOVING_V && current_top > 0) {
  MOVING_V = false

  new_top = (parseInt(current_top) - window.screen.availHeight)
  panelV.style.transform = 'translateY(-' + new_top + 'px)'
  current_top = new_top
  checkArrow()
  setTimeout(function () { MOVING_V = true}, timeout)
  }
}

function slideLeft () {
  if(MOVING_X && current_left > 0 && current_top >= (3 * window.screen.availHeight) && current_top < (4 * window.screen.availHeight)  ) {
  MOVING_X = false
  new_left = (parseInt(current_left) - window.innerWidth)
  panel.style.transform = 'translateX(-' + new_left + 'px)'
  current_left = new_left
  document.getElementsByClassName('active')[0].previousSibling.classList.add('active')
  document.getElementsByClassName('active')[1].classList.remove('active')
  checkArrow()
  setTimeout(function () { MOVING_X = true}, timeout)
  }
}

function slideRight() {
  if(MOVING_X && current_left < (7 * window.innerWidth) && current_top >= (3 * window.screen.availHeight) && current_top < (4 * window.screen.availHeight) ) {
  MOVING_X = false
  new_left = (parseInt(current_left) + window.innerWidth)
  panel.style.transform = 'translateX(-' + new_left + 'px)'
  current_left = new_left
  document.querySelectorAll('.active')[0].nextSibling.classList.add('active')
  document.querySelectorAll('.active')[0].classList.remove('active')
  checkArrow()

  setTimeout(function () { MOVING_X = true}, timeout)
  }
}

  function swipedetect(el, callback){
      var touchsurface = el,
      swipedir,
      startX,
      startY,
      distX,
      distY,
      threshold = 50, //required min distance traveled to be considered swipe
      restraint = 100, // maximum distance allowed at the same time in perpendicular direction
      allowedTime = 1000, // maximum time allowed to travel that distance
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


let indicators = document.getElementsByClassName('page-indicator')[0].childNodes

for(let i = 0; i < indicators.length; i++)
{
  indicators[i].onclick = indicatorAction
  indicators[i].setAttribute('data-index', i + 1)
}

function indicatorAction(e) {
  let offset = e.target.getAttribute('data-index')
  document.getElementsByClassName('active')[0].classList.remove('active')
  e.target.classList.add('active')
  current_left = (parseInt(offset) - 1) * parseInt(window.innerWidth);
  panel.style.transform = 'translateX(-' + current_left + 'px)'
  checkArrow()

}

function moveTo(dest) {

  if(dest == 'home') {
    current_top = 0 * parseInt(window.screen.availHeight)
    panelV.style.transform = 'translateY(-' + current_top + 'px)'
    checkArrow()

  } else if(dest == 'about') {
    current_top = 1 * parseInt(window.screen.availHeight)
    panelV.style.transform = 'translateY(-' + current_top + 'px)'
    checkArrow()
  } else if(dest == 'theory') {
    current_top = 2 * parseInt(window.screen.availHeight)

    panelV.style.transform = 'translateY(-' + current_top + 'px)'
    checkArrow()
  } else if(dest == 'work') {
    current_top = 3 * parseInt(window.screen.availHeight)

    panelV.style.transform = 'translateY(-' + current_top + 'px)'
    checkArrow()
  } else if(dest == 'hobbie') {
    current_top = 4 * parseInt(window.screen.availHeight)

    panelV.style.transform = 'translateY(-' + current_top + 'px)'
    checkArrow()
  } else if(dest == 'contact') {
    current_top = 5 * parseInt(window.screen.availHeight)

    panelV.style.transform = 'translateY(-' + current_top + 'px)'
    checkArrow()
  }
  document.querySelector('.close-nav').click()

}
function goTo(dest) {
  console.log('dest')
  if(dest == 'github'){
    window.open('https://github.com/ferrousdesigner', '_blank');
  } else if(dest == 'linkedin'){
    window.open('https://www.linkedin.com/in/farazkhanuiux', '_blank');

  } else if(dest == 'youtube'){
    window.open('http://www.youtube.com/channel/UC2BBAZuEc-j25f8CVULJ5eA?sub_confirmation=1', '_blank');
  } else if(dest == 'instagram'){
      window.open('https://www.instagram.com/the_band_of_one/', '_blank');
  }
}


function checkArrow () {
  if(current_left > 0){
    document.getElementsByClassName('arrow-right')[0].classList.remove('hide-arrow')
  }
  if(current_left == (7 * window.innerWidth))
  {
    document.getElementsByClassName('arrow-left')[0].classList.add('hide-arrow')
  }
  if(current_left == 0){
    document.getElementsByClassName('arrow-right')[0].classList.add('hide-arrow')
  }
  if(current_left < (7 * window.innerWidth))
  {
    document.getElementsByClassName('arrow-left')[0].classList.remove('hide-arrow')
  }
  if(current_top < (5 * window.screen.availHeight) && current_top >= ( 4 * window.screen.availHeight) )
  {
    document.querySelector('.fixed-links').classList.add('show-links')
  }
  else {
    document.querySelector('.fixed-links').classList.remove('show-links')
  }
  if(current_top < (6 * window.screen.availHeight) && current_top >= ( 5 * window.screen.availHeight) )
  {
    document.querySelector('.flex').classList.add('show-flex')
  }
  else {
    document.querySelector('.flex').classList.remove('show-flex')
  }

  if(current_top < (2 * window.screen.availHeight) && current_top >= ( 1 * window.screen.availHeight) )
  {
    document.querySelector('.about').classList.add('about-show')
  }
  else {
    document.querySelector('.about').classList.remove('about-show')
  }
}
