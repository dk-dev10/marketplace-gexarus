let productData = {};

const toggleFavourite = document.querySelector(
  '.card__favorite__checkbox input'
);

toggleFavourite.addEventListener('click', (e) => {
  const res = e.target.checked ? 1 : 0;
  fetch(`${api}/api/AppStore/favourites/action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: productData.id,
      status: res,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', () => {
  const api = 'https://gexarus.com';

  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');

  console.log(id);

  fetch(`${api}/api/AppStore/item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      productData = data.data;
      setProduct(data.data);
    })
    .catch((error) => console.error('Error:', error));

  function setProduct(product) {
    const productTitle = document.querySelector('.product__page__title');
    const productPrice = document.querySelectorAll('.price');
    const productAuthorName = document.querySelector('.product__author__name');
    const productAuthorAVatar = document.querySelector(
      '.product__author__avatar img'
    );
    const productFavourite = document.querySelector(
      '.card__favorite__checkbox input'
    );
    const productDescription = document.querySelector(
      '.product__page__description'
    );

    const productSummaryRating = document.querySelector(
      '.review__card--block h1'
    );

    const ratingCount = document.querySelector('.rating__count');
    const reviewMessage = document.querySelector('.review__messages');
    const reviewCardStarRating = document.querySelector(
      '.review__card .star__rating'
    );

    const productSliderParent = document.querySelector(
      '.product__slider--wrapper'
    );
    const productSliderDotsParent = document.querySelector(
      '#slider__dots--container'
    );

    CreateSliderWrapper(
      product.files,
      productSliderParent,
      productSliderDotsParent
    );

    product.rating.list.forEach((msg) =>
      setMessage(msg, reviewMessage, product.rating.average)
    );

    const resultArr = setMessageRating(product.rating.average);
    setMessageAvrageRating(resultArr, reviewCardStarRating);

    productTitle.textContent = product.title;
    productPrice.forEach((pr) => (pr.textContent = product.price));
    productAuthorName.textContent = product.author.name;
    productAuthorAVatar.setAttribute('src', api + product.author.avatar);
    productFavourite.checked = product.favourite;
    productDescription.textContent =
      product.description.length > 0 ? product.description : 'No description';

    productSummaryRating.textContent = product.rating.average;

    const reviewCardProgressbarFill = document.querySelectorAll(
      '.review__card .review__card--progressbar .progress__bar-fill'
    );
    const reviewCardProgressbarPercentage = document.querySelectorAll(
      '.review__card .review__card--progressbar .progressbar__percent'
    );

    reviewCardProgressbarFill.forEach((item, idx) => {
      const reverseProgressFill = product.rating.distribution.reverse();
      item.style.width = `${reverseProgressFill[idx].percentage}%`;
      const percentageText = document.createElement('p');
      const percentage = document.createTextNode(
        `${reverseProgressFill[idx].percentage}%`
      );
      const count = document.createElement('span');
      count.textContent = `(${reverseProgressFill[idx].count})`;
      percentageText.appendChild(percentage);
      percentageText.appendChild(count);
      reviewCardProgressbarPercentage[idx].appendChild(percentage);
      reviewCardProgressbarPercentage[idx].appendChild(count);
    });

    ratingCount.textContent = `(${product.rating.list.length})`;
  }
});

function setMessageAvrageRating(arr, wrapper) {
  wrapper.innerHTML = '';
  arr.forEach((item) => {
    const fullSvg = `<svg width="20" height="19" fill="none">
    <use xlink:href="#iconMessageRatingStar"></use>
    </svg>`;
    const full = document.createElement('div');
    full.innerHTML = fullSvg;
    const halfSvg = `<svg width="20" height="19" fill="none">
    <use xlink:href="#iconMessageRatingStarHalf"></use>
    </svg>`;
    const half = document.createElement('div');
    half.innerHTML = halfSvg;
    const emptySvg = `<svg width="20" height="19" fill="none">
      <use xlink:href="#iconMessageRatingStarEmpty"></use>
      </svg>`;
    const empty = document.createElement('div');
    empty.innerHTML = emptySvg;
    const span = document.createElement('span');
    span.appendChild(
      item === 1
        ? full.firstChild
        : item === 0
        ? half.firstChild
        : empty.firstChild
    );
    wrapper.appendChild(span);
  });
}

function setMessage(message, reviewMessage) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('review__message');
  const messageHeaderDiv = document.createElement('div');
  messageHeaderDiv.classList.add('message__header');
  const messageHeaderAvatarDiv = document.createElement('div');
  messageHeaderAvatarDiv.classList.add('message__avatar');
  const messageHeaderAvatarImg = document.createElement('img');
  messageHeaderAvatarImg.setAttribute('src', api + message.user_photo);
  messageHeaderAvatarDiv.appendChild(messageHeaderAvatarImg);
  const messageHeaderDetailsDiv = document.createElement('div');
  messageHeaderDetailsDiv.classList.add('message__header--details');
  const messageAuthorH3 = document.createElement('h3');
  messageAuthorH3.classList.add('message__author');
  const authorName = document.createTextNode(message.user_name);
  const messageAuthorDateSpan = document.createElement('span');
  messageAuthorDateSpan.textContent = formatDate(message.review_date);
  messageAuthorH3.appendChild(authorName);
  messageAuthorH3.appendChild(messageAuthorDateSpan);
  const messageAuthorReviewStarsDiv = document.createElement('div');
  messageAuthorReviewStarsDiv.classList.add('author__review--stars');

  const messageText = document.createElement('p');
  messageText.classList.add('message__text');
  messageText.textContent = message.review_comment;

  setMessageRating(message.review_rating).forEach((star) => {
    const messageRatingSpan = document.createElement('span');
    messageRatingSpan.classList.add('progressbar__star');
    const messageStarEmpty = `<svg width="15" height="15" fill="none">
    <use xlink:href="#iconSmallEmptyStar"></use>
  </svg>`;
    const messageStar = `<svg width="15" height="15" fill="none">
    <use xlink:href="#iconSmallFillStar"></use>
  </svg>`;

    if (star === 1) {
      messageRatingSpan.innerHTML = messageStar;
    } else {
      messageRatingSpan.innerHTML = messageStarEmpty;
    }

    messageAuthorReviewStarsDiv.appendChild(messageRatingSpan);
  });

  messageHeaderDetailsDiv.appendChild(messageAuthorH3);
  messageHeaderDetailsDiv.appendChild(messageAuthorReviewStarsDiv);
  messageHeaderAvatarDiv.appendChild(messageHeaderAvatarImg);
  messageHeaderDiv.appendChild(messageHeaderAvatarDiv);
  messageHeaderDiv.appendChild(messageHeaderDetailsDiv);
  messageDiv.appendChild(messageHeaderDiv);
  messageDiv.appendChild(messageText);
  reviewMessage.appendChild(messageDiv);
}

function setMessageRating(rating) {
  const arr = [0, 0, 0, 0, 0];
  return arr.map((_, index) => {
    return rating >= index + 1
      ? 1
      : rating >= index && !Number.isInteger(rating)
      ? 0
      : -1;
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
}
