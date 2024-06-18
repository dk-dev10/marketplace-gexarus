document.addEventListener('productLoadedEvent', () => {
  if (window.location.hash) {
    anchorScrollTo(window.location.hash);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const anchors = document.querySelectorAll('[data-anchor]');

  anchors.forEach((anchor) => {
    anchor.onclick = function (e) {
      e.preventDefault();
      anchorScrollTo(this.hash);
    };
  });
});

function anchorScrollTo(hash) {
  document.querySelector(hash).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
