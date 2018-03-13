(() => {
  document.getElementById('success').addEventListener('click', () => {
    document.querySelector('.promo-form__content').dataset.mode = 'timer';
    document.querySelector('.intro p').innerHTML = `<strong>thank you!</strong><br /> some really motivational text goes here`;
    window.launchRocket();
  });

  document.getElementById('fail').addEventListener('click', () => {
    const fail = document.querySelector('.rocket-status--fail');
    if (fail.classList.contains('st-active')) {
      document.querySelector('.rocket-status--fail').classList.remove('st-active');
    } else {
      document.querySelector('.rocket-status--fail').classList.add('st-active');
    }
  });

  Array.from(document.querySelectorAll('.timer')).forEach(window.initTimer);
})();
