'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());

  console.log('current scroll (x/y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // window.scrollBy({
  //   left: s1coords.left,
  //   top: s1coords.top,
  //   behavior: 'smooth',
  // });

  // Modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation
// If there are many elements, this method will get bad performance
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     console.log(e.target, e.currentTarget);
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); // 阻止element的默认事件，在这里就是href=#section--1/#section--2/#section--3

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // 此处是e.target而不是this,是因为this指的是currentTarget，即引起元素触发事件的父元素
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
  // console.log(e.target, e.currentTarget);
});

// Tabbed component
tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContents.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(el => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;

    // console.log(this);
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// const handleHover = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('.nav__logo');

//     siblings.forEach(el => {
//       if (el != link) {
//         el.style.opacity = opacity;
//       }
//     });
//     logo.style.opacity = opacity;
//   }
// };

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// Sticky navigation
/* 
// Bad performance: because the scroll here fires all the time
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // console.log(this.window.scrollY);
});
 */

// Sticky navigation: Intersection Observer API
/* const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null, // the root is the element that the target(section1) to intersect. Null means we will be able to observe our target element intersecting the entire viewport.
  threshold: [0, 0.2], // 0% means our callback will trigger each time that the target elemnt moves completely out of the view, and also as soon as it enters the view. Because the callback function will be called when the threshold is passed when moving into the view and when moving out of the view. 1 is 100%.
  // threshold: 0.1, // Threshold is the percentage of intersection at which the observer callback will be called.
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); // section1 is target. Our target element is intersecting the root element at the threshold that we defined. */
const hearder = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  // console.log(entry.isIntersecting);
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(hearder);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSections = function (entries, observer) {
  const [entry] = entries;

  // Guard clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  // console.log(entry);
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  entry.target.src = entry.target.dataset.src;

  observer.unobserve(entry.target);
};
const lazyImgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => lazyImgObserver.observe(img));

// Slider
const slide = function () {
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  let curSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');

  // create dots
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class ='dots__dot' data-slide = ${i} ></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      // console.log(s);
    });
  };

  // -100% 0% 100% 200% -> -200% -100% 0% 100% -> -300% -200% -100% 0
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // -300% -200% -100% 0 -> -200% -100% 0% 100% -> -100% 0% 100% 200%
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    // console.log(curSlide);
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    // 0 100% 200% 300%
    goToSlide(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();

    e.key === 'ArrowLeft' && prevSlide();
    // console.log(e);
  });

  dotContainer.addEventListener('click', function (e) {
    // console.log(e.target.dataset.slide);
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slide();
// console.log(tabs);
// console.log(tabContainer);
// console.log(tabContents);
///////////////////////////////////////
// Lecture
// Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // 推荐：querySelector & querySelectorAll are modern use
// console.log(document.querySelector('section'));
// const allSection = document.querySelectorAll('section');
// console.log(allSection);

// // getElementById can also use. But getElementsByTagName & getElementsByClassName in case you need.
// console.log(document.getElementById('section--1'));
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// const header = document.querySelector('header');

// // createElement & innerHTML
// const cookieMessage = document.createElement('div');
// cookieMessage.classList.add('cookie-message');

// // cookieMessage.textContent =
// //   "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it</button>";
// cookieMessage.innerHTML =
//   "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it</button>";

// // header.prepend(cookieMessage);
// // header.append(cookieMessage.cloneNode(true));
// header.append(cookieMessage);
// // header.before(cookieMessage);
// // header.after(cookieMessage);

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => cookieMessage.remove());

// // insertAdjacentHTML
// header.insertAdjacentHTML(
//   'beforeend',
//   `<div class="cookie-message">We use cookies for improved functionality and analytics.
//     <button class="btn btn--close-cookie">Got it</button>
//   </div>`
// );

// Old ways
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   cookieMessage.parentElement.removeChild(cookieMessage);
// });
/* 
// Styles
cookieMessage.style.backgroundColor = '#37383d';
cookieMessage.style.width = '105%';

// console.log(getComputedStyle(cookieMessage).backgroundColor);

cookieMessage.style.height =
  Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 30 + 'px';
// console.log(getComputedStyle(cookieMessage).height);

document.documentElement.style.setProperty('--color-primary', 'orange');

// cookieMessage.style.setProperty('font-size', '20px');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful logo';

// Non-standard attributes
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'bankit');

// ---IMPORTANT---
console.log(logo.src); // 绝对路径：http://127.0.0.1:5500/img/logo.png
console.log(logo.getAttribute('src')); // 相对路径：img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data- attributes
console.log(logo.dataset.versionNum);

// classes
logo.classList.add('a', 'b');
logo.classList.remove('a', 'b');
logo.classList.toggle('a');
console.log(logo.classList.contains('b')); // Not array's includes method

// DON'T USE (1. This will override all the existing classes 2. it allows us to only put one class on any element)
logo.className = 'jonas';
 */

/* // Event handler
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener');
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter');
// };
 */

/* 
// set random int between 0-255
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.currentTarget === this);
  console.log(e.target, e.currentTarget);

  // Stop propogation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
});
 */

/* 
const h1 = document.querySelector('h1');
// Going downwards: child
console.log(h1);
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstChild);
console.log(h1.firstElementChild);
// h1.firstChild.textContent = '/when/';
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
console.log(h1.closest('body'));
// console.log(h1.closest('section'));
console.log(h1.closest('.header'));
h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('body').style.background = 'var(--gradient-primary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (child) {
  console.log(child);
  if (child !== h1) {
    child.style.transform = 'scale(0.5)';
  }
});
 */

document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
});

window.addEventListener('load', function (e) {
  console.log(e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
