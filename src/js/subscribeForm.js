(function(){
  function buildRequestUrl(form) {
    const action = form.getAttribute('action');
    const formData = new FormData(form);
    const url = Array.from(formData.entries()).reduce(
      (memo, [key, value]) => (
        `${memo}&${key}=${encodeURIComponent(value)}`
      ),
      action
    );
    return `${url}&_=${Date.now()}`;
  }

  function register2(form) {
    const alertEl = form.querySelector('.alert');
    const emailEl = form.querySelector('.email');
    const submitEl = form.querySelector('.submit');

    // jsonp
    const callbackName = `antiJQuery_${Date.now()}`;
    const url = `${buildRequestUrl(form)}&c=${callbackName}`;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);

    alertEl.innerText = 'Subscribing...';
    emailEl.setAttribute('disabled', true);
    submitEl.setAttribute('disabled', true);

    // callback for jsonp
    window[callbackName] = (result) => {
      try {
        if (result.result !== 'success') {
          alertEl.innerHTML = result.msg;
          emailEl.removeAttribute('disabled');
          submitEl.removeAttribute('disabled');
          emailEl.style.display = 'block';
          submitEl.style.display = 'block';
        } else {
          alertEl.innerHTML = 'Thank you!';
        }
      } catch (err) {
        alertEl.innerHTML = 'Ops, there was an error.';
        emailEl.removeAttribute('disabled');
        submitEl.removeAttribute('disabled');
      }

      // cleaning up
      document.head.removeChild(script);
      window[callbackName] = undefined;
    }
  }

  const subscribeForm = document.getElementById('mc-embedded-subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', e => {
      e.preventDefault();
      register2(e.target);
    });
  }
})();
