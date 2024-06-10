fetchCategoriesFavourite().then((category) => createCategories(category));

function setProductsInWrapper({ params = {}, wrapper = productsWrapper }) {
  wrapper.innerHTML = '';
  fetchProductsFavourites({ ...params, favourites: 1 }).then((res) => {
    res.forEach((product) => createProduct(product, productsWrapper));
  });
}
