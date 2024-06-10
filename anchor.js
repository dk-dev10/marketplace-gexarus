const anchors = document.querySelectorAll('[data-anchor]');

anchors.forEach((anchor) => {
  anchor.onclick = function (e) {
    e.preventDefault();
    document.querySelector(this.hash).scrollIntoView({
      behavior: 'smooth',
    });
  };
});
