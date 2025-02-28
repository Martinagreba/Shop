const hamburger = document.querySelector('.js-header__hamburger');
const links = document.querySelector('.js-header__nav-list');
const navLogo = document.querySelector('.header__logo');
const contact = document.getElementById('contact-form');
const faqs = document.querySelectorAll(".faq__item");
//Display Mobile Menu
const mobileMenu = () => {
  hamburger.classList.toggle('is-active')
  links.classList.toggle('active')
}

hamburger.addEventListener('click',mobileMenu);

//Show active menu when scrolling

const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const aboutMenu = document.querySelector('#about-page');
  const productsMenu = document.querySelector('#products-page');
  const touchMenu = document.querySelector('#get-page');
  const FAQMenu = document.querySelector('#FAQ-page');
  let scrollPos = window.scrollY;

   //ads 'highlight' class to my menu items

}


//Swiper 
const swiper = new Swiper('.products__slider', {
  loop: true,
  navigation: {
    nextEl: '.products__button-next',
    prevEl: '.products__button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    768: { 
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1025: { 
      slidesPerView: 4,
      spaceBetween: 20,
    }
}
}

);

faqs.forEach(faq => {
  const toggle = faq.querySelector(".faq__toggle");

  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
    })
  });










 








