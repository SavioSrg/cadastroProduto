let produtos = new Array();

// Formulário de cadastro
document.getElementById('form-cadastro-produto').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('nome').value;
    const description = document.getElementById('descricao').value;
    const price = parseFloat(document.getElementById('valor').value);
    const available = Boolean(Number(document.getElementById('disponibilidade').value));

    if (localStorage.hasOwnProperty("produtos")) {
        produtos = JSON.parse(localStorage.getItem("produtos"));
    }

    produtos.push({ name, description, price, available });
    localStorage.setItem("produtos", JSON.stringify(produtos));
    produtos.sort((a, b) => a.price - b.price);

    const feedback = document.getElementById('msg-feedback');
    feedback.style.display = 'block';
    setTimeout(() => {
        feedback.style.display = 'none';
        window.location.href = 'table.html';
    }, 1200);
});



