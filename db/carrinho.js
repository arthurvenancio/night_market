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

export function descontoTech(item){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho = carrinho.map(i => {
        if (i.id === item.id) {
            if(i.Price>=10000){
                i.Price = (i.Price * 0.5).toFixed(2);
            }else if(i.Price>=5000){
                i.Price = 1000;
            }else if(i.Price>=1000){
                i.Price = 500;
            }else if(i.Price>=500){
                i.Price = 100;
            }else if(i.Price>=100){
                i.Price = 50;
            }else if(i.Price>=50){
                i.Price = 20;
            }else {
                i.Price = i.Price;
            }
        }
        return i;
    });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

export function adicionarItemCarrinho(item) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho()
}