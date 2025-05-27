const hamburger = document.querySelector('.js-header__hamburger');
const links = document.querySelector('.js-header__nav-list');
const navLogo = document.querySelector('.header__logo');
const contact = document.getElementById('contact-form');
const faqs = document.querySelectorAll(".faq__item");
const form = document.querySelector('.register__form');

// Display Mobile Menu
const mobileMenu = () => {
  hamburger.classList.toggle('is-active');
  links.classList.toggle('active');
};

hamburger.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
  const scrollPos = window.scrollY;
  const aboutMenu = document.querySelector('#about-page');
  const productsMenu = document.querySelector('#products-page');
  const touchMenu = document.querySelector('#get-page');
  const FAQMenu = document.querySelector('#FAQ-page');



  if (scrollPos < 500 && aboutMenu) {
    aboutMenu.classList.add('highlight');
  } else if (scrollPos >= 500 && scrollPos < 1200 && productsMenu) {
    productsMenu.classList.add('highlight');
  } else if (scrollPos >= 1200 && scrollPos < 1800 && touchMenu) {
    touchMenu.classList.add('highlight');
  } else if (scrollPos >= 1800 && FAQMenu) {
    FAQMenu.classList.add('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);

// Swiper 
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
});

// FAQ 
faqs.forEach(faq => {
  const toggle = faq.querySelector(".faq__toggle");

  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});

// Smooth scroll 
const header = document.querySelector('.header');
const scrollLinks = document.querySelectorAll('.js-scroll');

scrollLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      hamburger.classList.remove('is-active');
      links.classList.remove('active');
    }
  });
  
  });


 
