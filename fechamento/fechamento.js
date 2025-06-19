import { removerItemCarrinho} from "../db/carrinho.js";

function criarItemComprado(item){

        const containerItem = document.createElement("div");
        containerItem.classList.add("item-comprado");

        const containerEsquerdo= document.createElement("div");

        const botaoRemover = document.createElement("button");
        botaoRemover.innerHTML = "X";
        botaoRemover.classList.add("btn-excluir");
        botaoRemover.addEventListener("click", () => {
            removerItemCarrinho(item);
            listarCompras();
        });

        const nomeItem = document.createElement("span");
        nomeItem.innerHTML = item.Name;
        nomeItem.classList.add("titulo-item-comprado");

        containerEsquerdo.appendChild(botaoRemover);
        containerEsquerdo.appendChild(nomeItem);
        containerItem.appendChild(containerEsquerdo);

        const containerDireito = document.createElement("div");

        const precoItem = document.createElement("span");
        precoItem.innerHTML = `$ ${parseFloat(item.Price).toFixed(2)}`;
        containerDireito.appendChild(precoItem);
        containerItem.appendChild(containerDireito);
        
        document.getElementById("compras-container").appendChild(containerItem);
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
    carrinho.forEach(item => {
        criarItemComprado(item);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    listarCompras()
})