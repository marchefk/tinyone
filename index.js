// const navElems = {
//   nav: {
//     className: 'nav',
//     id: 'nav'
//   },
//   navList: {
//     className: 'nav__list',
//     id: 'nav_list'
//   }
// };
//
// const toggleNav = obj => {
//   let el = document.getElementById(obj.id);
//   let expanded = `${obj.className}--expanded`;
//   el.classList.contains(expanded) ? el.classList.remove(expanded) : el.classList.add(expanded);
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


// Function that takes arguments of element and class and
// adds it to/ removes it from that element:
const toggleClass = (el, className) => {
  el.classList.contains(className) ?
  el.classList.remove(className) : el.classList.add(className);
}

// All elements with 'toggle-nav' class now have event listener
// that expands navigation on small screen (by calling toggleClass function that will
// add 'nav__list--expanded class' to #nav_list):
const toggleNavElems = document.getElementsByClassName('toggle-nav');
for (let toggler of toggleNavElems) {
  toggler.addEventListener('click', () => {
    let navList = document.getElementById('nav_list');
    toggleClass(navList, 'nav__list--expanded');
  })
}
