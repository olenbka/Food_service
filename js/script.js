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

const deadline = '2023-09-30';

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
 

});



