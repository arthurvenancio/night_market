export function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const display_carrinho = document.getElementById("subtotal");

    if (carrinho.length === 0) {
        display_carrinho.innerHTML = "0";
        localStorage.setItem("total", JSON.stringify(0));
    } else {
        let total = 0;
        carrinho.forEach(item => {
            total += parseFloat(item.Price || 0);
        });
        const desconto_tech = JSON.parse(localStorage.getItem("desconto_tech")) || 0;
        total -= parseFloat(desconto_tech) || 0;
        display_carrinho.innerHTML = `${total.toFixed(2)}`;
        localStorage.setItem("total", JSON.stringify(total));
    }
}

export function removerItemCarrinho(item) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho = carrinho.filter(i => i.id !== item.id);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    location.reload();
}

export function descontoTech(i, adicionar) {
    let desconto_tech = parseFloat(localStorage.getItem("desconto_tech")) || 0;
    const price = parseFloat(i.Price || 0);
    const descontoCalculado = calcularDescontoTech(price);
    if (adicionar) {
        desconto_tech += descontoCalculado;
    } else {
        desconto_tech -= descontoCalculado;
    }
    localStorage.setItem("desconto_tech", JSON.stringify(desconto_tech));
}

function calcularDescontoTech(price) {
    if (price >= 10000) {
        return (price * 0.5)
    } else if (price >= 5000) {
        return price - 1000;
    } else if (price >= 1000) {
        return price - 500;
    } else if (price >= 500) {
        return price - 100;
    } else if (price >= 100) {
        return price - 50;
    } else if (price >= 50) {
        return price - 20;
    } else {
        return 0;
    }
}

export function adicionarItemCarrinho(item) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho()
}