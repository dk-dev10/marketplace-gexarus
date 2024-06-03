const productsWrapper = document.querySelector('.products__wrapper');

const products = [
  {
    favourite: false,
    title: 'Интернет магазин в телеграм',
    price: 'Бесплатно',
    description:
      'При помощи этого бота ты можешь принимать сообщения на номера, тем самым регистрироваться на разных сайтах и соц.сетях тем самым регистрироваться на разных сайтах и соц.сетях',
    images: [
      'https://s3-alpha-sig.figma.com/img/13f3/b989/f9d7d718dc5096e1d7cd9db46301776e?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nP1jc7HWaSuNakLcbvSW-PmyT8RdNJijjtK9kxANJHUhrFTHKIO5X81cjf1FFBXYTiazEXi2kHFzIOP94uwMGdl5HlZY9cROuZbUHzytRCZt36jWdHL7FT4u4iQu75M4HfHCO3nu6v7Aee4vhsDyD72SztDg6RF8oC-oKijKCz0k-74keKVK~107U~k7fmjhJ-YlyenfB72XMdF5jqD4GsXAznyrhhsSP8BWaeraKzmXV16Ebxx7SfVPBHjv31DmOpcofjUhrtn6j6TFoEA2RN5nGuiidsAN7Ahe3m3hzhNGzOudtJ-KsyGrl-JRGtMUJd7-KR~PYYBuIrb3oV8IOQ__',
      'https://s3-alpha-sig.figma.com/img/5983/ec90/c6c2a5c760ef4790e2e8e2146485d690?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T074TH5RYS5Iavtx-B9gJpnh~~k5DEDZAVZpcf57T0KdebAh7buxR20mUAqacpFE4dPwLAY7bJZL2eVvCaTNOFuZ-s4GZ6htoDHppp5mwJeUXwwe~vHq~sKNRwZvuQuckXaAX3GbK1nHcrxYHOcqJO54sgani2efdU1KuJucjcUWnsS8OatJFdt~PPLQmIXIyuZz4rEJsrSaPnksYZ~0vTTyhA2pgQyttVPteJjqNyNhiA~wznPeYHuiNcEr~MRmW9fh4cjnTs8wC7bY1TRy7m-7AoYul3gr7c7pfjWzMwh0BbCxRxZ6h9op1VRyhRYw1Rd6FTCr-a-YuwVcv7dpZQ__',
      'https://s3-alpha-sig.figma.com/img/00be/a5b3/075d057624712156629b3bf0bcf29b1b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SmXaIU-vKnv~mLrlpCv8sHcwU13J8WtlrJiKR0cFl5ERHNl-Qr08ZCU6pTq9GhfewMRV~xCkYjnYf10YPpxx4dmcmXim~gRTmYbiXJ5EW2N6cTFVDy6qyptrEKsDngW1~v6vpT00~izsyV7TkO4U7-TdWgVpyrNZmtgrD8N2Otn9~t24qbYNT9Q6Jxu7RN4lWwOtEWxegzQICGM4GZx278GMX4Fxt5wE~iW-FSwVsIboInWQ-fVobd5823SCCfEtsyk6EdpN96jzIoRS2jBgJf3178d2G~GSGdhvFn4cfdXuw9p2yIbkTXmK9~uxJZtaYpEj8dNlYGagP81T1jIg4g__',
    ],
    installers: [
      {
        type: 'img',
        img: 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
      },
      {
        type: 'img',
        img: 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
      },
      {
        type: 'text',
        text: '+3',
      },
    ],
    author: {
      avatar:
        'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
      name: 'Александр',
    },
  },
  {
    favorite: true,
    title: 'Бот для регистрации',
    price: '5 000 ₽',
    description:
      'Не надо привязывать карту Безлимитное количество подписчиков и заказов',
    images: [
      'https://s3-alpha-sig.figma.com/img/13f3/b989/f9d7d718dc5096e1d7cd9db46301776e?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nP1jc7HWaSuNakLcbvSW-PmyT8RdNJijjtK9kxANJHUhrFTHKIO5X81cjf1FFBXYTiazEXi2kHFzIOP94uwMGdl5HlZY9cROuZbUHzytRCZt36jWdHL7FT4u4iQu75M4HfHCO3nu6v7Aee4vhsDyD72SztDg6RF8oC-oKijKCz0k-74keKVK~107U~k7fmjhJ-YlyenfB72XMdF5jqD4GsXAznyrhhsSP8BWaeraKzmXV16Ebxx7SfVPBHjv31DmOpcofjUhrtn6j6TFoEA2RN5nGuiidsAN7Ahe3m3hzhNGzOudtJ-KsyGrl-JRGtMUJd7-KR~PYYBuIrb3oV8IOQ__',
      'https://s3-alpha-sig.figma.com/img/5983/ec90/c6c2a5c760ef4790e2e8e2146485d690?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T074TH5RYS5Iavtx-B9gJpnh~~k5DEDZAVZpcf57T0KdebAh7buxR20mUAqacpFE4dPwLAY7bJZL2eVvCaTNOFuZ-s4GZ6htoDHppp5mwJeUXwwe~vHq~sKNRwZvuQuckXaAX3GbK1nHcrxYHOcqJO54sgani2efdU1KuJucjcUWnsS8OatJFdt~PPLQmIXIyuZz4rEJsrSaPnksYZ~0vTTyhA2pgQyttVPteJjqNyNhiA~wznPeYHuiNcEr~MRmW9fh4cjnTs8wC7bY1TRy7m-7AoYul3gr7c7pfjWzMwh0BbCxRxZ6h9op1VRyhRYw1Rd6FTCr-a-YuwVcv7dpZQ__',
      'https://s3-alpha-sig.figma.com/img/00be/a5b3/075d057624712156629b3bf0bcf29b1b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SmXaIU-vKnv~mLrlpCv8sHcwU13J8WtlrJiKR0cFl5ERHNl-Qr08ZCU6pTq9GhfewMRV~xCkYjnYf10YPpxx4dmcmXim~gRTmYbiXJ5EW2N6cTFVDy6qyptrEKsDngW1~v6vpT00~izsyV7TkO4U7-TdWgVpyrNZmtgrD8N2Otn9~t24qbYNT9Q6Jxu7RN4lWwOtEWxegzQICGM4GZx278GMX4Fxt5wE~iW-FSwVsIboInWQ-fVobd5823SCCfEtsyk6EdpN96jzIoRS2jBgJf3178d2G~GSGdhvFn4cfdXuw9p2yIbkTXmK9~uxJZtaYpEj8dNlYGagP81T1jIg4g__',
    ],
    installers: [],
    author: {
      avatar:
        'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
      name: 'Иван Иванов',
    },
  },
  {
    favorite: true,
    title: 'Читы для регистрации в CS:2',
    price: '13 000 ₽',
    description:
      'Не надо привязывать карту Безлимитное количество подписчиков и заказов',
    images: [
      'https://s3-alpha-sig.figma.com/img/6455/32a6/74ce733548f843dd1f278ad9145c4d91?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pJvZqs50yiSlX6EFKYJXs4lCj2lExbCQh-bwyPIIt5Kju4ep0XMLYi3szyMyTFyGi10-lH-MpuFt6l9chQ7VSQZP4LNoW0db0o4jKIxhT22MAQe~bXzQhCS4I41PdXCF6R2EqvmzSdSbiUD~IxqCYolpZgNU5gjvhOFK17i7IHwM4qnQMyV7htxZln0XQQWc8puwIY1dJSVVBOubbC3DZuxHDbL38-IT0yTnGP0~Ylq-dLcYDECXPR6X1vkLTDl2~6adf~hRL6-o0F9JZFhSwYq5qpmM1TYghD70d344pVHoreazdZ~b9MB2Vkj4PoKtRDnXIdlezP09T4kkaXxHjg__',
    ],
    installers: [],
    author: {
      avatar:
        'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
      name: 'Иван Иванов',
    },
  },
];

