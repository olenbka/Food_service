window.addEventListener('DOMContentLoaded', function() {
  const tabs = require('./modules/tabs'),
        calc = require('./modules/calc'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        slider = require('./modules/slider');
  
  tabs();
  calc();
  cards();
  forms();
  modal();
  timer();
  slider();

});
