(() => {
  document.getElementById('success').addEventListener('click', () => {
    // document.querySelector('.rocket-status--success').classList.add('st-active');
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
})();
