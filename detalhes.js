$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');


  if (productId) {
    $.getJSON(`https://diwserver.vps.webdock.cloud/products/${productId}`, function (data) {
      const product = data;

      const cardHtml = `
        <div class="card card-container">
          <img src="${product.image}" class="card-img-top img-container" alt="${product.title}" />
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Preço: R$ ${product.price}</p>
            <p class="card-text">Brand: ${product.brandName}</p>
            <p class="card-text">Categoria: ${product.category}</p>
            <p class="card-text">Rating: ${product.rating.rate} (${product.rating.count} ratings)</p>
            <a class="btn btn-success" href="index.html">Voltar</a>
          </div>
        </div>
      `;

      $('#product').html(cardHtml);
    }).catch(function (error) {
      console.log('Ocorreu um erro ao buscar os detalhes do produto:', error);
      $('#notFound').text('Ocorreu um erro ao buscar os detalhes do produto.');
    });
  } else {
    $('#notFound').text('ID do produto não fornecido.');
  }
});