import { removerItemCarrinho, atualizarCarrinho, descontoTech} from "../db/carrinho.js";

function criarItemComprado(item){

        const containerItem = document.createElement("div");
        containerItem.classList.add("item-comprado");

        const containerEsquerdo= document.createElement("div");

        const botaoRemover = document.createElement("button");
        botaoRemover.innerHTML = "X";
        botaoRemover.classList.add("btn-excluir");
        botaoRemover.addEventListener("click", () => {
            removerItemCarrinho(item);
        });

        const nomeItem = document.createElement("span");
        nomeItem.innerHTML = item.Name;
        nomeItem.classList.add("titulo-item-comprado");

        containerEsquerdo.appendChild(botaoRemover);
        containerEsquerdo.appendChild(nomeItem);
        containerItem.appendChild(containerEsquerdo);

        const containerDireito = document.createElement("div");
        containerDireito.style.display = "flex";
        containerDireito.style.gap = "1rem";


        const precoItem = document.createElement("span");
        precoItem.innerHTML = `$ ${parseFloat(item.Price).toFixed(2)}`;
        containerDireito.appendChild(precoItem);
        
        const desconto_tech = document.createElement("input")
        desconto_tech.type = "checkbox";

        desconto_tech.addEventListener("change", () => {
            if(desconto_tech.checked){
                descontoTech(item,true);
                atualizarCarrinho();
            }else{
                descontoTech(item,false);
                atualizarCarrinho();
            }
        })

        desconto_tech.classList.add("desconto-tech");
        containerDireito.appendChild(desconto_tech);
        
        containerItem.appendChild(containerDireito);

        document.getElementById("compras-container").appendChild(containerItem);
}

function criarTituloCompras(){
    const container = document.createElement("div");
    const spanTitulo = document.createElement("span");
    const spanPreco = document.createElement("span");
    spanTitulo.innerHTML = "Itens";
    spanPreco.innerHTML = "Preço - Peças";
    container.appendChild(spanTitulo);
    container.appendChild(spanPreco);
    document.getElementById("compras-container").appendChild(container);
}

function listarCompras(){
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const container = document.getElementById("compras-container");
    container.innerHTML = "";
    if (carrinho.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.innerHTML = "Seu carrinho está vazio.";
        container.appendChild(mensagem);
        return;
    }
    criarTituloCompras();
    carrinho.forEach(item => {
        criarItemComprado(item);
    });
}

function descontoFixer(){
    const input_desconto=document.getElementById("desconto-fixer");
    const desconto = input_desconto.value||0;
    const valor_desconto = 1 - (desconto / 100);
    const display_total = document.getElementById("subtotal");
    const valor_total = localStorage.getItem("total") || 0;
    display_total.innerHTML = (parseFloat(valor_total)*parseFloat(valor_desconto)).toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
    listarCompras()
    atualizarCarrinho();
})

document.getElementById("desconto-fixer").addEventListener("change",() => {
    descontoFixer();
})