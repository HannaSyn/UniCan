const animItems = document.querySelectorAll('.anim-items');
const langBtn = document.querySelector('.lang');
const iconMenu=document.querySelector('.navigation__burger');
const menuBody=document.querySelector('.navigation__list');

function animateOnScroll() {
  for( let i = 0; i < animItems.length; i++ ) {
    const animItem = animItems[i];
    const animItemHeigh = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;
    const animStart = 4;

    let animItemPoint = window.innerHeight - animItemHeigh / animStart;

    if( animItemHeigh >  window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if((pageYOffset > (animItemOffset - animItemPoint)) && (pageYOffset < (animItemOffset + animItemHeigh))) {
      animItem.classList.add('active');
    } else {
      animItem.classList.remove('active');
    }
  }
}

function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageXOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}


function openMenu(e) {
  iconMenu.classList.toggle('open');
  menuBody.classList.toggle('open');
};


function openLangList(e) {
  langBtn.classList.add('open');
  const target = e.target;
  if(!target.classList.contains('lang')){
    langBtn.classList.remove('open');
  }
};

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('scroll', animateOnScroll);

  langBtn.addEventListener('click', openLangList);
  iconMenu.addEventListener('click', openMenu);
});
