function AppCard(app, wrap) {
  const appCard = document.createElement('a');
  appCard.classList.add('card');
  appCard.setAttribute('href', 'appPage.html?id=' + app.id);

  const appCardHeader = document.createElement('div');
  appCardHeader.classList.add('card__header');

  const appCardSilderDots = document.createElement('div');
  appCardSilderDots.classList.add('dots');
  appCardSilderDots.setAttribute('id', 'slider__dots--container');

  const appCardContent = document.createElement('div');
  appCardContent.classList.add('card__content');

  // APP AUTHOR
  const appCardAuthor = document.createElement('div');
  appCardAuthor.classList.add('product__author');
  const appCardAuthotAvatar = document.createElement('div');
  appCardAuthotAvatar.classList.add('product__author__avatar');
  const appCardAuthorAvatarImg = document.createElement('img');
  appCardAuthorAvatarImg.src = api + app.author.avatar;
  const appCardAuthorName = document.createElement('p');
  appCardAuthorName.textContent = app.author.name;
  appCardAuthorName.classList.add('product__author__name');
  appCardAuthotAvatar.appendChild(appCardAuthorAvatarImg);
  appCardAuthor.appendChild(appCardAuthotAvatar);
  appCardAuthor.appendChild(appCardAuthorName);

  // APP DETAILS
  const appCardDetails = document.createElement('div');
  appCardDetails.classList.add('product__details');

  const appCardDetailsHeader = document.createElement('div');
  appCardDetailsHeader.classList.add('product__details__header');

  const appCardDetailsTitle = document.createElement('h2');
  appCardDetailsTitle.classList.add('product__title');
  appCardDetailsTitle.textContent = app.title;

  const appCardDetailsPrice = document.createElement('span');
  appCardDetailsPrice.classList.add('product__price');
  appCardDetailsPrice.textContent = app.price;

  appCardDetailsHeader.appendChild(appCardDetailsTitle);
  appCardDetailsHeader.appendChild(appCardDetailsPrice);

  appCardDetails.appendChild(appCardDetailsHeader);

  // APP INSTALLERS
  const appContentFooter = document.createElement('div');
  appContentFooter.classList.add('card__content--footer');

  const appContentFooterBtnComment = document.createElement('a');
  appContentFooterBtnComment.classList.add(
    'card__content--btn',
    'tooltip__wrapper'
  );
  appContentFooterBtnComment.setAttribute('data-anchor', '');
  appContentFooterBtnComment.setAttribute(
    'href',
    `/appPage.html?id=${app.id}#review-anchor`
  );

  const appContentFooterBtnCommentTooltip = document.createElement('span');
  appContentFooterBtnCommentTooltip.classList.add('tooltip__content');
  appContentFooterBtnCommentTooltip.textContent = 'Читать отзывы';

  const appContentFooterBtn = document.createElement('button');
  appContentFooterBtn.classList.add('card__content--btn', 'tooltip__wrapper');
  appContentFooterBtn.setAttribute('data-buttonmodalname', 'installmodal');
  const appContentFooterBtnTooltip = document.createElement('span');
  appContentFooterBtnTooltip.classList.add('tooltip__content');
  appContentFooterBtnTooltip.textContent = 'Установить';

  appContentFooterBtn.addEventListener('click', () => {
    openModalInstall({
      data: app,
      modalName: 'installmodal',
    });
  });

  const appContentFooterCommentBtnSvg = `<svg width="22" height="22" fill='currentColor' >
                    <use
                      xlink:href="assets/icons/comment.svg#iconComment"
                    ></use>
                  </svg>`;
  const commentBtn = document.createElement('div');
  commentBtn.innerHTML = appContentFooterCommentBtnSvg;
  appContentFooterBtnComment.appendChild(commentBtn.firstChild);
  appContentFooterBtnComment.appendChild(appContentFooterBtnCommentTooltip);

  const appContentFooterBtnSvg = `<svg
  width="20"
  height="18"
  viewBox="0 0 20 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M9.99995 12.5L4 6.49999H7.99995V1H12V6.49999H16L9.99995 12.5Z"
    fill="#474D64"
    stroke="#474D64"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M19 16.5H1"
    stroke="#474D64"
    stroke-width="2"
    stroke-linecap="round"
  />
</svg>`;
  const tempBtn = document.createElement('div');
  tempBtn.innerHTML = appContentFooterBtnSvg;
  appContentFooterBtn.appendChild(tempBtn.firstChild);
  appContentFooterBtn.appendChild(appContentFooterBtnTooltip);

  appContentFooter.appendChild(appContentFooterBtnComment);
  appContentFooter.appendChild(appContentFooterBtn);

  // APP FAVORITE LABEL
  const appCardLabel = document.createElement('label');
  appCardLabel.classList.add('card__favorite__checkbox');
  const appCardLabelInput = document.createElement('input');
  appCardLabelInput.type = 'checkbox';
  appCardLabelInput.checked = app.favourite;

  appCardLabelInput.onclick = () => {
    fetch(`${api}/api/AppStore/favourites/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: app.id,
        status: +appCardLabelInput.checked,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error));
  };

  const appCardLabelSvg = `<svg
  width="20"
  height="20"
  viewBox="0 0 22 18"
  stroke="currentColor"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6.5 1C3.46244 1 1 3.46245 1 6.5C1 12 7.5 17 11 18.1631C14.5 17 21 12 21 6.5C21 3.46245 18.5375 1 15.5 1C13.6398 1 11.9953 1.92345 11 3.3369C10.0047 1.92345 8.36015 1 6.5 1Z"
  />
</svg>`;

  appCardLabel.appendChild(appCardLabelInput);

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = appCardLabelSvg;
  appCardLabel.appendChild(tempDiv.firstChild);

  appCardHeader.appendChild(appCardLabel);

  CreateSliderWrapper(app.files, appCardHeader, appCardSilderDots);
  appCard.appendChild(appCardHeader);
  appCard.appendChild(appCardSilderDots);
  appCardContent.appendChild(appCardAuthor);
  appCardContent.appendChild(appCardDetails);
  appCardContent.appendChild(appContentFooter);
  appCard.appendChild(appCardContent);
  wrap.appendChild(appCard);
}
