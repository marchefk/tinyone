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


// All elements with 'toggle-nav' class now have event listener
// that expands navigation on small screen:
const toggleNavElems = document.getElementsByClassName('toggle-nav');
const navList = document.getElementById('nav_list');
const navItems = document.getElementsByClassName('nav__item');

for (let toggler of toggleNavElems) {
  toggler.addEventListener('click', () => {
    navList.classList.toggle('nav__list--expanded');
    for (let item of navItems) {
      item.classList.toggle('nav__item--expanded');
    }
  })
}
