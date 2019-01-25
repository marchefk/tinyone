// const navElems = {
//   navItems: {
//     className: 'nav',
//   },
//   navList: {
//     className: 'nav__list',
//   }
// };
//
// const toggleNav = obj => {
//   let elList = document.getElementById(obj.className);
//   let expanded = `${obj.className}--expanded`;
//   for (let el in elList) {
//    toggleClass(el, expanded);
//   }
// }
//
// const toggleNavElems = document.getElementsByClassName('toggle-nav');
// for (let toggler of toggleNavElems) {
//   toggler.addEventListener('click', () => {
//     for (var e in navElems) {
//       toggleNav(navElems[e]);
//     }
//   });
// }


const nav = document.getElementById('nav');
const navButton = document.getElementById('nav_button')
const navList = document.getElementById('nav_list');
const navItems = document.getElementsByClassName('nav__item');
const toggleNavElems = document.getElementsByClassName('toggle-nav');



// All elements with 'toggle-nav' class now have event listener
// that expands navigation on small screen:
for (let toggler of toggleNavElems) {
  toggler.addEventListener('click', () => {
    navList.classList.toggle('nav__list--expanded');
    for (let item of navItems) {
      item.classList.toggle('nav__item--expanded');
    }
  })
}


// Helper function to conditionally toggle class
const getAction = (a, b, el, className) => {
  if (a < b && !el.classList.contains(className)) {
    return 'add';
  } else if (a > b && el.classList.contains(className)) {
    return 'remove';
  }
}


// On mobile when user scrolls down, navigation will change its position so that
// its not visible. When the user scrolls up it will appear again.
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
}


// Shrink nav height after scrolling past a certain point (screen > 800px):
const shrinkNavPoint = 1/10 * document.getElementById('section_home').clientHeight;
const shrinkNav = currPos => {
  let action = getAction(shrinkNavPoint, currPos, nav, 'nav--shrink');
  if (action) {
    nav.classList[action]('nav--shrink');
  }
}


// Slideshow function that gets called every 3 seconds
let slideIndex = 0;
const startSlideshow = () => {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  for (let slide of slides) {
    slide.style.display = "none";
  }
  slideIndex += 1;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (let dot of dots) {
    dot.className = dot.className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
  setTimeout(startSlideshow, 3000);
}


// shrinkNav and hideNav added to window.onscroll:
window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  hideNav(currentScrollPos);
  shrinkNav(currentScrollPos);
}
startSlideshow();
