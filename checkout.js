let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
console.log("Carrinho recebido:", carrinho);
let resumoItens = document.getElementById("resumo-itens");
let resumoTotal = document.getElementById("resumo-total");
let total = 0;
carrinho.forEach(function(produto) {
    let item = document.createElement("div");
    item.classList.add("item-resumo");
    item.innerHTML = `
        <strong class="nome-produto">
            ${produto.nome}
        </strong>
        <span class="quantidade-produto">
            ${produto.quantidade}x
        </span>
        <span class="preco-produto">
            R$ ${(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}
        </span>
    `;
    resumoItens.appendChild(item);
    total += produto.preco * produto.quantidade;
});
resumoTotal.textContent =
    `R$ ${total.toFixed(2).replace(".", ",")}`;
function enviarPedido() {
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let pagamento = document.getElementById("pagamento").value;
    if (nome === "" || endereco === "" || pagamento === "") {
    alert("Preencha todos os dados antes de finalizar o pedido!");
    return;
}
let mensagem = `🍕 *NOVO PEDIDO - BEST PIZZARIA*
👤 *Cliente:* ${nome}
📍 *Endereço:* ${endereco}
💳 *Pagamento:* ${pagamento}
🛒 *PEDIDO:*
`;
carrinho.forEach(function(produto) {
     mensagem += `
${produto.quantidade}x ${produto.nome} - R$ ${(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}`;});
mensagem += `
💰 *Total: R$ ${total.toFixed(2).replace(".", ",")}*`;
console.log(mensagem);
let telefone = "5581982344954";
let linkWhatsApp =
    `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
window.open(linkWhatsApp, "_blank");
}
function novoPedido() {
    let confirmar = confirm("Deseja limpar o carrinho e iniciar um novo pedido?");
    if (confirmar) {
        localStorage.removeItem("carrinho");
        window.location.href = "index.html";
    }
}