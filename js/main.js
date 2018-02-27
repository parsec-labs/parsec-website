'use strict';

// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function noop() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = window.console = window.console || {};

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
})();

// Place any jQuery/helper plugins in here.
/**
 * https://codepen.io/giana/pen/qbWNYy
 */

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  function maxOrbit(x, y) {
    var max = Math.max(x, y);
    return Math.round(Math.hypot(max, max)) / 2;
  }

  function random(min, max) {
    var seed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.random();

    if (arguments[1] === undefined) {
      max = min;
      min = 0;
    }

    if (min > max) {
      var hold = max;
      max = min;
      min = hold;
    }

    return Math.floor(seed * (max - min + 1)) + min;
  }

  var Star = function () {
    function Star(_ref) {
      var size = _ref.size,
          maxStars = _ref.maxStars,
          gradientCanvas = _ref.gradientCanvas,
          ctx = _ref.ctx;

      _classCallCheck(this, Star);

      this.ctx = ctx;
      this.size = size;
      this.gradientCanvas = gradientCanvas;

      this.radiusSeed = Math.random();
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 50000;
      this.alpha = random(2, 10) / 10;
    }

    _createClass(Star, [{
      key: 'draw',
      value: function draw() {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        var twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        this.ctx.globalAlpha = this.alpha;
        this.ctx.drawImage(this.gradientCanvas, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
      }
    }, {
      key: 'orbitRadius',
      get: function get() {
        return random(maxOrbit(this.size.width, this.size.height), undefined, this.radiusSeed);
      }
    }, {
      key: 'radius',
      get: function get() {
        return random(60, this.orbitRadius, this.radiusSeed) / 12;
      }
    }, {
      key: 'orbitX',
      get: function get() {
        return this.size.width / 2;
      }
    }, {
      key: 'orbitY',
      get: function get() {
        return this.size.height / 2;
      }
    }]);

    return Star;
  }();

  // Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
  // Cache gradient


  function initGradient(hue) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var half = 50;
    var gradient = ctx.createRadialGradient(half, half, 0, half, half, half);

    canvas.width = half * 2;
    canvas.height = half * 2;
    gradient.addColorStop(0.025, '#fff');
    gradient.addColorStop(0.1, 'hsl(' + hue + ', 61%, 43%)');
    gradient.addColorStop(0.25, 'hsl(' + hue + ', 64%, 15%)');
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(half, half, half, 0, Math.PI * 2);
    ctx.fill();

    return canvas;
  }

  function initCosmos(canvas, getSize) {
    var size = {};
    var onResize = function onResize() {
      var newSize = getSize();
      size.width = newSize.width;
      size.height = newSize.height;
    };
    window.addEventListener('resize', onResize);
    onResize();

    var ctx = canvas.getContext('2d');

    var hue = 217;
    var stars = [];
    var count = 0;
    var maxStars = 800;
    var gradientCanvas = initGradient(hue);

    for (var i = 0; i < maxStars; i++) {
      stars.push(new Star({ size: size, maxStars: maxStars, gradientCanvas: gradientCanvas, ctx: ctx }));
    }

    function animation() {
      ctx.globalCompositeOperation = 'source-over';
      canvas.width = size.width;
      canvas.height = size.height;
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
      ctx.fillRect(0, 0, size.width, size.height);

      ctx.globalCompositeOperation = 'lighter';
      for (var _i = 1, l = stars.length; _i < l; _i++) {
        stars[_i].draw();
      };

      setTimeout(function () {
        return window.requestAnimationFrame(animation);
      }, 1000 / 30);
    }

    animation();
  }

  window.initCosmos = initCosmos;
})();
'use strict';

(function ($) {

  $(document).ready(function (e) {
    var inview = window.inView('section').on('enter', function (el) {
      return $(el).addClass('in-view');
    }).on('exit', function (el) {
      return $(el).removeClass('in-view');
    });
    window.inView.offset(250);

    function register($form) {
      $.ajax({
        type: "GET",
        url: $form.attr('action'),
        data: $form.serialize(),
        cache: false,
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
        beforeSend: function beforeSend() {
          $form.find('.alert').html('Subscribing...').show();
          $form.find('.email').hide();
          $form.find('.submit').hide();
          $form.find('.discount').hide();
        },
        error: function error(err) {
          $form.find('.alert').html('Ops, there was an error.').show();
          $form.find('.email').show();
          $form.find('.submit').show();
          $form.find('.discont').show();
        },
        success: function success(data) {
          if (data.result != "success") {
            $form.find('.alert').html(data.msg).show();
            $form.find('.email').show();
            $form.find('.submit').show();
            $form.find('.discont').show();
          } else {
            $form.find('.alert').html('Thank you!').show();
          }
        }
      });
    }

    // waits for form to appear rather than appending straight to the form. Also helps if you have more than one type of form that you want to use this action on.
    $(document).on('submit', '#mc-embedded-subscribe-form', function (event) {
      //define argument as the current form especially if you have more than one
      var $form = $(event.currentTarget);
      // stop open of new tab
      event.preventDefault();
      // submit form via ajax
      register($form);
    });
  });

  var header = document.querySelector('.header');
  window.initCosmos(header.querySelector('.header-bg'), function () {
    var rect = header.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  });

  var topHeader = document.querySelector('.top-header');
  window.addEventListener('scroll', function () {
    var topOffset = 0 - Math.min(20, window.scrollY);
    topHeader.style.top = topOffset + 'px';

    var scrolled = topHeader.classList.contains('st-scrolled');
    if (window.scrollY >= 20) {
      if (!scrolled) {
        topHeader.classList.add('st-scrolled');
      }
    } else if (scrolled) {
      topHeader.classList.remove('st-scrolled');
    }
  });
})(jQuery);