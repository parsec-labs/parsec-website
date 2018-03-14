(() => {
  const promoForm = document.querySelector('.promo-form');
  const submitButton = promoForm.querySelector('.button[type=submit]');
  promoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (promoForm.querySelector('.row[data-error]')) {
      return;
    }

    const formData = new FormData(e.target);

    submitButton.setAttribute('disabled', true);
    window.requestApi('post', 'submit', {
      email: formData.get('email'),
      promoCode: formData.get('promoCode'),
    }).then(
      () => {
        document.querySelector('.promo-form__content').dataset.mode = 'timer';
        document.querySelector('.intro p').innerHTML = `<strong>Thank you!</strong><br /> Some really motivational text goes here`;
        window.launchRocket();
      },
      ({ errors }) => {
        Object.keys(errors).forEach((key) => {
          const input = promoForm.querySelector(`[name="${key}"]`);
          if (input && input.parentNode) {
            input.parentNode.dataset.error = errors[key];
          }
        })
        document.querySelector('.rocket-status--fail').classList.add('st-active');
      }
    ).then(() => {
      submitButton.removeAttribute('disabled');
    });
  });

  promoForm.addEventListener('change', () => {
    document.querySelector('.rocket-status--fail').classList.remove('st-active');
    Array.from(promoForm.querySelectorAll('.row')).forEach((row) => {
      delete row.dataset.error;
    });
  });

  Array.from(document.querySelectorAll('.timer')).forEach(window.initTimer);
})();
