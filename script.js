let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
function abrirCarrinho() {
    document.getElementById("carrinho").style.display = "block";
    document.getElementById("botao-carrinho").style.display = "none";
}
function fecharCarrinho() {
    document.getElementById("carrinho").style.display = "none";
    document.getElementById("botao-carrinho").style.display = "block";
}
function adicionarPizza(nome, preco) {

    let produtoExistente = carrinho.find(function(produto) {
        return produto.nome === nome;
    });

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        let produto = {
            nome: nome,
            preco: preco,
            quantidade: 1
        };

        carrinho.push(produto);
    }
    document.getElementById("botao-carrinho").style.display = "block";
    atualizarCarrinho();
}


function aumentarQuantidade(indice) {

    carrinho[indice].quantidade++;

    atualizarCarrinho();
}


function diminuirQuantidade(indice) {

    carrinho[indice].quantidade--;

    if (carrinho[indice].quantidade <= 0) {
        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}


function atualizarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    let itensCarrinho = document.getElementById("itens-carrinho");
    itensCarrinho.innerHTML = "";
    let total = 0;
    carrinho.forEach(function(produto, indice) {
        let item = document.createElement("div");
        item.innerHTML = `
            <p>
                <strong>${produto.nome}</strong>
                <br>
                R$ ${(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}
            </p>
            <button onclick="diminuirQuantidade(${indice})">
                −
            </button>
            <span>${produto.quantidade}</span>
            <button onclick="aumentarQuantidade(${indice})">
                +
            </button>
        `;
        itensCarrinho.appendChild(item);
        total += produto.preco * produto.quantidade;
    });
    document.getElementById("total-carrinho").textContent =
        `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
}
function finalizarPedido() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    window.location.href = "checkout.html";
}
window.addEventListener("DOMContentLoaded", function() {
    if (carrinho.length > 0) {
        atualizarCarrinho();
        document.getElementById("botao-carrinho").style.display = "block";
    }
});