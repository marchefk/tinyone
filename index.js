const nav = document.getElementById('nav');
const navButton = document.getElementById('nav__button')
const navList = document.getElementById('nav__list');
const navItems = document.getElementsByClassName('js-nav__item');
const toggleNavElems = document.getElementsByClassName('js-toggle-nav');
const form = document.getElementById('form');
const input = document.getElementById('form__input');


// helper for hideNav and shrinkNav
const getAction = (a, b, el, className) => {
  if (a < b && !el.classList.contains(className)) {
    return 'add';
  } else if (a > b && el.classList.contains(className)) {
    return 'remove';
  }
};


// hideNav:
let prevScrollPos = window.pageYOffset;
const scrollHideEls = [nav, navButton, navList];
const hideNav = currPos => {
  for (let el of scrollHideEls) {
    let action = getAction(prevScrollPos, currPos, el, 'scroll-hide');

    if (action) {
      el.classList[action]('scroll-hide');
    }
  }
  prevScrollPos = currPos;
};


// shrinkNav
const shrinkNavPoint = 1/10 * document.getElementById('section_header').clientHeight;
const shrinkNav = currPos => {
  let action = getAction(shrinkNavPoint, currPos, nav, 'nav--shrink');

  if (action) {
    return nav.classList[action]('nav--shrink');
  }
};


// helper for startSlideshow:
function Elements(className, slideIndex) {
  this.className = className.split('-').pop();
  this.list = document.getElementsByClassName(className);
  this.removeActiveClass = function() {
    for (let el of this.list) {
      if (el.classList.contains(`${this.className}--active`)) {
        el.classList.remove(`${this.className}--active`);
      }
    }
  };
  this.addActiveClass = function(index) {
    this.list[index].classList.add(`${this.className}--active`);
  };
}


// startSlideshow:
let slideshowTimeout;
const slides = new Elements('js-slide');
const dots = new Elements('js-indicator__dot');
let slideIndex = 0;
const startSlideshow = () => {
  slides.removeActiveClass();
  dots.removeActiveClass();

  if (slideIndex >= slides.list.length) {
    slideIndex = 0;
  }

  if (slideIndex < 0) {
    slideIndex = 2;
  }

  slides.addActiveClass(slideIndex);
  dots.addActiveClass(slideIndex);

  slideIndex += 1;
  slideshowTimeout = setTimeout(startSlideshow, 5000);
};



const dot_elems = dots.list;
for (let dot of dot_elems) {
  dot.addEventListener('click', () => {
    if (slideshowTimeout) {
      clearTimeout(slideshowTimeout);
    }

    slideIndex = parseInt(dot.dataset.slideIndex);
    startSlideshow();
  });
}


// callback functions for swiping:
let xTouchStart,
    yTouchStart;

const handleTouchStart = evt => {
  xTouchStart = evt.touches[0].clientX;
  yTouchStart = evt.touches[0].clientY;
};

const handleTouchMove = evt => {
  if (!xTouchStart) {
    return;
  }

  let xTouchEnd = evt.touches[0].clientX;
  let yTouchEnd = evt.touches[0].clientY;
  let xDiff = xTouchStart - xTouchEnd;
  let yDiff = yTouchStart - yTouchEnd;

  // determine wether the user meant to scroll horizontal or vertical:
  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
    if (slideshowTimeout) {
      clearTimeout(slideshowTimeout);
    }

    if ( xDiff < 0 ) {
      slideIndex -= 2;
    }

    startSlideshow();
  }
  xTouchStart = null;
};


const slideshow = document.getElementById('slideshow');
slideshow.addEventListener('touchstart', handleTouchStart, false);
slideshow.addEventListener('touchmove', handleTouchMove, false);

for (let toggler of toggleNavElems) {
  toggler.addEventListener('click', () => {
    navList.classList.toggle('nav__list--expanded');

    for (let item of navItems) {
      item.classList.toggle('nav__item--expanded');
    }
  });
}

form.onsubmit = () => {
  input.value = "";
  return false;
};

window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  hideNav(currentScrollPos);
  shrinkNav(currentScrollPos);
};

startSlideshow();
