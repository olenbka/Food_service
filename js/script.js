window.addEventListener('DOMContentLoaded', function() {

  // Tabs
  
let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
      
      tabsContent.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
          item.classList.remove('tabheader__item_active');
      });
}

function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
  }
  
  hideTabContent();
  showTabContent();

tabsParent.addEventListener('click', function(event) {
  const target = event.target;
  if(target && target.classList.contains('tabheader__item')) {
          tabs.forEach((item, i) => {
              if (target == item) {
                  hideTabContent();
                  showTabContent(i);
              }
          });
  }
});

  //Timer

const deadline = '2023-12-31';

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor(t / (1000 * 60 * 60) % 24),
        minutes = Math.floor(t / (1000 * 60) % 60),
        seconds = Math.floor(t / (1000) % 60);

  return {
    "total" : t,
    "days" : days,
    "hours" : hours,
    "minutes" :minutes,
    "seconds" : seconds
  }      
}

function setZeroOnClock(num) {
  if (num >=0 && num < 10) {
    return `0${num}`;
  } else {
    return num
  }
}

function setClock(selector, endtime) {
  const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInt = setInterval(updateClock, 1000);

  updateClock(endtime);       

  function updateClock () {
    const t = getTimeRemaining(endtime);

    days.innerHTML = setZeroOnClock(t.days),
    hours.innerHTML = setZeroOnClock(t.hours),
    minutes.innerHTML = setZeroOnClock(t.minutes),
    seconds.innerHTML = setZeroOnClock(t.seconds);


    if (t.total <= 0) {
      clearInterval(timeInt);
    }

  }   
  
}
setClock('.timer', deadline);

//Modal

const modal = document.querySelector('.modal'),
      openModalBtn = document.querySelectorAll('[data-modal]'),
      closeModalBtn = document.querySelector('[data-close]');
 
function openModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);
} 

openModalBtn.forEach(btn => {
  btn.addEventListener('click', openModal)
})

function closeModal() {
  modal.classList.add('hide'),
  modal.classList.remove('show');

  document.body.style.overflow = '';

}

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
 if(e.target === modal) {
  closeModal()
 }  
})  

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape'){
    closeModal()
  }
})

//Modal by scroll, timeout

const modalTimerId = setTimeout(openModal, 3000);

function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
  }
}
window.addEventListener('scroll', showModalByScroll);

//Menu rang

class MenuRang {
  constructor(src, alt, title, descr, price, parentSelector) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.parent = document.querySelector(parentSelector);
    this.course = 1.5;
    this.changeToUSD();

  }

  changeToUSD (){
    this.price = this.price * this.course;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = `
    <div class="menu__item">
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Price:</div>
        <div class="menu__item-total"><span>${this.price}</span> dollars/day</div>
      </div>
    </div>
    `;
    this.parent.append(element);

  }
}

new MenuRang(
  "img/tabs/vegy.jpg",
  "vegy",
  '"Fitness" menu',
  'The "Fitness" menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!',
  9,
  '.menu .container'
).render();


new MenuRang(
  "img/tabs/elite.jpg",
  "luxe", 
  '"Premium" menu',
  'The In the "Premium" menu we use not only beautiful exellent packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - a restaurant menu without going to a restaurant!',
  7,
  '.menu .container'
).render();

new MenuRang(
  "img/tabs/post.jpg",
  "post",
  '"Lenten" menu',
  'The "Lenten" menu is a careful selection of ingredients: a complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of proteins from tofu and imported vegetarian steaks.',
  8,
  '.menu .container'
).render();


         
});



