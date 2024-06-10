const api = 'https://gexarus.com';

async function fetchProducts(filters = {}) {
  return await fetch(`${api}/api/AppStore/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.error('Error:', error));
}

async function fetchProductsFavourites(params) {
  return await fetchProducts({
    favourites: 1,
    ...params,
  });
}

async function fetchProductsStore(params) {
  return await fetchProducts({
    ...params,
  });
}

async function fetchCategories(params = {}) {
  return await fetch(`${api}/api/AppStore/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...params }),
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.error('Error:', error));
}

async function fetchCategoriesFavourite(params = {}) {
  return await fetchCategories({ favourites: 1, ...params });
}
