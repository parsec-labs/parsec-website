'use strict';

(function () {
  var cx = function cx(cl) {
    return ['.rocket-scene', cl].filter(function (a) {
      return a;
    }).join('__');
  };
  var root = document.querySelector(cx());

  var takeoff = root.querySelector(cx('takeoff'));
  var stars2 = root.querySelector(cx('stars2'));

  function run() {
    var tl = new TimelineMax({});
    takeoff.style.opacity = '1';
    stars2.style.opacity = '1';
    tl.addLabel('start', 10).add(TweenMax.from(cx('takeoff'), 0.5, { scaleY: 0, y: -200, ease: Expo.easeInOut })).add(TweenMax.to(cx('rocket'), 1, { className: "+=st-shake", delay: -1 })).add(TweenMax.to(cx('smoke'), 2, { y: -50, delay: 1 })).add(TweenMax.to(cx('rocket'), 1, { className: "-=st-shake" })).add(TweenMax.to(cx('rocket'), 1, { y: -300, delay: -1 })).add(TweenMax.to(cx('takeoff'), 1, { y: -300, delay: -1 })).add(TweenMax.to(cx('smoke'), 3, { scale: 1, y: -20, delay: -0.8 })).add(TweenMax.to('.rocket-status--success', 3, { className: "+=st-active", delay: -2.2 })).add(TweenMax.to(cx('rocket'), 1, { y: -10, rotate: 40, delay: -3 })).add(TweenMax.to(cx('takeoff'), 0.2, { opacity: 0, delay: -3 })).add(TweenMax.to(cx('stars'), 0.2, { opacity: 0, delay: -3 })).add(TweenMax.from(cx('stars2'), 0.2, { opacity: 0, delay: -3 })).add(TweenMax.to(cx(), 0.2, { rotation: 40, delay: -3 })).add(TweenMax.to(cx('smoke'), 0.2, { opacity: 0 })).add(TweenMax.to('.rocket-status--success', 0.3, { opacity: 0, delay: -0.5 }));
  }

  window.launchRocket = run;
})();
'use strict';

(function () {
  var addTimerPart = function addTimerPart(n, labels) {
    return ('\n<span class="timer__part">\n  ' + String(n).padStart(2, '0') + ' <span>' + labels[n === 1 ? 0 : 1] + '</span>\n</span>').trim();
  };

  window.initTimer = function (timerNode) {
    setInterval(function () {
      if (timerNode.dataset) {
        var until = Number(timerNode.dataset.until);
        var total = until - Math.round(Date.now() / 1000);

        var html = [addTimerPart(Math.floor(total / (3600 * 24)), ['day', 'days']), addTimerPart(Math.floor(total % (3600 * 24) / 3600), ['hour', 'hours']), addTimerPart(Math.floor(total % 3600 / 60), ['minute', 'minutes']), addTimerPart(total % 60, ['second', 'seconds'])].join('');
        timerNode.innerHTML = html;
      }
    }, 1000);
  };
})();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var RequestError = function (_Error) {
    _inherits(RequestError, _Error);

    function RequestError(response) {
      _classCallCheck(this, RequestError);

      var _this = _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).call(this, response.statusText));

      _this.status = response.status;
      _this.response = response;
      return _this;
    }

    return RequestError;
  }(Error);

  var requestApi = function requestApi(apiUrl) {
    return function (method, path, params) {
      var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var options = {
        method: method,
        headers: Object.assign({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }, headers),
        body: params && JSON.stringify(params)
      };

      return fetch(apiUrl + '/' + path, options).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        if (response.status < 500) {
          return Promise.reject(new RequestError(response));
        }

        return Promise.reject('Server error');
      }).then(function (json) {
        if (json.status && json.status === 'error') {
          throw json;
        }
        return json;
      });
    };
  };

  window.requestApi = requestApi('https://sarrsmlpsg.execute-api.eu-west-1.amazonaws.com/v0');
})();
'use strict';

(function () {
  var promoForm = document.querySelector('.promo-form');
  var submitButton = promoForm.querySelector('.button[type=submit]');
  promoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (promoForm.querySelector('.row[data-error]')) {
      return;
    }

    var formData = new FormData(e.target);

    submitButton.setAttribute('disabled', true);
    window.requestApi('post', 'submit', {
      email: formData.get('email'),
      promoCode: formData.get('promoCode')
    }).then(function () {
      document.querySelector('.promo-form__content').dataset.mode = 'timer';
      document.querySelector('.intro p').innerHTML = '<strong>Thank you!</strong><br /> Some really motivational text goes here';
      window.launchRocket();
    }, function (_ref) {
      var errors = _ref.errors;

      Object.keys(errors).forEach(function (key) {
        var input = promoForm.querySelector('[name="' + key + '"]');
        if (input && input.parentNode) {
          input.parentNode.dataset.error = errors[key];
        }
      });
      document.querySelector('.rocket-status--fail').classList.add('st-active');
    }).then(function () {
      submitButton.removeAttribute('disabled');
    });
  });

  promoForm.addEventListener('change', function () {
    document.querySelector('.rocket-status--fail').classList.remove('st-active');
    Array.from(promoForm.querySelectorAll('.row')).forEach(function (row) {
      delete row.dataset.error;
    });
  });

  Array.from(document.querySelectorAll('.timer')).forEach(window.initTimer);
})();