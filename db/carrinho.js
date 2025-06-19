export function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const display_carrinho = document.getElementById("subtotal");

    if (carrinho.length === 0) {
        display_carrinho.innerHTML = "0";
    } else {
        let total = 0;
        carrinho.forEach(item => {
            total += parseFloat(item.Price || 0);
        });
        
        display_carrinho.innerHTML = `${total.toFixed(2)}`;
    }
}

export function removerItemCarrinho(item) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho = carrinho.filter(i => i.id !== item.id);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    location.reload();
}

export function adicionarItemCarrinho(item) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho()
}