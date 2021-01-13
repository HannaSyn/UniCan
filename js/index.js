const animItems = document.querySelectorAll('.anim-items');

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

window.addEventListener('scroll', animateOnScroll);

const iconMenu=document.querySelector(".navigation__burger");
const menuBody=document.querySelector(".navigation__list");
	iconMenu.addEventListener("click", (e) => {
		iconMenu.classList.toggle("open");
		menuBody.classList.toggle("open");
	});

const langBtn = document.querySelector('.lang');
langBtn.addEventListener('click', function() {
  langBtn.classList.toggle('open');
})