function createProduct(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('card');

  const productCardHeader = document.createElement('div');
  productCardHeader.classList.add('card__header');

  const productCardSilderDots = document.createElement('div');
  productCardSilderDots.classList.add('dots');
  productCardSilderDots.setAttribute('id', 'slider__dots--container');

  const productCardContent = document.createElement('div');
  productCardContent.classList.add('card__content');

  // PRODUCT AUTHOR
  const productCardAuthor = document.createElement('div');
  productCardAuthor.classList.add('product__author');
  const productCardAuthotAvatar = document.createElement('div');
  productCardAuthotAvatar.classList.add('product__author__avatar');
  const productCardAuthorAvatarImg = document.createElement('img');
  productCardAuthorAvatarImg.src = product.author.avatar;
  const productCardAuthorName = document.createElement('p');
  productCardAuthorName.textContent = product.author.name;
  productCardAuthorName.classList.add('product__author__name');
  productCardAuthotAvatar.appendChild(productCardAuthorAvatarImg);
  productCardAuthor.appendChild(productCardAuthotAvatar);
  productCardAuthor.appendChild(productCardAuthorName);

  // PRODUCT DETAILS
  const productCardDetails = document.createElement('div');
  productCardDetails.classList.add('product__details');

  const productCardDetailsHeader = document.createElement('div');
  productCardDetailsHeader.classList.add('product__details__header');

  const productCardDetailsTitle = document.createElement('h2');
  productCardDetailsTitle.classList.add('product__title');
  productCardDetailsTitle.textContent = product.title;

  const productCardDetailsPrice = document.createElement('span');
  productCardDetailsPrice.classList.add('product__price');
  productCardDetailsPrice.textContent = product.price;

  productCardDetailsHeader.appendChild(productCardDetailsTitle);
  productCardDetailsHeader.appendChild(productCardDetailsPrice);

  const productCardDetailsDescription = document.createElement('p');
  productCardDetailsDescription.classList.add('product__description');
  productCardDetailsDescription.textContent = product.description;

  productCardDetails.appendChild(productCardDetailsHeader);
  productCardDetails.appendChild(productCardDetailsDescription);

  // PRODUCT INSTALLERS
  const productContentFooter = document.createElement('div');
  productContentFooter.classList.add('card__content--footer');

  const productCardInstalled = document.createElement('div');
  productCardInstalled.classList.add('card__installed__product');

  const productCardInstallersAvatars = document.createElement('div');
  productCardInstallersAvatars.classList.add('installers__avatars');

  product.installers.forEach((installer) => {
    const installerContainer = document.createElement('div');
    installerContainer.classList.add('installer__avatar');

    if (installer.type === 'img') {
      const installerContainerAvatar = document.createElement('img');
      installerContainerAvatar.src = installer.img;

      installerContainer.appendChild(installerContainerAvatar);
    } else {
      const installerContainerText = document.createElement('p');
      installerContainerText.textContent = installer.text;

      installerContainer.appendChild(installerContainerText);
    }

    productCardInstallersAvatars.appendChild(installerContainer);
  });

  const productContentFooterBtn = document.createElement('button');
  productContentFooterBtn.classList.add('card__content--btn');
  const productContentFooterBtnSvg = `<svg
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
  tempBtn.innerHTML = productContentFooterBtnSvg;
  productContentFooterBtn.appendChild(tempBtn.firstChild);

  productContentFooter.appendChild(productCardInstallersAvatars);
  productContentFooter.appendChild(productContentFooterBtn);

  // PRODUCT FAVORITE LABEL
  const productCardLabel = document.createElement('label');
  productCardLabel.classList.add('card__favorite__checkbox');
  const productCardLabelInput = document.createElement('input');
  productCardLabelInput.type = 'checkbox';
  productCardLabelInput.checked = product.favorite;

  const productCardLabelSvg = `<svg
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

  productCardLabel.appendChild(productCardLabelInput);

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = productCardLabelSvg;
  productCardLabel.appendChild(tempDiv.firstChild);

  productCardHeader.appendChild(productCardLabel);

  function createSliderCardHeader(images) {
    const productCardHeaderSliderWrapper = document.createElement('div');
    productCardHeaderSliderWrapper.classList.add('card__header--slider');

    images.forEach((src) => {
      const productCardHeaderSliderImg = document.createElement('div');
      productCardHeaderSliderImg.classList.add('card__header__img');

      const productImg = document.createElement('img');
      productImg.setAttribute('src', src);

      productCardHeaderSliderImg.appendChild(productImg);
      productCardHeaderSliderWrapper.appendChild(productCardHeaderSliderImg);
    });

    productCardHeader.appendChild(productCardHeaderSliderWrapper);

    if (images.length > 1) {
      createDots(images.length, productCardHeaderSliderWrapper);
    }
  }

  function createDots(count, slider) {
    const dots = [];

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.dataset.slide = i;
      dot.addEventListener('click', () => {
        slider.scrollLeft = i * slider.clientWidth;
        updateActiveDot(i, dots);
      });
      dots.push(dot);
      productCardSilderDots.appendChild(dot);
    }

    slider.addEventListener('scroll', () => {
      const activeIndex = Math.round(slider.scrollLeft / slider.clientWidth);
      updateActiveDot(activeIndex, dots);
    });

    updateActiveDot(0, dots);
  }

  function updateActiveDot(index, dots) {
    dots.forEach((dot) => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  createSliderCardHeader(product.images);
  productCard.appendChild(productCardHeader);
  productsWrapper.appendChild(productCard);
  productCard.appendChild(productCardSilderDots);
  productCardContent.appendChild(productCardAuthor);
  productCardContent.appendChild(productCardDetails);
  productCardContent.appendChild(productContentFooter);
  productCard.appendChild(productCardContent);
}

products.forEach((product) => createProduct(product));
