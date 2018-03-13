(() => {
  const cx = (cl) => ['.rocket-scene', cl].filter(a => a).join('__');
  const root = document.querySelector(cx());

  const takeoff = root.querySelector(cx('takeoff'));
  const stars2 = root.querySelector(cx('stars2'));

  function run() {
    var tl = new TimelineMax({});
    takeoff.style.opacity = '1';
    stars2.style.opacity = '1';
    tl
      .addLabel('start', 10)
      .add(TweenMax.from(cx('takeoff'), 0.5, { scaleY:0, y: -200, ease:Expo.easeInOut }))
      .add(TweenMax.to(cx('rocket'), 1, { className:"+=st-shake", delay:-1 }))
      .add(TweenMax.to(cx('smoke'), 2, { y: -50, delay: 1 }))
      .add(TweenMax.to(cx('rocket'), 1, { className: "-=st-shake" }))
      .add(TweenMax.to(cx('rocket'), 1, { y: -300, delay:-1 }))
      .add(TweenMax.to(cx('takeoff'), 1, { y: -300, delay:-1 }))
      .add(TweenMax.to(cx('smoke'), 3, { scale: 1, y: -20, delay: -0.8 }))
      .add(TweenMax.to('.rocket-status--success', 3, { className: "+=st-active", delay: -2.2 }))
      .add(TweenMax.to(cx('rocket'), 1, { y: -10, rotate: 40, delay: -3 }))
      .add(TweenMax.to(cx('takeoff'), 0.2, { opacity: 0, delay: -3 }))
      .add(TweenMax.to(cx('stars'), 0.2, { opacity: 0, delay: -3 }))
      .add(TweenMax.from(cx('stars2'), 0.2, { opacity: 0, delay: -3 }))
      .add(TweenMax.to(cx(), 0.2, { rotation: 40, delay: -3 }))
      .add(TweenMax.to(cx('smoke'), 0.2, { opacity: 0 }))
      .add(TweenMax.to('.rocket-status--success', 0.3, { opacity: 0, delay: -0.5 }))
  }

  window.launchRocket = run;
})();
