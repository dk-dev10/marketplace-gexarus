const anchors = document.querySelectorAll('[data-anchor]');

anchors.forEach((anchor) => {
  anchor.onclick = function (e) {
    console.log(e);
    goToAnchor(e, '', 'review-anchor');
  };
});

function goToAnchor(event, url, anchor) {
  event.preventDefault();
  window.location.href = url;
  window.onload = function () {
    window.location.hash = anchor;
    document.querySelector(anchor).scrollIntoView({
      behavior: 'smooth',
    });
  };
}
