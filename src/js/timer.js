(() => {
  const addTimerPart = (n, labels) => `
<span class="timer__part">
  ${String(n).padStart(2, '0')} <span>${labels[n === 1 ? 0 : 1]}</span>
</span>`.trim();

  window.initTimer = (timerNode) => {
    setInterval(() => {
      if (timerNode.dataset) {
        const until = Number(timerNode.dataset.until);
        const total = until - Math.round(Date.now() / 1000);

        const html = [
          addTimerPart(
            Math.floor(total / (3600 * 24)),
            ['day', 'days']
          ),
          addTimerPart(
            Math.floor((total % (3600 * 24)) / 3600),
            ['hour', 'hours']
          ),
          addTimerPart(
            Math.floor((total % (3600)) / 60),
            ['minute', 'minutes']
          ),
          addTimerPart(
            total % 60,
            ['second', 'seconds']
          ),
        ].join('');
        timerNode.innerHTML = html;
      }
    }, 1000);
  };
})();
