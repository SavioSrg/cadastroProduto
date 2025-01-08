let products = new Array();

// Função para alternar entre os contêineres de formulário e listagem
function navegar(page) {
    if (page === 'cadastro') {
        window.location.href = 'index.html';
      } else if (page === 'tabela') {
        window.location.href = 'table.html';
      }
}

// Formulário de cadastro
document.getElementById('produto-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('nome').value;
    const description = document.getElementById('descricao').value;
    const price = parseFloat(document.getElementById('valor').value);
    const available = Boolean(document.getElementById('avaliacao').value);

    if (localStorage.hasOwnProperty("products")) {
        products = JSON.parse(localStorage.getItem("products"));
    }

    products.push({ name, description, price, available });
    localStorage.setItem("products", JSON.stringify(products));
    products.sort((a, b) => a.price - b.price);

    //updateProductList();
    navegar('tabela');
});



