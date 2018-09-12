/**
 * https://codepen.io/giana/pen/qbWNYy
 */

"use strict";

(function() {
  function maxOrbit(x, y) {
    const max = Math.max(x, y);
    return Math.round(Math.hypot(max, max)) / 2;
  }

  function random(min, max, seed = Math.random()) {
    if (arguments[1]  === undefined) {
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

  class Star {
    constructor({ size, maxStars, gradientCanvas, ctx }) {
      this.ctx = ctx;
      this.size = size;
      this.gradientCanvas = gradientCanvas;

      this.radiusSeed = Math.random();
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 50000;
      this.alpha = random(2, 10) / 10;
    }

    get orbitRadius() {
      return random(maxOrbit(this.size.width, this.size.height), undefined, this.radiusSeed);
    }

    get radius() {
      return random(60, this.orbitRadius, this.radiusSeed) / 12;
    }

    get orbitX() {
      return this.size.width / 2;
    }

    get orbitY() {
      return this.size.height / 2;
    }

    draw() {
      const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
      const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
      const twinkle = random(10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      this.ctx.globalAlpha = this.alpha;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      // this.ctx.fillRect(x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.ctx.drawImage(this.gradientCanvas, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    }
  }

  // Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
  // Cache gradient
  function initGradient(hue) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const half = 50;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);

    canvas.width = half * 2;
    canvas.height = half * 2;
    gradient.addColorStop(0.025, '#fff');
    gradient.addColorStop(0.1, `hsl(${hue}, 61%, 43%)`);
    gradient.addColorStop(0.25, `hsl(${hue}, 64%, 15%)`);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(half, half, half, 0, Math.PI * 2);
    ctx.fill();

    /* start: until google will fix chrome v69 perf */
    const img = new Image();
    img.src = canvas.toDataURL();
    /* end: until google will fix chrome v69 perf */

    return img;
  }

  function initCosmos(canvas, getSize) {
    const size = {};
    const onResize = () => {
      const newSize = getSize();
      size.width = newSize.width;
      size.height = newSize.height;
    };
    window.addEventListener('resize', onResize);
    onResize();

    const ctx = canvas.getContext('2d');

    const hue = 217;
    const stars = [];
    const count = 0;
    const maxStars = 800;
    const gradientCanvas = initGradient(hue);

    for (let i = 0; i < maxStars; i++) {
      stars.push(new Star({ size, maxStars, gradientCanvas, ctx }));
    }

    function animation() {
      ctx.globalCompositeOperation = 'source-over';
      canvas.width = size.width;
      canvas.height = size.height;
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = `hsla(${hue}, 64%, 6%, 1)`;
      ctx.fillRect(0, 0, size.width, size.height);

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      };

      setTimeout(() => window.requestAnimationFrame(animation), 1000 / 30);
    }

    animation();
  }

  window.initCosmos = initCosmos;
})();
