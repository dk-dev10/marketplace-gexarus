fetchCategories().then((category) => createCategories(category));

function setProductsInWrapper({ params = {}, wrapper = productsWrapper }) {
  wrapper.innerHTML = '';
  fetchProductsStore(params).then((res) => {
    res.forEach((product) => createProduct(product, productsWrapper));
  });
}
