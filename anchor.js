document.addEventListener('productLoadedEvent', () => {
  if (window.location.hash) {
    const block = document.querySelector(window.location.hash);
    block.scrollIntoView({
      block: 'start',
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const anchors = document.querySelectorAll('[data-anchor]');

  anchors.forEach((anchor) => {
    anchor.onclick = function (e) {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    };
  });
});
