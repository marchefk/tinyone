const nav = document.getElementById('nav');
const navButton = document.getElementById('nav__button')
const navList = document.getElementById('nav__list');
const navItems = document.getElementsByClassName('nav__item');
const toggleNavElems = document.getElementsByClassName('toggle-nav');
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
  this.className = className;
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
const slides = new Elements('slide');
const dots = new Elements('indicator__dot');
let slideIndex = 0;
const startSlideshow = () => {
  slides.removeActiveClass();
  dots.removeActiveClass();
  slideIndex += 1;

  if (slideIndex > slides.list.length) {
    slideIndex = 1;
  }

  slides.addActiveClass(slideIndex-1);
  dots.addActiveClass(slideIndex-1);
  setTimeout(startSlideshow, 5000);
};



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
