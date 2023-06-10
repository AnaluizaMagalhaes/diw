$(document).ready(function () {
  const results = $('#products');

  function renderProducts(products) {
    results.empty();

    if (products.length > 0) {
      products.forEach(function (product) {
        let html = `
          <div class="col-lg-4 col-md-6 mt-2">
            <div class="card py-4 align-items-center">
              <img src="${product.image}" class="card-img-top img-tam" alt="${product.title}">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">$ ${product.price}</p>
                <a type="button" class="btn btn-light" href="atv2.html?id=${product.id}" style="color: black;">Detalhes</a>
              </div>
            </div>
          </div>
        `;

        results.append(html);
      });
    } else {
      results.append('<p class="text-center mt-4">Nenhum produto encontrado.</p>');
    }
  }

  function fetchProducts(url) {
    $.get(url, function (response) {
      const { products } = response;
      renderProducts(products.slice(0, 9));
    });
  }

  function searchProducts(query) {
    $.get('https://diwserver.vps.webdock.cloud/products/search?query=' + query, function (products) {
      renderProducts(products);
    });
  }

  function fetchCategories() {
    $.get('https://diwserver.vps.webdock.cloud/products/categories', function (categories) {
      let select = $('#select');
      select.empty();

      categories.forEach(function (category) {
        select.append('<option value="' + category + '">' + category + '</option>');
      });
    });
  }

  function fetchProductsByCategory(category) {
    if (category) {
      $.get('https://diwserver.vps.webdock.cloud/products/category/' + category, function (response) {
        const { products } = response;
        renderProducts(products);
      });
    } else {
      console.log('No category selected');
    }
  }

  $.get('https://diwserver.vps.webdock.cloud/products', function (response) {
    const { products } = response;
    renderProducts(products.slice(0, 9));
  });

  $('#button-pesquisa').click(function () {
    let searchInput = $('#input-pesquisa').val();
    searchProducts(searchInput);
  });

  fetchCategories();

  $('#select').change(function () {
    let selectedCategory = $(this).val();
    fetchProductsByCategory(selectedCategory);
  });
});
