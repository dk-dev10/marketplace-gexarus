const api = 'https://gexarus.com/';

const productCategories = document.querySelector('.product__categories');

fetch(`${api}api/AppStore/categories`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}),
})
  .then((response) => response.json())
  .then((data) => createCategories(data.data))
  .catch((error) => console.error('Error:', error));

function createCategories(categories) {
  const labelAll = document.createElement('label');
  const checkboxAll = document.createElement('input');
  checkboxAll.type = 'checkbox';
  labelAll.className = 'checkbox__category--item';
  checkboxAll.dataset.category = 'all';
  checkboxAll.checked = false;

  if (checkboxAll.checked) {
    labelAll.className = 'checkbox__category--item active';
  }

  labelAll.appendChild(checkboxAll);
  labelAll.appendChild(document.createTextNode('Все'));

  productCategories.appendChild(labelAll);

  categories.forEach((category) => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.className = 'checkbox__category--item';
    checkbox.dataset.category = category.id;
    checkbox.checked = false;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(category.name));

    productCategories.appendChild(label);
  });

  addEventListeners();

  function addEventListeners() {
    const categoryCheckboxes = document.querySelectorAll(
      '.checkbox__category--item input'
    );

    categoryCheckboxes[0].checked = true;

    function checkedClass() {
      categoryCheckboxes.forEach((cb) => {
        cb.parentElement.classList.remove('active');
        if (cb.checked) cb.parentElement.classList.add('active');
      });
    }

    checkedClass();

    function checkedCategory() {
      if (
        !Array.from(categoryCheckboxes).some((cb) => {
          return cb.checked;
        })
      ) {
        categoryCheckboxes[0].checked = true;
        checkedClass();
      }
    }

    function fetchCheckedProducts() {
      const categoriesId = [];
      categoryCheckboxes.forEach(
        (item) =>
          item.dataset.category !== 'all' &&
          item.checked &&
          categoriesId.push(+item.dataset.category)
      );
      fetchProducts({
        categories: JSON.stringify(categoriesId),
      });
    }

    categoryCheckboxes.forEach((cb) => {
      cb.addEventListener('change', () => {
        if (cb.dataset.category === 'all') {
          categoryCheckboxes.forEach((item) => (item.checked = false));
          cb.checked = true;
          checkedClass();
        } else {
          categoryCheckboxes[0].checked = false;
          checkedClass();
        }
        checkedCategory();
        fetchCheckedProducts();
      });
    });
  }
}

const productsWrapper = document.querySelector('.products__wrapper');

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

function fetchProducts(filters = {}) {
  fetch(`${api}/api/AppStore/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  })
    .then((response) => response.json())
    .then((data) => {
      productsWrapper.innerHTML = '';
      data.data.forEach((product) => createProduct(product));
    })
    .catch((error) => console.error('Error:', error));
}

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
  productCardAuthorAvatarImg.src = api + product.author.avatar;
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
  productCardLabelInput.checked = product.favourite;

  productCardLabelInput.onclick = () => {
    fetch(`${api}/api/AppStore/favourites/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: product.id,
        status: +productCardLabelInput.checked,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

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

  function createSliderCardHeader(files) {
    const productCardHeaderSliderWrapper = document.createElement('div');
    productCardHeaderSliderWrapper.classList.add('card__header--slider');

    files.forEach((file) => {
      const productCardHeaderSliderImg = document.createElement('div');
      productCardHeaderSliderImg.classList.add('card__header__img');
      let productImg;
      switch (file.type) {
        case 'img':
          productImg = document.createElement('img');
          productImg.setAttribute('src', file.medium);
          break;
      }

      productCardHeaderSliderImg.appendChild(productImg);
      productCardHeaderSliderWrapper.appendChild(productCardHeaderSliderImg);
    });

    productCardHeader.appendChild(productCardHeaderSliderWrapper);

    if (files.length > 1) {
      createDots(files.length, productCardHeaderSliderWrapper);
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

  createSliderCardHeader(product.files);
  productCard.appendChild(productCardHeader);
  productsWrapper.appendChild(productCard);
  productCard.appendChild(productCardSilderDots);
  productCardContent.appendChild(productCardAuthor);
  productCardContent.appendChild(productCardDetails);
  productCardContent.appendChild(productContentFooter);
  productCard.appendChild(productCardContent);
}
