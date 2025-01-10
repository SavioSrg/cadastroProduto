window.onload = function () {
    updateProductList()
};

if (localStorage.hasOwnProperty("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"))
    produtos.sort((a, b) => a.price - b.price);
    document.getElementById('list-container').style.display = 'block';
    document.getElementById('modal-produtos-vazios').style.display = 'none';

} else {
    document.getElementById('btn-impressora').style.display = 'none';
    document.getElementById('btn-remover-produtos').style.display = 'none';
    alert("Tabela não possui dados, favor inserir dados")
}

// Atualizar a tabela de produtos
function updateProductList() {
    const list = document.getElementById('lista-produtos');
    list.innerHTML = '';

    produtos.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
        <td id=coluna-botao>
          <button class="edit-btn" data-index="${index}">Editar</button>
          <button class="excluir-btn" data-index="${index}">Excluir</button>
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

    //Botões de excluir
    const excluirButtons = document.querySelectorAll('.excluir-btn');
    excluirButtons.forEach(button => {
        button.addEventListener('click', function () {
            const confirmDelete = confirm('Tem certeza de que deseja excluir o produto da tabela?');
            if (confirmDelete) {
                const index = button.getAttribute('data-index');
                removeFromLocalStorage(index);
            }
        });
    });
}

// Função para remover um elemento do localStorage
function removeFromLocalStorage(index) {

    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    alert(`Item removido.`);
    produtos.sort((a, b) => a.price - b.price);
    updateProductList()
}

// Botão para cadastrar novo produto
document.getElementById('btn-cadastrar-produto').addEventListener('click', function () {
    window.location.href = 'index.html';
});

// Abrir modal de edição
function openEditModal(index) {
    const product = produtos[index];

    document.getElementById('nome-editar').value = product.name;
    document.getElementById('descricao-editar').value = product.description;
    document.getElementById('valor-editar').value = product.price;
    document.getElementById('disponibilidade-editar').value = (product.available === true) ? value = '1' : value = '0';

    document.getElementById('form-editar-produto').setAttribute('data-edit-index', index);
    document.getElementById('modal-editar-produto').style.display = 'flex';
}

// Fechar modal
document.getElementById('btn-fechar-modal').addEventListener('click', function () {
    document.getElementById('modal-editar-produto').style.display = 'none';
});

// Salvar alterações do modal
document.getElementById('form-editar-produto').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('nome-editar').value;
    const description = document.getElementById('descricao-editar').value;
    const price = parseFloat(document.getElementById('valor-editar').value);
    const available = Boolean(Number(document.getElementById('disponibilidade-editar').value));

    const editIndex = document.getElementById('form-editar-produto').getAttribute('data-edit-index');
    produtos[editIndex] = { name, description, price, available };
    localStorage.setItem("produtos", JSON.stringify(produtos));

    produtos.sort((a, b) => a.price - b.price);
    updateProductList();
    document.getElementById('modal-editar-produto').style.display = 'none';
});

//Ordenar a tabela
let ordemNome = 1;
let ordemValor = 0;
let imagemOrdernarNome = document.getElementById('img-ordenar-nome')
let imagemOrdernarValores = document.getElementById('img-ordenar-valor')
imagemOrdernarNome.src = ("imagens/swap.svg");
imagemOrdernarValores.src = ("imagens/arrow_upward.svg");

function ordenarNomes() {
    if (ordemNome === 1) {
        produtos.sort((a, b) => a.name.localeCompare(b.name));
        ordemNome = 0;
        imagemOrdernarNome.src = ("imagens/arrow_upward.svg")
    } else {
        produtos.sort((a, b) => b.name.localeCompare(a.name));
        ordemNome = 1;
        imagemOrdernarNome.src = ("imagens/arrow_downward.svg")
    }
    imagemOrdernarValores.src = ("imagens/swap.svg");
    updateProductList();
}

function ordenarValores() {
    if (ordemValor === 0) {
        produtos.sort((a, b) => a.price - b.price);
        ordemValor = 1;
        imagemOrdernarValores.src = ("imagens/arrow_upward.svg");
    } else {
        produtos.sort((a, b) => b.price - a.price);
        ordemValor = 0;
        imagemOrdernarValores.src = ("imagens/arrow_downward.svg");
    }
    imagemOrdernarNome.src = ("imagens/swap.svg");
    updateProductList();
}

const resetButton = document.getElementById('btn-remover-produtos');
resetButton.addEventListener('click', () => {
    const confirmReset = confirm('Tem certeza de que deseja limpar os campos do formulário?');
    if (confirmReset) {
        localStorage.removeItem("produtos");
        window.location.reload();
    }
});
