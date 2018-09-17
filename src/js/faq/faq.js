'use strict';
!(function() {
  var e = document.querySelector('.top-header-menu button'),
    t = document.querySelector('.top-header-menu ul'),
    n = document.querySelector('.top-header'),
    a = document.querySelector('.sections');
  e &&
    t &&
    (e.addEventListener('click', function(e) {
      e.stopPropagation(), t.classList.toggle('st-opened');
    }),
    t.addEventListener('click', function(e) {
      t.classList.remove('st-opened');
    }),
    n.addEventListener('click', function(e) {
      t.classList.remove('st-opened');
    }),
    a.addEventListener('click', function(e) {
      t.classList.remove('st-opened');
    }));
})();
var topHeader = document.querySelector('.top-header');
window.addEventListener('scroll', function() {
  var e = 0 - Math.min(20, window.scrollY);
  topHeader.style.top = e + 'px';
  var t = topHeader.classList.contains('st-scrolled');
  window.scrollY >= 20
    ? t || topHeader.classList.add('st-scrolled')
    : t && topHeader.classList.remove('st-scrolled');
});
var benefitsTabs = document.querySelector('.benefits');
if (benefitsTabs) {
  var hidePanes = function() {
      Array.from(benefitsTabs.querySelectorAll('.tab-pane')).forEach(function(
        e
      ) {
        e.classList.remove('show'), e.classList.remove('active');
      });
    },
    resetTabs = function() {
      Array.from(benefitsTabs.querySelectorAll('.nav-link')).forEach(function(
        e
      ) {
        e.classList.remove('active');
      });
    };
  benefitsTabs.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
      e.preventDefault();
      var t = e.target.getAttribute('href');
      hidePanes();
      var n = document.querySelector(t);
      n.classList.add('show'),
        n.classList.add('active'),
        resetTabs(),
        e.target.classList.add('active');
    }
  });
}
var area = document.querySelector('.accordion'),
  area1 = document.querySelector('.accordion1'),
  area2 = document.querySelector('.accordion2');
function lEL() {
  area.addEventListener('mouseup', l);
}
function lEL1() {
  area1.addEventListener('mouseup', l1);
}
function lEL2() {
  area2.addEventListener('mouseup', l2);
}
function l(e) {
  e.target.classList.contains('collapsed')
    ? setTimeout(function() {
        e.target.parentElement.parentElement.classList.add('line'),
          e.target.parentElement.parentElement.parentElement.classList.add(
            'border_click'
          ),
          e.target.classList.add('btn-link-color'),
          (e.target.nextElementSibling.className = 'minus');
      }, 50)
    : e.target.classList.contains('btn-link-color') &&
      setTimeout(function() {
        e.target.parentElement.parentElement.classList.remove('line'),
          e.target.parentElement.parentElement.parentElement.classList.remove(
            'border_click'
          ),
          e.target.classList.remove('btn-link-color'),
          (e.target.nextElementSibling.className = 'more');
      }, 200),
    e.preventDefault();
}
function l1(e) {
  e.target.classList.contains('collapsed')
    ? setTimeout(function() {
        e.target.parentElement.parentElement.classList.add('line'),
          e.target.parentElement.parentElement.parentElement.classList.add(
            'border_click'
          ),
          e.target.classList.add('btn-link-color'),
          (e.target.nextElementSibling.className = 'minus');
      }, 50)
    : e.target.classList.contains('btn-link-color') &&
      setTimeout(function() {
        e.target.parentElement.parentElement.classList.remove('line'),
          e.target.parentElement.parentElement.parentElement.classList.remove(
            'border_click'
          ),
          e.target.classList.remove('btn-link-color'),
          (e.target.nextElementSibling.className = 'more');
      }, 200),
    e.preventDefault();
}
function l2(e) {
  e.target.classList.contains('collapsed')
    ? setTimeout(function() {
        e.target.parentElement.parentElement.classList.add('line'),
          e.target.parentElement.parentElement.parentElement.classList.add(
            'border_click'
          ),
          e.target.classList.add('btn-link-color'),
          (e.target.nextElementSibling.className = 'minus');
      }, 50)
    : e.target.classList.contains('btn-link-color') &&
      setTimeout(function() {
        e.target.parentElement.parentElement.classList.remove('line'),
          e.target.parentElement.parentElement.parentElement.classList.remove(
            'border_click'
          ),
          e.target.classList.remove('btn-link-color'),
          (e.target.nextElementSibling.className = 'more');
      }, 200),
    e.preventDefault();
}
lEL(), lEL1(), lEL2();
