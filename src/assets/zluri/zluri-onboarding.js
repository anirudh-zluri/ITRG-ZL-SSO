// Click-through for the Zluri setup wizard replica.
(function () {
  'use strict';

  var TOTAL = 3;
  var current = 1;

  function show(step) {
    current = Math.min(Math.max(step, 1), TOTAL);
    document.querySelectorAll('[data-step]').forEach(function (el) {
      el.hidden = Number(el.dataset.step) !== current;
    });
    var counter = document.querySelector('[data-step-counter]');
    if (counter) counter.textContent = 'Step ' + current + ' of ' + TOTAL;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('click', function (e) {
    var tile = e.target.closest('.steps__child2__box');
    if (tile) {
      tile.setAttribute('aria-pressed', tile.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      return;
    }
    var next = e.target.closest('[data-next]');
    if (next) {
      e.preventDefault();
      show(current + 1);
    }
  });

  show(1);
})();
