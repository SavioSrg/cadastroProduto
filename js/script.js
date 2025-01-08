let products = new Array();

// Função para alternar entre os contêineres de formulário e listagem
function navegarPara(page) {
    if (page === 'cadastro') {
        window.location.href = 'index.html';
    } else if (page === 'tabela') {
        window.location.href = 'table.html';
    }
}

// Atualizar a tabela de produtos
function updateProductList() {
    const lista = document.getElementById('product-list');

    if (!lista) {
        console.error('Elemento com ID "product-list" não encontrado.');
    }
    
    lista.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.nome}</td>
        <td>${product.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
        <td>
          <button class="edit-btn" data-index="${index}">Editar</button>
        </td>
      `;
        lista.appendChild(row);
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

// Formulário de cadastro
document.getElementById('produto-form').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('O formulário foi submetido!');

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const avaliacao = Boolean(document.getElementById('avaliacao').value);

    if (localStorage.hasOwnProperty("products")) {
        products = JSON.parse(localStorage.getItem("products"))
    }

    products.push({ nome, descricao, valor, avaliacao });
    localStorage.setItem("products", JSON.stringify(products));
    products.sort((a, b) => a.price - b.price);

    updateProductList();
    navegarPara('tabela');
});

// Botão para cadastrar novo produto
document.getElementById('adicionarNovoProduto').addEventListener('click', function () {
    navegarPara('cadastro');
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

    const nome = document.getElementById('edit-name').value;
    const descricao = document.getElementById('edit-description').value;
    const valor = parseFloat(document.getElementById('edit-price').value);
    const avaliacao = Boolean(document.getElementById('edit-available').value);

    const editIndex = document.getElementById('edit-form').getAttribute('data-edit-index');
    products[editIndex] = { nome, descricao, valor, avaliacao };
    localStorage.setItem("products", JSON.stringify(products));

    products.sort((a, b) => a.price - b.price);
    updateProductList();
    document.getElementById('edit-modal').style.display = 'none';
});