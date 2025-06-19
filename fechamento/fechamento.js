import { removerItemCarrinho} from "../db/carrinho.js";

function criarItemComprado(item,carrinho){

        const containerItem = document.createElement("div");
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

        containerEsquerdo.appendChild(botaoRemover);
        containerEsquerdo.appendChild(nomeItem);
        containerItem.appendChild(containerEsquerdo);

        const precoItem = document.createElement("span");
        precoItem.innerHTML = `$ ${parseFloat(item.Price).toFixed(2)}`;
        containerItem.appendChild(precoItem);
        
        document.getElementById("itens-container").appendChild(containerItem);
}

function listarCompras(){
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const container = document.getElementById("itens-container");
    container.innerHTML = "";
    if (carrinho.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.innerHTML = "Seu carrinho está vazio.";
        container.appendChild(mensagem);
        return;
    }
    carrinho.forEach(item => {
        criarItemComprado(item, carrinho);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    listarCompras()
})