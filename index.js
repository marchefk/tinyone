const navElems = {
  nav: {
    className: 'nav',
    id: 'nav'
  },
  navList: {
    className: 'nav__list',
    id: 'nav_list'
  }
};

const toggleNav = obj => {
  let el = document.getElementById(obj.id);
  let expanded = `${obj.className}--expanded`;
  el.classList.contains(expanded) ? el.classList.remove(expanded) : el.classList.add(expanded);
}

const toggleNavElems = document.getElementsByClassName('toggle-nav');
for (let toggler of toggleNavElems) {
  toggler.addEventListener('click', () => {
    for (var e in navElems) {
      toggleNav(navElems[e]);
    }
  });
}
