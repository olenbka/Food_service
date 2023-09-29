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
      openModalBtn = document.querySelectorAll('[data-modal]');
 
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


modal.addEventListener('click', (e) => {
 if(e.target === modal || e.target.getAttribute('data-close') == '') {
  closeModal();
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
  constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.classes = classes,
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
    if (this.classes.length === 0){
      this.element = "menu__item";
      element.classList.add('menu__item');
    } else this.classes.forEach(className => { 
      element.classList.add(className);
    })
    
    element.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Price:</div>
        <div class="menu__item-total"><span>${this.price}</span> dollars/day</div>
      </div>
    `;
    this.parent.append(element);

  }
}

// async function getResource(url) {
//   try {
//     let res = await fetch(url);

//     if (!res.ok) {
//         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.log(error)
//   }
// }
axios.get('http://localhost:3000/menu')
.then(data => {
  data.data.forEach(({img, altimg, title, descr, price}) => {
      new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
  });
});

// getResource('http://localhost:3000/menu')
//         .then(data => {
//             data.forEach(({img, altimg, title, descr, price}) => {
//                 new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
//             });
//         });

// axios.get('http://localhost:3000/menu')
// .then(data => {
//   data.forEach(({img, altimg, title, descr, price }) => {
//     new MenuRang (img, altimg, title, descr, price, '.menu .container').render();
//   });
// })



//POST request
const forms = document.querySelectorAll('form');

const message = {
  loading: './img/forms/spinner.svg',
  success: "Your data has been sent successfully",
  failure: "Error sending data"
}

forms.forEach(item => {
  bindPostData(item);
})

const postData = async (url, data) => {
  let res = await fetch(url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: data
  });

  return await res.json();
};



function bindPostData (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  

    const loadMessage = document.createElement('img');
    loadMessage.src = message.loading;
    loadMessage.style.cssText = `
      display: block;
      margin: 0 Auto;
    `;      
    form.insertAdjacentElement('afterend', loadMessage);
    
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                loadMessage.remove();
            }).catch((e) => {
                console.log(e)
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

function showThanksModal(message) {
  const prevModalDialog = document.querySelector('.modal__dialog');
  prevModalDialog.classList.add('hide');
  

  const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;    

  document.querySelector('.modal').append(thanksModal);

  openModal();

  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add('.show');
    prevModalDialog.classList.remove('.hide');
    closeModal();
  }, 4000);
  
}

});





