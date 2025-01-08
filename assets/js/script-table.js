window.onload = function() {
    updateProductList()
  };

  if (localStorage.hasOwnProperty("products")){
    products = JSON.parse(localStorage.getItem("products"))
    products.sort((a, b) => a.price - b.price);
  }else{
    alert("Tabela não possui dados, favor inserir dados")
  }

// Atualizar a tabela de produtos
function updateProductList() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
        <td>
          <button class="edit-btn" data-index="${index}">Editar</button>
        </td>
      `;
        list.appendChild(row);
    });

    // Botões de editar
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = button.getAttribute('data-index');
            openEditModal(index);
        });
    });
}

// Botão para cadastrar novo produto
document.getElementById('new-product-btn').addEventListener('click', function(){
    window.location.href = 'index.html';
});

// Abrir modal de edição
function openEditModal(index) {
    const product = products[index];

    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-description').value = product.description;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-available').value === true ? Sim : Não = product.available;

    document.getElementById('edit-form').setAttribute('data-edit-index', index);
    document.getElementById('edit-modal').style.display = 'flex';
}

// Fechar modal
document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('edit-modal').style.display = 'none';
});

// Salvar alterações do modal
document.getElementById('edit-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('edit-name').value;
    const description = document.getElementById('edit-description').value;
    const price = parseFloat(document.getElementById('edit-price').value);
    const available = Boolean(document.getElementById('edit-available').value);

    const editIndex = document.getElementById('edit-form').getAttribute('data-edit-index');
    products[editIndex] = { name, description, price, available };
    localStorage.setItem("products", JSON.stringify(products));

    products.sort((a, b) => a.price - b.price);
    updateProductList();
    document.getElementById('edit-modal').style.display = 'none';
});

function removerProdutos() {
    localStorage.removeItem("products");
    window.location.reload();
}

//Ordenar a tabela
let ordemNome = 1;
let ordemValor = 0;
let imagemOrdernarNome = document.getElementById('imagemOrdenarNome')
let imagemOrdernarValores = document.getElementById('imagemOrdenarValor')

function ordenarNomes() {
    if (ordemNome === 1) {
        products.sort((a, b) => a.name.localeCompare(b.name));
        ordemNome = 0;
        imagemOrdernarNome.src = ("imagens/arrow_upward.svg")
    } else {
        products.sort((a, b) => b.name.localeCompare(a.name));
        ordemNome = 1;
        imagemOrdernarNome.src = ("imagens/arrow_downward.svg")
    }
    imagemOrdernarValores.src = ("imagens/swap.svg");
    updateProductList();
}

function ordenarValores() {
    if (ordemValor === 0) {
        products.sort((a, b) => a.price - b.price);
        ordemValor = 1;
        imagemOrdernarValores.src = ("imagens/arrow_upward.svg");
    } else {
        products.sort((a, b) => b.price - a.price);
        ordemValor = 0;
        imagemOrdernarValores.src = ("imagens/arrow_downward.svg");
    }
    imagemOrdernarNome.src = ("imagens/swap.svg");
    updateProductList();
}
